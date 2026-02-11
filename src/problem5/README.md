# Resource API (Problem 5)

A production-grade RESTful CRUD API built with Express, TypeScript, and Prisma.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Navigate to the project folder:
   ```bash
   cd src/problem5
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Ensure a `.env` file exists in the root of `src/problem5` with the following content:
   ```env
   DATABASE_URL="file:./dev.db"
   PORT=3000
   ```
   *Note: You can switch `DATABASE_URL` to a PostgreSQL connection string if preferred.*

4. Initialize the Database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Running the Application

- **Development Mode** (with hot-reload):
  ```bash
  npm run dev
  ```
  Server will start at `http://localhost:3000`.

- **Production Build**:
  ```bash
  npm run build
  npm start
  ```

## API Documentation

### Resources

#### Create a Resource
- **URL**: `POST /api/resources`
- **Body**:
  ```json
  {
    "name": "Resource Name",
    "description": "Optional description",
    "status": "active"
  }
  ```
- **Response**: `201 Created`

#### List Resources
- **URL**: `GET /api/resources`
- **Query Params**:
  - `status`: Filter by status (e.g., `?status=active`)
  - `name`: Filter by name substring (e.g., `?name=Resource`)
- **Response**: `200 OK`

#### Get a Resource
- **URL**: `GET /api/resources/:id`
- **Response**: `200 OK` or `404 Not Found`

#### Update a Resource
- **URL**: `PATCH /api/resources/:id`
- **Body**: (Partial update)
  ```json
  {
    "status": "inactive"
  }
  ```
- **Response**: `200 OK`

#### Delete a Resource
- **URL**: `DELETE /api/resources/:id`
- **Response**: `204 No Content`

## Architecture

This project follows a layered architecture:
- **Controller**: Handles HTTP requests and responses.
- **Service**: Contains business logic.
- **Repository**: Handles direct database interactions (Prisma).

Technologies used:
- **ExpressJS**: Web framework.
- **TypeScript**: Language.
- **Prisma**: ORM.
- **Zod**: Validation.
- **SQLite**: Default database (easy to swap).
