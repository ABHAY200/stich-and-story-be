## Stich and Story Backend (Mock)

Minimal Node.js + Express + TypeScript backend providing REST APIs with mock data for the Stich and Story frontend.

### Tech
- Node.js + Express
- TypeScript (strict) with NodeNext module resolution
- CORS enabled
- dotenv for config
- tsx for fast dev

### Setup
1. Install deps:
   ```bash
   npm install
   ```
2. Copy env template and adjust if needed:
   ```bash
   cp .env.example .env
   ```
3. Run dev server:
   ```bash
    npm run dev
   ```
   Or production:
   ```bash
    npm run build && npm start
   ```

Server defaults to `http://localhost:4000`.

### Endpoints
- GET `/api/products` → list all products
- GET `/api/products/:id` → product details
- POST `/api/cart` → accepts array of cart items; stores in-memory and returns a success message
- POST `/api/checkout` → accepts `{ user, cart, notes? }`; returns `{ success, orderId, status }`

### Example Requests
```bash
curl http://localhost:4000/api/products | jq

curl http://localhost:4000/api/products/ww-001 | jq

curl -X POST http://localhost:4000/api/cart \
  -H 'Content-Type: application/json' \
  -d '[{"productId":"ww-001","quantity":2}]' | jq

curl -X POST http://localhost:4000/api/checkout \
  -H 'Content-Type: application/json' \
  -d '{"user":{"id":"u1","name":"Asha","email":"asha@example.com"},"cart":{"items":[{"productId":"ww-001","quantity":1}]}}' | jq
```

### Deploying
Works on Render/Railway with build & start commands:
```bash
npm run build
node dist/server.js
```
Expose the public base URL to the frontend.

