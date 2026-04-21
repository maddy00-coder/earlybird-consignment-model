# EarlyBird

## Structure

```bash
project-root/
  client/
    public/
    src/
    package.json
    vite.config.js
  server/
    index.js
    package.json
    .env.example
```

## Frontend

```bash
cd client
npm install
npm run dev
```

## Backend

```bash
cd server
npm install
npm run dev
```

## Environment Variables

### Server

Create `server/.env` from `server/.env.example`.

### Client

Optional:

```env
VITE_API_URL=http://localhost:5000
```
