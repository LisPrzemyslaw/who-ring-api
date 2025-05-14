# Who Ring Application

This is a Who Ring application for registration and verification of phone numbers. The application consists of:

1. A FastAPI backend API for handling phone number registration and verification
2. A React frontend for user interaction
3. A Redis instance for storing verification codes

## Project Structure

- `src/who_ring_api/` - Backend API built with FastAPI
- `src/who_ring_frontend/` - Frontend application built with React
- `docker/` - Docker configuration files for containerization

## Configuration

The backend API requires a `.env` file located inside the `src/who_ring_api/config/` folder.
The `.env` file should contain the following variables:
- `REDIS_HOST` - Redis host (default: redis)
- `REDIS_PORT` - Redis port (default: 6379)
- Additional configuration variables as needed

## Running the Application

To run the application, just enter the docker folder and run the following command:
```bash
docker-compose up
```

This will start all services defined in the docker-compose.yml file:
- Backend API (FastAPI)
- Frontend (React)
- Redis

## Accessing the Application

- The frontend application will be available at http://localhost
- The backend API will be available at http://localhost:8000
- API documentation is available at http://localhost:8000/docs

## Development

For development purposes, you can run the frontend and backend separately:

### Backend
```bash
cd src/who_ring_api
uvicorn main:app --reload
```

### Frontend
```bash
cd src/who_ring_frontend
npm install
npm start
```
