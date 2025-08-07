# News Backend

This is a backend for a news application that allows users to register, log in, search for news, save news, and manage their saved news.

## Features

- **Authentication and Authorization**: User registration and login with JWT.
- **User Management**: Create and retrieve current user information.
- **News**:
  - Search for news using the NewsAPI.
  - Save personalized news for each user.
  - Delete saved news.
- **Validation**: Input data validation using `celebrate` and `Joi`.
- **Security**: Use of `helmet`, CORS, and rate limiter to protect the API.
- **Logging**: Request and error logging with `winston`.

## Technologies Used

- **Node.js** and **Express**: Main framework for the backend.
- **MongoDB** and **Mongoose**: Database and data modeling.
- **JWT**: For token-based authentication.
- **NewsAPI**: To fetch real-time news.
- **Winston**: For logging.
- **Celebrate/Joi**: For data validation.

## Installation

1. Clone this repository:

   ```bash
   git clone <REPOSITORY_URL>
   cd news-backend

   ```

2. Install dependiencies
   npm install

3. Create a .env file in the root of the project with the following variables:
   PORT=3001
   MONGODB_URI=<YOUR_MONGODB_URI>
   JWT_SECRET=<YOUR_JWT_SECRET>
   NEWS_API_KEY=<YOUR_NEWSAPI_KEY>

4. Start the server in development mode:
   npm run dev
   The server will be running at http://localhost:3001.

## Endpoints

### **Authentication**

- **POST**/**signup**: User registration.
- **POST** /**signin**: User login.

### **News**

- **GET** /**news**: Search for real-time news.
- **POST** /**news-saved:** Save a news article (requires authentication).
- **GET** /**news-saved**: Retrieve saved news (requires authentication).
- **DELETE** /**news-saved/:id**: Delete a saved news article (requires authentication).

### **Users**

- **GET** /**users**/**me**: Retrieve current user information (requires authentication).

## Available Scripts

- npm start: Start the server in production mode.
- npm run dev: Start the server in development mode with nodemon.

## Project Structure

```
.
├── controllers/       # Route controllers
├── middleware/        # Custom middlewares
├── models/            # Mongoose models
├── routes/            # Route definitions
├── utils/             # Utilities and error classes
├── server.js          # Server entry point
└── .env               # Environment variables
```

## Contributions

Contributions are welcome! If you find an issue or have an improvement, please open an issue or submit a pull request.
