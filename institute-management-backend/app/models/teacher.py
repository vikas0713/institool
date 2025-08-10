from sqlalchemy import Column, String, Integer, ForeignKey, Date, Float, Text
from sqlalchemy.orm import relationship
from app.db.base import BaseModel


class Teacher(BaseModel):
    __tablename__ = "teachers"
    
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    user = relationship("User", back_populates="teacher_profile")
    
    employee_id = Column(String, unique=True, index=True, nullable=False)
    joining_date = Column(Date)
    
    # Professional Information
    designation = Column(String)
    qualification = Column(String)
    specialization = Column(String)
    experience_years = Column(Integer)
    
    department_id = Column(Integer, ForeignKey("departments.id"))
    department = relationship("Department", back_populates="teachers")
    
    # Additional Information
    bio = Column(Text)
    research_interests = Column(Text)
    publications = Column(Text)
    
    # Salary Information
    basic_salary = Column(Float)
    
    # Relationships
    courses = relationship("Course", back_populates="teacher")
    classes = relationship("Class", back_populates="teacher")
    schedules = relationship("Schedule", back_populates="teacher")