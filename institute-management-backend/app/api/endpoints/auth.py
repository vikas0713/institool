from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user import UserCreate, UserLogin, Token, User
from app.services.auth_service import AuthService
from app.core.deps import get_current_active_user

router = APIRouter()


@router.post("/register", response_model=User)
def register_user(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    """Register a new user"""
    auth_service = AuthService(db)
    try:
        user = auth_service.create_user(user_data)
        return user
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )


@router.post("/login", response_model=dict)
def login_user(
    login_data: UserLogin,
    db: Session = Depends(get_db)
):
    """Login user and return access token"""
    auth_service = AuthService(db)
    try:
        result = auth_service.login_user(login_data)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to login user"
        )


@router.get("/me", response_model=User)
def get_current_user_info(
    current_user: User = Depends(get_current_active_user)
):
    """Get current user information"""
    return current_user


@router.post("/refresh", response_model=Token)
def refresh_token(
    # Implementation for refresh token can be added here
    current_user: User = Depends(get_current_active_user)
):
    """Refresh access token"""
    # This is a placeholder - implement refresh logic as needed
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Refresh token endpoint not yet implemented"
    )