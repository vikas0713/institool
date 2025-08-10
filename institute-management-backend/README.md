# Institute Management System - Backend API

A comprehensive FastAPI-based backend for Institute Management System with PostgreSQL database.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete CRUD operations for users with different roles (Admin, Teacher, Student, Staff)
- **Institute Management**: Multi-institute support with department and course management
- **Student Management**: Student profiles, enrollment, attendance, and grade tracking
- **Teacher Management**: Teacher profiles, course assignments, and schedule management
- **Course Management**: Course creation, enrollment, and scheduling
- **Grade & Assessment**: Grade management and academic performance tracking
- **Fee Management**: Fee collection and payment tracking
- **Notification System**: In-app notifications for various events
- **Academic Year Management**: Support for multiple academic years

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT with python-jose
- **Password Hashing**: bcrypt via passlib
- **Migration**: Alembic
- **Environment Management**: python-dotenv
- **API Documentation**: Automatic OpenAPI/Swagger docs

## Setup Instructions

### Prerequisites

- Python 3.9+
- PostgreSQL
- uv (Python package manager)

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd institute-management-backend
   ```

2. **Install uv (if not already installed)**
   ```bash
   # On macOS and Linux
   curl -LsSf https://astral.sh/uv/install.sh | sh
   
   # On Windows
   powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
   ```

3. **Install dependencies and create virtual environment**
   ```bash
   uv sync
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/institute_db
   SECRET_KEY=your-secret-key-here
   ```

5. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE institute_management_db;
   CREATE USER postgres WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE institute_management_db TO postgres;
   ```

6. **Initialize database (optional - tables are created automatically)**
   ```bash
   alembic revision --autogenerate -m "Initial migration"
   alembic upgrade head
   ```

7. **Run the application**
   ```bash
   uv run python -m app.main
   ```
   
   Or using uvicorn:
   ```bash
   uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## API Documentation

Once the server is running, access the API documentation at:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user info

### Users
- `GET /api/v1/users/` - Get all users (admin only)
- `GET /api/v1/users/{id}` - Get user by ID
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user (admin only)

### Health Check
- `GET /api/v1/health` - API health check

## Database Models

### Core Models
- **User**: Base user model with role-based access
- **Institute**: Institute/organization management
- **Student**: Student-specific profile and academic information
- **Teacher**: Teacher-specific profile and professional information
- **Course**: Course management with credits and prerequisites
- **Department**: Department organization within institutes
- **Class**: Class/section management
- **AcademicYear**: Academic year and semester management

### Academic Models
- **Enrollment**: Student course enrollments
- **Grade**: Assessment and grading system
- **Attendance**: Attendance tracking for students and teachers
- **Schedule**: Class scheduling and timetable management
- **Fee**: Fee management and payment tracking
- **Notification**: In-app notification system

## User Roles

- **Admin**: Full system access, user management, institute configuration
- **Teacher**: Course management, student grading, attendance marking
- **Student**: View grades, attendance, course enrollment
- **Staff**: Administrative tasks, fee management

## Configuration

Key environment variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/db_name

# Security
SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Application
DEBUG=True
CORS_ORIGINS=["http://localhost:5173"]

# Optional: Email, Redis, etc.
SMTP_HOST=smtp.gmail.com
REDIS_URL=redis://localhost:6379/0
```

## Development

### Running Tests
```bash
uv run pytest
```

### Database Migrations
```bash
# Generate migration
uv run alembic revision --autogenerate -m "Description"

# Apply migration
uv run alembic upgrade head

# Downgrade
uv run alembic downgrade -1
```

### Code Style
The project follows PEP 8 standards. Use tools like `black` and `flake8` for code formatting.

## Production Deployment

1. Set `DEBUG=False` in environment
2. Use production-grade database settings
3. Set up proper CORS origins
4. Use environment secrets for sensitive data
5. Set up proper logging and monitoring
6. Use a production ASGI server like Gunicorn with Uvicorn workers

## Support

For issues and support, please check the documentation or create an issue in the repository.