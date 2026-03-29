# Career Paths Platform

This is a Fullstack web application providing career guidance and mentorship.

## Tech Stack
*   **Frontend**: React.js, Vite, Tailwind CSS, TypeScript
*   **Backend**: Java 17+, Spring Boot
*   **Database**: PostgreSQL (via Docker)
*   **Cache**: Redis (via Docker)

## Project Structure
*   `/CareerPath_BE`: Spring Boot backend REST APIs.
*   `/CareerPaths_FE`: React/Vite frontend UI.
*   `/Architecture Format`: Documentation and coding guidelines.

## Quick Start

### 1. Start Services (Database & Cache)
Make sure you have [Docker](https://www.docker.com/) installed.
```bash
docker-compose up -d
```
This will start PostgreSQL on port **5432** and Redis on **6379**.

### 2. Start the Backend
Navigate to the backend directory and run the Spring Boot application using Maven:
```bash
cd CareerPath_BE
./mvnw spring-boot:run
```

### 3. Start the Frontend
Navigate to the frontend directory, install dependencies, and start the Vite dev server:
```bash
cd CareerPaths_FE
npm install
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).
