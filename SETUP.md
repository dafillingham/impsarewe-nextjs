# Setup Guide - Imps Are We

Complete setup instructions for the Next.js conversion of Imps Are We.

## Local Development

### 1. Prerequisites

- Node.js 22+
- pnpm (or npm/yarn)
- MySQL database (IONOS or local)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/impsarewe.git
cd impsarewe

# Install dependencies
pnpm install
```

### 3. Environment Setup

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Update with your values:

```
DATABASE_URL=mysql://user:password@localhost:3306/impsarewe
JWT_SECRET=your-secret-key-change-this
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

```bash
# Generate migrations
pnpm drizzle-kit generate

# Apply migrations to your database
# (Use your MySQL client to run the generated SQL)
```

### 5. Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` in your browser.

## Features Overview

### Articles
- Browse published articles
- Filter by category
- View full article with comments

### Comments
- Leave comments on articles (requires registration)
- Email verification for comment authors
- Nested comment threads

### Admin Dashboard
- Review submitted articles
- Approve or reject submissions
- Manage published content

### User Management
- User registration with email verification
- Login/logout functionality
- User profiles
- Comment history

### Contact Form
- Send messages to site administrators
- Form validation
- Email notifications (when configured)

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── articles/          # Article pages
│   ├── login/             # Auth pages
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
├── middleware.ts         # Next.js middleware
└── styles/              # Global CSS
```

## Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## Building

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed VPS deployment instructions.

### Quick Deploy to IONOS VPS

1. Push to GitHub:
```bash
git push origin main
```

2. GitHub Actions will automatically:
   - Build the project
   - Run tests
   - Deploy to VPS
   - Restart the application

3. Verify deployment:
   - Visit `https://impsarewe.com`
   - Check admin dashboard
   - Test article submission

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | MySQL connection string |
| JWT_SECRET | Yes | Secret key for JWT tokens |
| NODE_ENV | No | Set to `production` for VPS |
| NEXT_PUBLIC_APP_URL | No | Public app URL |

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED
```
- Check DATABASE_URL is correct
- Verify MySQL is running
- Ensure credentials are valid

### Build Fails
```
pnpm build
```
- Check for TypeScript errors
- Verify all dependencies are installed
- Check environment variables

### Port Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Contact the maintainers

## License

MIT
