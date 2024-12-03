# NEXUX API

A RESTful API built with Node.js, Express.js, and MongoDB for managing users and their todos. This API supports user authentication, including signup and login, and allows users to create, read, update, and delete their todos.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Environment Variables](#environment-variables)

## Features

- User signup and login with JWT authentication
- Secure password storage with bcrypt
- CRUD operations for todos
- User-specific todos
- Middleware for authentication and authorization

## Technologies

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcrypt.js
- dotenv for environment variables

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KitsuneKode/Nexux.git
    
    ```

2. Navigate to the project directory:

```bash
    cd project-directory
```

3. Install the dependencies:

```bash
    npm install
```

4. Create a .env file in the root directory and add your MongoDB URI and JWT secret:

```env
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
FRONTEND_URL=<your-frontend-url>
PORT=<port-number>
```


## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Create a new user
  - Request body: `{ "username": "string", "email": "string", "password": "string" }`
  
- **POST** `/api/auth/signin` - User login
  - Request body: `{ "email": "string", "password": "string" }`

### User

- **GET** `/api/users/me` - Get current user information
- **PUT** `/api/users/me` - Update current user information
- **DELETE** `/api/users/me` - Delete current user information

### Todos

- **POST** `/api/todos` - Create a new todo
  - Request body: `{ "title": "string", "description": "string", "done": false }`
  
- **GET** `/api/todos` - Get all todos for the current user

- **GET** `/api/todos/:id` - Get a specific todo by ID

- **PUT** `/api/todos/:id` - Update a specific todo
  - Request body: `{ "title": "string", "description": "string", "done": true }`
  
- **DELETE** `/api/todos/:id` - Delete a specific todo

## Example Requests

Here are some example requests using `curl`:

**Signup:**
```bash
curl -X POST https://api-nexus-kitsunekode.vercel.app/api/auth/signup -H "Content-Type: application/json" -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'
```

**Login:**
```bash

curl -X POST https://api-nexus-kitsunekode.vercel.app/api/auth/signin -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "password123"}'
```
**Create a todo:**
```bash
curl -X POST https://api-nexus-kitsunekode.vercel.app/api/todos -H "Authorization: Bearer <your-jwt-token>" -H "Content-Type: application/json" -d '{"title": "New Todo", "description": "Todo description", "done": false}'
```



### License
This project is licensed under the `MIT License` - see the [LICENSE](LICENSE) file for details.


### Author
- [KitsuneKode](https://github.com/KitsuneKode)