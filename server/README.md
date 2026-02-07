# News Explorer Backend

A RESTful API backend for the News Explorer application, built with Express.js, MongoDB, and includes user authentication with JWT tokens and bookmark management.

## Features

- **User Authentication**: Sign up, sign in, and session management with JWT tokens
- **Bookmark Management**: Save, retrieve, and delete bookmarked news articles
- **Error Handling**: Comprehensive error handling with custom error classes
- **HTTP Validation**: Request validation using Celebrate and Joi
- **Logging**: Request and error logging with Winston
- **Database**: MongoDB with Mongoose for schema validation

## Tech Stack

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for database schema validation
- **JWT** - Token-based authentication (7-day expiry)
- **bcrypt** - Password hashing
- **Celebrate + Joi** - HTTP request validation
- **express-winston** - Request/error logging
- **validator** - URL and email validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Installation

```bash
npm install
```

## Running the Project

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Environment Variables

Create a `.env` file in the server directory:

```
NODE_ENV=development
JWT_SECRET=your-secret-jwt-key-here
PORT=3001
```

## API Endpoints

### Authentication (Public)
- `POST /signup` - Register a new user
- `POST /signin` - Log in and receive JWT token

### Users (Protected)
- `GET /users/me` - Get current user profile

### Saved Articles (Protected)
- `GET /saved-news` - Get all saved articles for the current user
- `POST /saved-news` - Save a new article
- `DELETE /saved-news/:articleId` - Delete a saved article

## Error Handling

The API returns standardized error responses with the following HTTP status codes:

- `400` - Bad Request (Invalid data)
- `401` - Unauthorized (Auth failures)
- `403` - Forbidden (Permission denied)
- `404` - Not Found (Resource not found)
- `409` - Conflict (Duplicate email, etc.)
- `500` - Internal Server Error

## Database Schema

### User
- `username` - String (2-30 characters)
- `email` - String (unique, valid email format)
- `password` - String (hashed with bcrypt)

### SavedArticle
- `url` - String (unique, valid URL) - Primary identifier
- `tag` - String (search keyword, 1-50 characters)
- `owner` - ObjectId (reference to User)
- `image` - String (valid URL)
- `date` - String (article date)
- `title` - String (article title)
- `description` - String (article description)
- `source` - String (article source)
- `createdAt` - Date (timestamp)

## Request Examples

### Sign Up
```json
POST /signup
{
  "email": "user@example.com",
  "password": "securePassword",
  "username": "John Doe"
}
```

### Sign In
```json
POST /signin
{
  "email": "user@example.com",
  "password": "securePassword"
}
```

### Save an Article
```json
POST /saved-news
Headers: Authorization: Bearer <JWT_TOKEN>
{
  "url": "https://example.com/article",
  "tag": "technology",
  "image": "https://example.com/image.jpg",
  "date": "2024-02-07",
  "title": "Article Title",
  "description": "Article description",
  "source": "News Source"
}
```

### Get Saved Articles
```
GET /saved-news
Headers: Authorization: Bearer <JWT_TOKEN>
```

### Delete Saved Article
```
DELETE /saved-news/:articleId
Headers: Authorization: Bearer <JWT_TOKEN>
```

## Security Features

- JWT tokens expire in 7 days
- Passwords are hashed with bcrypt (10 rounds)
- Unique email constraint to prevent duplicate accounts
- URL validation for article URLs
- Email format validation
- Ownership verification for delete operations
- CORS protection

## Logging

Logs are written to:
- `request.log` - HTTP request logs
- `error.log` - Error logs

Logs are formatted as JSON for easy parsing and include timestamps.

## Company Standards

This backend follows the same coding patterns and standards as the weather clothing recommendation app (WTWR), ensuring consistency across projects.
