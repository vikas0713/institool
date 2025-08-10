from sqlalchemy import Column, String, Integer, ForeignKey, Date, Boolean
from sqlalchemy.orm import relationship
from app.db.base import BaseModel


class AcademicYear(BaseModel):
    __tablename__ = "academic_years"
    
    # Academic Year Details
    year = Column(String, nullable=False)  # e.g., "2024-25"
    name = Column(String)  # e.g., "Academic Year 2024-25"
    
    # Dates
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    
    # Institute
    institute_id = Column(Integer, ForeignKey("institutes.id"))
    institute = relationship("Institute", back_populates="academic_years")
    
    # Status
    is_active = Column(Boolean, default=False)
    is_current = Column(Boolean, default=False)
    
    # Relationships
    classes = relationship("Class", back_populates="academic_year")
    enrollments = relationship("Enrollment", back_populates="academic_year")
    schedules = relationship("Schedule", back_populates="academic_year")
    grades = relationship("Grade", back_populates="academic_year")
    fees = relationship("Fee", back_populates="academic_year")