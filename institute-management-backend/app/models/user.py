from sqlalchemy import Column, String, Boolean, Enum as SQLEnum, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.db.base import BaseModel
import enum


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    TEACHER = "teacher"
    STUDENT = "student"
    STAFF = "staff"


class User(BaseModel):
    __tablename__ = "users"
    
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(SQLEnum(UserRole), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    phone_number = Column(String)
    address = Column(String)
    date_of_birth = Column(String)
    
    # Institute relationship
    institute_id = Column(ForeignKey("institutes.id"))
    institute = relationship("Institute", back_populates="users")
    
    # Role-specific relationships
    student_profile = relationship("Student", back_populates="user", uselist=False)
    teacher_profile = relationship("Teacher", back_populates="user", uselist=False)
    
    # Attendance records
    attendance_records = relationship("Attendance", back_populates="user")
    
    # Notifications
    notifications = relationship("Notification", back_populates="user")