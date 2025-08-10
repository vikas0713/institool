from sqlalchemy import Column, String, Integer, ForeignKey, Float, Boolean, Text
from sqlalchemy.orm import relationship
from app.db.base import BaseModel


class Course(BaseModel):
    __tablename__ = "courses"
    
    code = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    credits = Column(Float, nullable=False)
    
    # Course Type
    is_mandatory = Column(Boolean, default=True)
    is_elective = Column(Boolean, default=False)
    
    # Department and Institute
    department_id = Column(Integer, ForeignKey("departments.id"))
    department = relationship("Department", back_populates="courses")
    
    institute_id = Column(Integer, ForeignKey("institutes.id"))
    institute = relationship("Institute", back_populates="courses")
    
    # Teacher
    teacher_id = Column(Integer, ForeignKey("teachers.id"))
    teacher = relationship("Teacher", back_populates="courses")
    
    # Prerequisites
    prerequisites = Column(Text)  # JSON string of prerequisite course codes
    
    # Syllabus
    syllabus = Column(Text)
    
    # Maximum Students
    max_students = Column(Integer)
    
    # Status
    is_active = Column(Boolean, default=True)
    
    # Relationships
    enrollments = relationship("Enrollment", back_populates="course")
    schedules = relationship("Schedule", back_populates="course")
    grades = relationship("Grade", back_populates="course")