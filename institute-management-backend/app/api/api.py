from fastapi import APIRouter
from app.api.endpoints import auth, users

api_router = APIRouter()

# Include auth routes
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])

# Include user routes
api_router.include_router(users.router, prefix="/users", tags=["users"])

# Health check endpoint
@api_router.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Institute Management System API is running"}