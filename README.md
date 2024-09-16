# job-queues-example

This is a microservice that is used to get applicant information for a scholarship application.

- [Technicals Requirements](#technicals-requirements)
- [Entity relationship diagram](#entity-relationship-diagram)
- [Event Modeling](#event-modeling)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Database Configuration](#database-configuration)
- [Mail Configuration](#mail-configuration)
- [Storage Configuration](#storage-configuration)
- [Entity Relationship Diagram](#entity-relationship-diagram)
- [Services Architecture](#services-architecture)
- [Event Modeling](#event-modeling)

# Technicals Requirements
- DB must be relational.

# Recommendations
- Use HAL and HATEOAS 


## Getting Started
These instructions will help you set up and run the Queue Job Demo Project on your local machine or server.

### Prerequisites
- Node.js and npm installed
- A database system (PostgreSQL)
- Nest Cli (@nestjs/cli) installed

## Installation
To install this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ChetanSaraswat/queue-jobs
   ```

2. Navigate into the project directory:
   ```bash
   cd job-queue-example
   ```

3. Create a `.env` file in the root of the project by copying the example file and update it with your configuration settings:
   ```sh
   cp .env.example .env
   ```

4. Build the Docker image and run Docker services with Docker Compose:
   ```sh
   docker compose up
   ```

5. Enter the backend container:
      ```sh
      docker compose exec backend sh
      ```

6. Install dependencies:
   ```sh
   npm ci
   ```
  
### Database Setup

Below are the steps to set up the database along with the corresponding commands:

1. Create the Database (if not already created by Docker Compose):
   ```bash
   npm run db:create
   ```

2. Drop and Recreate Database (if needed):
   ```bash
   npm run db:drop
   ```

3. Run Migrations:
   ```bash
   npm run migration:run
   ```

4. Rollback Migrations (if needed):
     ```bash
     npm run migration:revert
     ```

5. Seed the Database:
   ```bash
   npm run seed:run
   ```

### Running the Project

1. Start the HTTP API server in development mode:
   ```bash
   npm run start:dev
   ```

## Database Configuration
### PostgreSQL
The service uses PostgreSQL as its primary database. The PostgreSQL instance can be configured using the following environment variables:
- `DB_HOST`: The host of the Postgres database. Default is `"queue_jobs_demo"`.
- `DB_PORT`: The port of the Postgres database. Default is `5432`.
- `DB_USER`: The username of the Postgres database. Default is `postgres`.
- `DB_PASSWORD`: The password of the Postgres database. Default is `admin`.
- `DB_DATABASE`: The name of the Postgres database. Default is `"queue_jobs_demo"`.
- `DB_FORWARD_PORT`: The forward port of the Postgres database. Default is `5432`
  <a name="redis-configuration"></a>
## Redis Configuration
- `REDIS_HOST`: The host of the redis. Default is `"localhost"`.
- `REDIS_PORT`: The port of the redis. Default is `6379`.

## Note
- If you are running the service locally, the `DATABASE_HOST` should be set to `"localhost"`.
- When running the service with Docker, the `DATABASE_HOST` should be set to `"queue_jobs_demo"`.

Any change required ask it with the architect.
