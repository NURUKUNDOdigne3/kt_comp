# Database Setup Guide - KT Computer Supply

This guide will help you set up PostgreSQL database with Prisma for the KT Computer Supply e-commerce platform.

## Prerequisites

- Node.js 20+ installed
- PostgreSQL 14+ installed and running
- npm or yarn package manager

## Step 1: Install PostgreSQL

### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Default port is `5432`

### Using Docker (Alternative)
```bash
docker run --name kt-postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres:15
```

## Step 2: Create Database

Open PostgreSQL command line (psql) or pgAdmin and create a database:

```sql
CREATE DATABASE kt_computer_supply;
```

Or using command line:
```bash
psql -U postgres
CREATE DATABASE kt_computer_supply;
\q
```

## Step 3: Configure Environment Variables

1. Copy the example environment file:
```bash
cp env.example .env
```

2. Edit `.env` file and update the `DATABASE_URL`:
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/kt_computer_supply?schema=public"
```

Replace:
- `postgres` with your PostgreSQL username
- `yourpassword` with your PostgreSQL password
- `localhost` with your database host (if different)
- `5432` with your PostgreSQL port (if different)

3. Set a secure JWT secret:
```env
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

## Step 4: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- Prisma Client & CLI
- SWR for data fetching
- React Hook Form for form handling
- JWT & bcryptjs for authentication
- Zod for validation
- And all other dependencies

## Step 5: Generate Prisma Client

Generate the Prisma Client based on your schema:

```bash
npm run db:generate
```

## Step 6: Push Database Schema

Push the schema to your database (creates tables):

```bash
npm run db:push
```

Or use migrations (recommended for production):

```bash
npm run db:migrate
```

## Step 7: Seed the Database

Populate the database with initial data (categories, brands, products, admin user):

```bash
npm run db:seed
```

This will create:
- Admin user with credentials:
  - Email: `admin@ktcomputer.rw`
  - Password: `admin123`
- 6 product categories (Computers, Phones, Printers, Routers, Speakers, Monitors)
- 20+ brands (Apple, Dell, HP, Samsung, etc.)
- Sample products

## Step 8: Verify Setup

Open Prisma Studio to view your database:

```bash
npm run db:studio
```

This will open a browser interface at `http://localhost:5555` where you can view and edit your database records.

## Step 9: Run Development Server

Start the Next.js development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Database Commands Reference

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema changes to database |
| `npm run db:migrate` | Create and run migrations |
| `npm run db:seed` | Seed database with initial data |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

## Testing the API

### Login as Admin
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ktcomputer.rw","password":"admin123"}'
```

### Get Products
```bash
curl http://localhost:3000/api/products
```

### Get Categories
```bash
curl http://localhost:3000/api/categories
```

### Get Brands
```bash
curl http://localhost:3000/api/brands
```

## Troubleshooting

### Connection Error
If you get a connection error:
1. Verify PostgreSQL is running
2. Check your DATABASE_URL in `.env`
3. Ensure the database exists
4. Check firewall settings

### Migration Issues
If migrations fail:
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Then re-seed
npm run db:seed
```

### Prisma Client Issues
If Prisma Client is not found:
```bash
npm run db:generate
```

## Production Deployment

For production:
1. Use a managed PostgreSQL service (AWS RDS, Heroku Postgres, Supabase, etc.)
2. Set strong JWT_SECRET
3. Use environment variables for all sensitive data
4. Run migrations instead of db:push
5. Enable SSL for database connections

## Database Schema Overview

### Main Tables
- **User**: Authentication and user management
- **Product**: Product catalog
- **Category**: Product categories
- **Brand**: Product brands
- **Order**: Customer orders
- **OrderItem**: Order line items
- **CartItem**: Shopping cart
- **Review**: Product reviews

### Relationships
- Products belong to Categories and Brands
- Orders have multiple OrderItems
- Users can have Orders, Reviews, and CartItems
- Products can have Reviews and OrderItems

## Next Steps

1. ✅ Database is set up
2. ✅ Admin user created
3. ✅ Sample data loaded
4. 🔄 Customize products and categories
5. 🔄 Test authentication flows
6. 🔄 Build frontend components with SWR hooks
7. 🔄 Integrate React Hook Form in forms

## Support

For issues or questions:
- Check Prisma docs: https://www.prisma.io/docs
- Check Next.js docs: https://nextjs.org/docs
- Review the API routes in `src/app/api/`
