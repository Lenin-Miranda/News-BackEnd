# News Explorer API

Express/MongoDB backend for [News Explorer](https://github.com/Lenin-Miranda/News-Explorer). Provides account registration, JWT login, news search and saved-article management.

## Setup

Requires Node.js, npm, MongoDB and a NewsAPI key.

```bash
git clone https://github.com/Lenin-Miranda/News-BackEnd.git
cd News-BackEnd
npm install
```

Create `.env` with your own credentials:

```dotenv
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/news_explorer
JWT_SECRET=replace-with-a-generated-secret
NEWS_API_KEY=your-newsapi-key
```

```bash
npm run dev
```

The API runs on `http://localhost:3001`. Use `npm start` to run without nodemon. No compilation step is needed.

## Routes

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/signup` | Register |
| POST | `/signin` | Sign in |
| GET | `/users/me` | Current user |
| GET | `/news?q=keyword` | Search news |
| GET | `/news-saved` | List saved articles |
| POST | `/news-saved` | Save an article |
| DELETE | `/news-saved/:id` | Remove a saved article |

Authenticated routes use the JWT returned at login. Consult [routes/](routes/) and [controllers/](controllers/) for request validation and payloads.

## Structure and verification

[server.js](server.js) configures the server; `models/` holds MongoDB models and `utils/` contains shared configuration/helpers. The source also includes request/error logging and validation middleware.

The `npm test` command is a placeholder that intentionally exits with an error. Verify registration, login, news search and saved-article operations using a local database and your own test account. News search requires a working external API key.
