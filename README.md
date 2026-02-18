# 🥤 Coke Logger

Track your Coca-Cola consumption with style! A modern full-stack web application built with Next.js 16, Better Auth, and Neon Database.

## ✨ Features

- 🔐 **Authentication** - Secure email/password auth with Better Auth
- 📊 **Dashboard** - Track and visualize your Coca-Cola consumption
- 📝 **Logging** - Record drink type, format, size, and notes
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS and shadcn/ui
- 🌙 **Dark Mode** - Eye-friendly theme support
- 📱 **Responsive** - Works seamlessly on desktop and mobile

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Authentication**: Better Auth
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Radix UI
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 20+ installed
- **pnpm** 9+ (or npm/yarn)
- **Neon account** ([sign up free](https://neon.tech))

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd coke-logger
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values:

```bash
# Neon Database URL (get from https://console.neon.tech)
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require

# Better Auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your-secret-here

# Application URL
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Get your Neon database URL

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project (or use existing)
3. Create a branch for development (optional but recommended):
   - Branch name: `dev`
   - Parent: `main`
4. Copy the **Connection String** (Pooled)
5. Paste it as `DATABASE_URL` in `.env.local`

### 5. Run database migrations

```bash
pnpm db:migrate
```

This will create all necessary tables in your Neon database.

### 6. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Generate new migration from schema changes |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:push` | Push schema changes directly (dev only) |
| `pnpm db:studio` | Open Drizzle Studio (database GUI) |
| `pnpm setup` | Install dependencies and run migrations |

## 🗄️ Database Management

### Creating a new migration

After modifying the database schema in `db/schemas/`:

```bash
pnpm db:generate
pnpm db:migrate
```

### Viewing your database

```bash
pnpm db:studio
```

This opens Drizzle Studio at `http://localhost:4983`

### Database Branching (Neon)

Neon allows you to create database branches like git:

- **main** - Production database
- **dev** - Development database (copy of main)

Create branches in [Neon Console](https://console.neon.tech) → Branches → Create Branch

## 🌍 Environment Strategy

### Development (Local)
- Use `.env.local` with Neon `dev` branch
- Never commit `.env.local` to git

### Production (Vercel)
- Configure environment variables in Vercel Dashboard
- Use Neon `main` branch for production

### Environment Variables Reference

| Variable | Development | Production |
|----------|-------------|------------|
| `DATABASE_URL` | Neon dev branch | Neon main branch |
| `BETTER_AUTH_SECRET` | Any secure string | **Different** secure string |
| `BETTER_AUTH_URL` | `http://localhost:3000` | `https://your-app.vercel.app` |

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables:
   - `DATABASE_URL` - Neon main branch URL
   - `BETTER_AUTH_SECRET` - Generate new secret
   - `BETTER_AUTH_URL` - Your Vercel URL
4. Deploy!

### Running migrations in production

```bash
# Install Vercel CLI
pnpm add -g vercel

# Pull production environment variables
vercel env pull .env.production.local

# Run migrations
pnpm db:migrate
```

## 📁 Project Structure

```
coke-logger/
├── app/                    # Next.js App Router pages
│   ├── (app)/             # Authenticated routes
│   │   ├── dashboard/     # Main dashboard
│   │   └── create/        # Create new log
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── landing/          # Landing page components
├── db/                   # Database layer
│   ├── schemas/          # Drizzle schemas
│   └── drizzle.ts        # Database connection
├── lib/                  # Utilities
│   └── auth.ts           # Better Auth config
├── server/               # Server actions
│   ├── users.ts          # User auth actions
│   └── coke-logs.ts      # Coke log CRUD
└── drizzle/              # Migration files
```

## 🔒 Security

- All passwords are hashed with Better Auth
- Environment variables never committed to git
- Database connections use SSL
- CSRF protection enabled
- Secure session management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Database connection errors

- Verify your `DATABASE_URL` is correct
- Ensure `?sslmode=require` is in the connection string
- Check Neon dashboard for database status

### Migration errors

- Run `pnpm db:generate` after schema changes
- Delete migration files and regenerate if needed
- Check Neon Console → SQL Editor for table state

### Build errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- Check TypeScript errors: `pnpm tsc --noEmit`

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check [Neon Documentation](https://neon.tech/docs)
- Visit [Better Auth Docs](https://better-auth.com)

---

Made with ❤️ and 🥤 Coca-Cola
