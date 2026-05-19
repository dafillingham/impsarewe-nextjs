# Imps Are We - Next.js Version

Lincoln City FC News website built with Next.js, React, and TypeScript.

## Features

- 📰 Article management system
- 💬 Comment system with user verification
- 👨‍💼 Admin dashboard for moderation
- 🔐 User authentication with JWT
- 📧 Email verification
- 🎨 Responsive design with Tailwind CSS
- 🗄️ MySQL database with Drizzle ORM

## Tech Stack

- **Framework**: Next.js 15
- **Frontend**: React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MySQL with Drizzle ORM
- **Authentication**: JWT
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm (or npm/yarn)
- MySQL database (IONOS)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create `.env.local` file with your environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Update `.env.local` with your database credentials and API keys

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
pnpm start
```

## Database

### Setup

1. Generate migrations:
   ```bash
   pnpm drizzle-kit generate
   ```

2. Review generated SQL in `drizzle/migrations/`

3. Apply migrations to your database

### Schema

Database schema is defined in `drizzle/schema.ts` with the following tables:
- `users` - User accounts
- `posts` - Articles
- `comments` - Article comments
- `commentUsers` - Comment user profiles
- `verificationCodes` - Email verification
- `fixtures` - Match fixtures
- `results` - Match results
- `lineups` - Team lineups

## API Routes

- `GET /api/posts` - Get published articles
- `POST /api/posts` - Create new article (authenticated)
- `GET /api/comments?postId=1` - Get comments for article
- `POST /api/comments` - Create comment
- `GET /api/auth` - Get current user
- `POST /api/auth` - Logout

## Deployment

### IONOS VPS

1. Buy IONOS VPS M+ (Linux Ubuntu 24.04)
2. Push to GitHub
3. GitHub Actions will automatically deploy

### Environment Variables

Set these in your hosting environment:
- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to `production`

## Testing

```bash
pnpm test
```

## License

MIT
