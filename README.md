# Portfolio - Full Stack Application

## Prerequisites

- Java 17+
- Node.js 18+
- Maven
- Supabase account (for PostgreSQL database)

## Backend Setup

### 1. Configure Supabase PostgreSQL

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Project Settings > Database** and find your connection string
3. Copy the environment variables from `.env.example` into your shell or `.env` file

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```
SUPABASE_DB_URL=jdbc:postgresql://<your-project>.supabase.co:5432/postgres?sslmode=require
SUPABASE_DB_USERNAME=postgres
SUPABASE_DB_PASSWORD=your-supabase-password
```

> **Note:** The backend reads these from environment variables. On Windows PowerShell:
> ```
> $env:SUPABASE_DB_URL="jdbc:postgresql://..."
> $env:SUPABASE_DB_USERNAME="postgres"
> $env:SUPABASE_DB_PASSWORD="..."
> ```

### 3. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend starts on `http://localhost:8080`. Tables are auto-created by Hibernate.

### 4. Run the Frontend

```bash
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`.

## API Documentation

All API endpoints are available under `http://localhost:8080/api/`.

Default admin credentials:
- Email: `admin@portfolio.com`
- Password: `admin123`

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Spring Boot 3.4 + JPA
- **Database:** PostgreSQL (Supabase)
- **Auth:** JWT
