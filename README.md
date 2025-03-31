# Blog App Backend

This is the backend service for the Blog App, built using **Node.js**, **Express.js**, and **MongoDB**.

## Features

- User authentication (JWT-based login/signup)
- Create, read, update, and delete (CRUD) blog posts
- Commenting system for blog posts
- Like/unlike functionality
- Secure password hashing with bcrypt

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcrypt for password hashing

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone this repository:

   ```sh
   git clone https://github.com/AniketGhotkar/Blog-App-backend.git
   cd Blog-App-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a **.env** file in the root directory and configure environment variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the server:

   ```sh
   npm start
   ```

   The server will run on `http://localhost:5000` by default.

## Future Enhancements

- Implement role-based access control (RBAC)
- Add image upload support for blogs
- Improve API documentation with Swagger

## Contributing

Feel free to fork the repository and create pull requests for improvements.

