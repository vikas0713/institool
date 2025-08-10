from sqlalchemy import Column, String, Integer, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.base import BaseModel


class Class(BaseModel):
    __tablename__ = "classes"
    
    name = Column(String, nullable=False)
    section = Column(String)
    grade_level = Column(String)  # e.g., "10th Grade", "1st Year"
    
    # Academic Year
    academic_year_id = Column(Integer, ForeignKey("academic_years.id"))
    academic_year = relationship("AcademicYear", back_populates="classes")
    
    # Class Teacher
    teacher_id = Column(Integer, ForeignKey("teachers.id"))
    teacher = relationship("Teacher", back_populates="classes")
    
    # Institute
    institute_id = Column(Integer, ForeignKey("institutes.id"))
    institute = relationship("Institute", back_populates="classes")
    
    # Room/Location
    room_number = Column(String)
    
    # Capacity
    max_students = Column(Integer)
    current_strength = Column(Integer, default=0)
    
    # Status
    is_active = Column(Boolean, default=True)
    
    # Relationships
    students = relationship("Student", back_populates="current_class")
    schedules = relationship("Schedule", back_populates="class_obj")