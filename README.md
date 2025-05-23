# Wallet API Shield

A RESTful backend API for managing user wallets using Node.js, Express, TypeScript, Prisma and PostgreSQL.

This project was built as part of the Shield Technical Task and includes only the functionality explicitly required by the challenge.

---

## Features

- 🔐 JWT authentication (`/auth/signin`,`/auth/signout`)
- 📁 CRUD operations on wallets (`/wallets`)
- 💼 Wallet model extended with blockchain fields: `chain`, `address`, `tag`, etc.
- 🧪 Input validation with Zod
- 🔒 Password hashing with bcrypt
- 🗂 Modular folder structure (controllers, routes, middlewares, models, utils)
- 💾 PostgreSQL database with Prisma ORM

---

## Requirements

- Node.js >= 16
- PostgreSQL >= 12
- npm

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/JanaRoguin/wallet-api-shield.git
cd wallet-api-shield
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```bash
cp .env.example .env
```

Then edit `.env` with your local DB credentials:

```env
PORT=3000
DATABASE_URL=postgresql://jana_roguin:123@localhost:5432/jana_roguin
JWT_SECRET=your_jwt_secret_here
```

> Ensure the database `jana_roguin` exists and is running.

---

### 4. Initialize the database

Push the Prisma schema:

```bash
npx prisma db push
```

Seed the database with a test user:

```bash
npm run seed
```

This creates:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

---

### 5. Start the development server

```bash
npm run dev
```

---

## API Endpoints

### Auth

- `POST /auth/signin` → returns JWT token
- `POST /auth/signout`→ logs out the user, delete the token

### Wallets (authenticated only)

- `GET /wallets` → get all wallets of the user
- `POST /wallets` → create a wallet
- `PUT /wallets/:id` → update a wallet
- `DELETE /wallets/:id` → delete a wallet

Use the `Authorization: Bearer <token>` header after signing in.

---

## Project Structure

```
src/
├── controllers/      # Logic for auth and wallet endpoints
├── middlewares/      # JWT auth middleware
├── models/           # Zod schemas for input validation
├── routes/           # Express routes
├── utils/            # Hashing and JWT helpers
├── lib/              # Prisma client instance
├── prisma/           # Prisma schema and seed script
├── index.ts          # Entry point
```

---

## Postman Collection

Import the file `wallet-api-shield.postman_collection.json` into Postman to test all endpoints.  
It includes automatic token handling, Full Wallet CRUD and 
Auth (Sign In & Sign Out)

---

## Notes

- This project includes only the required functionality from the PDF specification.
- Signout is implemented as a stateless endpoint: the server responds OK and the client deletes the token.
- No user registration (`signup`), or token refresh implemented.
- Passwords are hashed using bcrypt.
- Tokens expire in 1 hour.

---

## License

This code was developed as part of a technical challenge and is not intended for production use.

## Author

Developed by Jana Roguin as part of the Shield Technical Challenge.
