const jwt  =  require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) => {
    // console.log("aniket");
    try{
        // console.log(req.cookies.token);
        // extract jwt token
        // other ways to fetch token
        // console.log("cookie",req.cookies.token);
        // console.log("body",req.body.token);
        // console.log("bearer token header method",req.headers.authorization.replace("Bearer ", ""));
        // const token = req.cookies.token || req.body.token || req.headers.authorization.replace("Bearer ", "");
        const token = req.cookies.token || req.body.token;
        // console.log(token);

        if(!token){
            return res.status(401).json({
                success : false,
                message : "token is missing"
            });
        }

        // verify the token
        try{
            const decode = jwt.verify(token,process.env.jwt_token);
            console.log(decode);
            req.user = decode;
        }catch(error) {
            return res.status(401).json({
                succes : false,
                message : "token is invalid"
            })
        }

        next();
    } catch(error){
        return res.status(404).json({
            success : false,
            message : "something went wrong,while verifying the token"
        })
    }
}

exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role != "Student") {
            return res.status(401).json({
                success : false,
                message : "THESE is proteted for student"
            })
        }
        next();        
    }catch(error){
        return res.status(404).json({
            success : false,
            message : "user role is not matching"
        })
    }
}

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role != "Admin") {
            return res.status(401).json({
                success : false,
                message : "THESE is proteted for admin"
            })
        }
        next();        
    }catch(error){
        return res.status(404).json({
            success : false,
            message : "user role is not matching"
        })
    }
}