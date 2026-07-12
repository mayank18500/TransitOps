# TransitOps Backend Server

This is the backend server for TransitOps, built using Node.js, Express, and Prisma ORM.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`.

3. Start the server:
   - Development mode: `npm run dev`
   - Production mode: `npm run start`

## Structure

- `prisma/`: Database schema configuration.
- `src/`: Backend source files.
  - `server.js`: Main Express server initialization.
