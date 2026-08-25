# Campus App Backend

Foundation backend server for Campus App built with Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, and Better Auth.

## Tech Stack

- **Runtime & Framework**: Node.js & Express
- **Language**: TypeScript
- **Package Manager**: pnpm
- **ORM & Database**: Prisma & PostgreSQL
- **Authentication**: Better Auth (with Prisma PostgreSQL adapter)
- **Tooling**: tsx (development), tsc (production build)

## Project Structure

```
server/
├── src/
│   ├── config/          # Central configuration & env validation
│   │   └── env.ts
│   ├── lib/             # Shared libraries & singleton instances
│   │   ├── auth.ts      # Better Auth setup with Prisma adapter
│   │   ├── env.ts       # Typed env export
│   │   └── prisma.ts    # Reusable PrismaClient singleton
│   ├── middleware/      # Custom Express middleware (auth guards, validators)
│   ├── modules/         # Feature modules for future expansion
│   ├── routes/          # API route definitions
│   │   └── index.ts     # Central router & health check
│   └── server.ts        # Express application entry point
├── prisma/
│   └── schema.prisma    # PostgreSQL database schema & Better Auth models
├── .env                 # Local environment variables (git-ignored)
├── .env.example         # Template for environment variables
├── .gitignore           # Git ignore configuration
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript compiler configuration
└── README.md
```

## Available Scripts

- `pnpm dev`: Starts the server in development mode with live reload using `tsx watch`.
- `pnpm build`: Compiles TypeScript files into the `dist/` directory using `tsc`.
- `pnpm start`: Runs the compiled production server (`node dist/server.js`).
- `pnpm prisma:generate`: Generates the Prisma client.
- `pnpm prisma:validate`: Validates the Prisma schema.
- `pnpm prisma:migrate`: Runs migrations in development (`prisma migrate dev`).
- `pnpm prisma:push`: Pushes schema directly to the database during early prototyping (`prisma db push`).
- `pnpm prisma:studio`: Opens Prisma Studio in browser.

## Environment Variables

Copy `.env.example` to `.env` and set your credentials:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
BETTER_AUTH_SECRET="replace-with-a-secure-secret"
BETTER_AUTH_URL="http://localhost:3000"
CORS_ORIGIN="http://localhost:8081,http://localhost:3000"
```

## API Endpoints

- `GET /api/health`: Health check endpoint.
  ```json
  {
    "success": true,
    "message": "Campus API is running"
  }
  ```
- `ALL /api/auth/*`: Better Auth authentication endpoints (sign-up, sign-in, session, sign-out, etc.).
