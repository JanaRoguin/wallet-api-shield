# Wallet API Shield

A backend API for managing users and wallets using Express, TypeScript, and PostgreSQL.

## Features

- JWT authentication (Sign in / Sign out)
- CRUD operations for user wallets
- PostgreSQL integration
- Basic error handling and validation

## Requirements

- Node.js >= 16
- PostgreSQL

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wallet-api-shield.git
   cd wallet-api-shield
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database and update your `.env` file:
   ```
   cp .env.example .env
   ```

4. Run the SQL schema setup manually:
   ```sql
   CREATE DATABASE wallet_db;

   CREATE EXTENSION IF NOT EXISTS "pgcrypto";

   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL
   );

   CREATE TABLE wallets (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id),
     tag VARCHAR(255),
     chain VARCHAR(255) NOT NULL,
     address VARCHAR(255) UNIQUE NOT NULL
   );
   ```

5. Start the dev server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /signin`
- `POST /signout`
- `GET /wallets`
- `GET /wallets/:id`
- `POST /wallets`
- `PUT /wallets/:id`
- `DELETE /wallets/:id`

## Postman Collection

Import the `postman_collection.json` to test the endpoints.

---
