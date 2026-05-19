# Imps Are We - Next.js Edition

Lincoln City FC News website - Converted from Express + tRPC to Next.js 15.

## 🎯 Project Overview

This is a complete rewrite of the Imps Are We news platform, converting from:
- **Express.js** → **Next.js 15**
- **tRPC** → **Next.js API Routes**
- **Vite** → **Next.js built-in bundler**

All features, database, and functionality remain intact with improved performance and deployment simplicity.

## ✨ Features

- 📰 **Article Management** - Create, publish, and manage articles
- 💬 **Comments System** - Readers can comment on articles with email verification
- 👨‍💼 **Admin Dashboard** - Review and approve submitted articles
- 🔐 **User Authentication** - Registration, login, and user profiles
- 📧 **Email Verification** - Secure comment author verification
- 📝 **Contact Form** - Allow readers to contact administrators
- 🎨 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🔒 **Protected Routes** - Admin-only access control
- 🗄️ **MySQL Database** - Drizzle ORM for type-safe queries

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Next.js 15, Tailwind CSS 4 |
| **Backend** | Next.js API Routes |
| **Database** | MySQL with Drizzle ORM |
| **Authentication** | JWT tokens with HTTP-only cookies |
| **UI Components** | shadcn/ui |
| **Testing** | Vitest |
| **Deployment** | GitHub Actions → IONOS VPS |

## 📦 Installation

### Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/impsarewe.git
cd impsarewe

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Update with your database credentials
nano .env.local

# Run development server
pnpm dev
```

Visit `http://localhost:3000`

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed VPS setup instructions.

## 📁 Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── api/                     # API routes
│   │   ├── admin/posts/         # Admin article management
│   │   ├── auth/                # Authentication
│   │   ├── comments/            # Comments API
│   │   ├── contact/             # Contact form
│   │   ├── login/               # Login endpoint
│   │   ├── posts/               # Articles API
│   │   ├── register/            # Registration
│   │   ├── user/profile/        # User profile
│   │   └── verify-email/        # Email verification
│   ├── admin/                   # Admin dashboard
│   ├── articles/                # Article pages
│   ├── contact/                 # Contact page
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   ├── submit/                  # Article submission
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── Header.tsx               # Navigation header
│   └── Footer.tsx               # Footer
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts              # Authentication hook
│   ├── useComments.ts          # Comments hook
│   └── usePosts.ts             # Posts hook
├── lib/
│   ├── api.ts                  # API client utilities
│   ├── auth.ts                 # Auth utilities
│   ├── db.ts                   # Database connection
│   ├── jwt.ts                  # JWT utilities
│   ├── queries.ts              # Database queries
│   └── utils.ts                # Helper functions
├── middleware.ts               # Next.js middleware
├── styles/globals.css          # Global styles
└── types/index.ts              # TypeScript types

drizzle/
├── schema.ts                   # Database schema
└── migrations/                 # SQL migrations

.github/
└── workflows/
    └── deploy.yml              # GitHub Actions workflow
```

## 🚀 Getting Started

### 1. Local Development

```bash
pnpm dev
```

### 2. Create an Article

1. Register at `/register`
2. Login at `/login`
3. Go to `/submit`
4. Fill in article details
5. Submit for review

### 3. Admin Review

1. Login with admin account
2. Go to `/admin`
3. Review pending articles
4. Approve or reject

### 4. Deploy to VPS

```bash
# Push to GitHub
git push origin main

# GitHub Actions automatically:
# 1. Builds the project
# 2. Runs tests
# 3. Deploys to IONOS VPS
# 4. Restarts the application
```

## 📝 API Documentation

### Articles

**GET /api/posts**
- Returns all published articles
- No authentication required

**POST /api/posts**
- Create new article (requires authentication)
- Body: `{ title, excerpt, content, category, author, imageUrl }`

**GET /api/posts/[id]**
- Get specific article by ID

### Comments

**GET /api/comments?postId=1**
- Get comments for an article

**POST /api/comments**
- Create comment (requires authentication)
- Body: `{ postId, userId, content }`

### Authentication

**POST /api/register**
- Register new user
- Body: `{ email, username }`

**POST /api/login**
- Login user
- Body: `{ email, password }`

**GET /api/auth**
- Get current user
- Returns: `{ user: User | null }`

**POST /api/auth**
- Logout user
- Body: `{ action: "logout" }`

### Admin

**GET /api/admin/posts**
- Get submitted articles (admin only)

**PATCH /api/admin/posts**
- Approve/reject article (admin only)
- Body: `{ postId, status, rejectionReason? }`

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 🔐 Security

- ✅ JWT authentication with HTTP-only cookies
- ✅ Protected admin routes with middleware
- ✅ Email verification for comment authors
- ✅ CSRF protection ready
- ✅ Secure password handling (use bcrypt in production)
- ✅ SQL injection prevention with Drizzle ORM

## 📊 Database Schema

### Users
- id, email, password, role, createdAt, updatedAt

### Posts
- id, title, excerpt, content, author, category, imageUrl, status, publishedDate, submittedBy, submittedAt

### Comments
- id, postId, userId, content, createdAt, updatedAt

### CommentUsers
- id, email, username, avatarUrl, isVerified, createdAt

### VerificationCodes
- id, email, code, expiresAt, createdAt

## 🚀 Deployment

### IONOS VPS M+ (Ubuntu 24.04)

1. **Buy VPS**: £3/month
2. **Follow**: [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **Setup GitHub Secrets**: [GITHUB_SETUP.md](./GITHUB_SETUP.md)
4. **Push to GitHub**: Automatic deployment via GitHub Actions

### Environment Variables

```
DATABASE_URL=mysql://user:password@host:3306/impsarewe
JWT_SECRET=your-secret-key
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://impsarewe.com
```

## 📚 Documentation

- [Setup Guide](./SETUP.md) - Local development setup
- [Deployment Guide](./DEPLOYMENT.md) - VPS deployment
- [GitHub Actions Setup](./GITHUB_SETUP.md) - CI/CD configuration

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
mysql -u user -p -h host -D database
```

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

### Port Already in Use
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

## 📈 Performance

- ✅ Server-side rendering for SEO
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Database query optimization
- ✅ Caching strategies

## 🔄 Migration from Old Version

This is a complete rewrite. Key changes:

| Old | New |
|-----|-----|
| Express.js | Next.js 15 |
| tRPC | Next.js API Routes |
| Vite | Next.js bundler |
| Manus OAuth | JWT + Custom auth |
| Manus storage | File handling |

All features work identically from the user's perspective.

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push and create a Pull Request

## 📧 Support

For issues or questions, create a GitHub issue with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details

---

**Made with ❤️ for Lincoln City FC fans**
