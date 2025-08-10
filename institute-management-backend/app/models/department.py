from sqlalchemy import Column, String, Integer, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.base import BaseModel


class Department(BaseModel):
    __tablename__ = "departments"
    
    name = Column(String, nullable=False)
    code = Column(String, unique=True, index=True)
    description = Column(String)
    
    # Head of Department
    head_id = Column(Integer, ForeignKey("teachers.id"))
    
    # Institute
    institute_id = Column(Integer, ForeignKey("institutes.id"))
    institute = relationship("Institute", back_populates="departments")
    
    # Status
    is_active = Column(Boolean, default=True)
    
    # Relationships
    courses = relationship("Course", back_populates="department")
    teachers = relationship("Teacher", back_populates="department")
    students = relationship("Student", back_populates="department")