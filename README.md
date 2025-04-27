# URL Shortener API

This is a simple **URL Shortener API** built with **Express** and **MongoDB**. It allows users to shorten URLs and redirect them to their original location when accessed using the shortened URL.

### Features:

1. **POST `/api/shorturl`**: Shorten a URL by providing the original URL.
2. **GET `/api/shorturl/:short_url`**: Redirect to the original URL using the shortened URL.
3. **Validates URLs**: The API verifies that the provided URL follows a valid format (e.g., `http://example.com`).
4. **MongoDB Integration**: The shortened URLs and their corresponding original URLs are stored in a MongoDB database.

---

## Table of Contents:

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [POST `/api/shorturl`](#post-apishorturl)
  - [GET `/api/shorturl/:short_url`](#get-apishorturlshort_url)
- [Setup](#setup)
  - [Dependencies](#dependencies)
  - [MongoDB Setup](#mongodb-setup)
  - [Running Locally](#running-locally)

---

## Getting Started

Follow the instructions below to set up the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (either locally or using MongoDB Atlas)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/azwdevops/freecodecamp-url-shortener.git
   ```

2. Navigate into the project directory:

   ```bash
   cd freecodecamp-url-shortener
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

### MongoDB Setup

You need to have a MongoDB instance running. You can use a local MongoDB installation or MongoDB Atlas for cloud-based storage.

- **Local MongoDB**:
  If you're using a local MongoDB setup, the application will connect to `mongodb://localhost:27017/your_db_name` by default.

- **MongoDB Atlas**:
  If you want to use MongoDB Atlas, create a .env file and put the connection string in the `MONGO_URI` variable.

---

## API Endpoints

### POST `/api/shorturl`

This endpoint shortens the provided URL.

#### Request Body:

- **url** (required): The original URL that needs to be shortened.

#### Example Request:

```bash
POST /api/shorturl
Content-Type: application/json

{
  "url": "https://freeCodeCamp.org"
}
```

#### Example Response:

```json
{
  "original_url": "https://freeCodeCamp.org",
  "short_url": 1234
}
```

#### Error Response (for invalid URL format):

```json
{
  "error": "invalid url"
}
```

### GET `/api/shorturl/:short_url`

This endpoint redirects to the original URL associated with the given short URL ID.

#### Request:

- **short_url** (required): The short URL ID (e.g., `1234`).

#### Example Request:

```bash
GET /api/shorturl/1234
```

#### Example Response:

The server will redirect you to the original URL. If the short URL ID doesn't exist, it will return:

```json
{
  "error": "No short URL found for the given input"
}
```

---

## Setup

### Dependencies

This application requires the following npm packages:

- `express`: A fast, unopinionated web framework for Node.js.
- `mongoose`: MongoDB object modeling for Node.js.
- `body-parser`: Middleware to parse incoming request bodies.
- `dns`: Node.js core module to perform DNS lookups for URL validation.
- `cors`: A package to enable Cross-Origin Resource Sharing.

### Running Locally

1. Make sure MongoDB is running either locally or using MongoDB Atlas.
2. Run the server:

   ```bash
   npm start
   ```

   This will start the server on port `3000`. You can access the application via `http://localhost:3000`.

---

---

## License

This project is licensed under the MIT License

---
