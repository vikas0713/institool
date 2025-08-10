from sqlalchemy import Column, String, Boolean, Text
from sqlalchemy.orm import relationship
from app.db.base import BaseModel


class Institute(BaseModel):
    __tablename__ = "institutes"
    
    name = Column(String, nullable=False, unique=True)
    code = Column(String, unique=True, index=True)
    address = Column(Text)
    city = Column(String)
    state = Column(String)
    country = Column(String)
    postal_code = Column(String)
    phone = Column(String)
    email = Column(String)
    website = Column(String)
    logo_url = Column(String)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    users = relationship("User", back_populates="institute")
    departments = relationship("Department", back_populates="institute")
    courses = relationship("Course", back_populates="institute")
    classes = relationship("Class", back_populates="institute")
    academic_years = relationship("AcademicYear", back_populates="institute")