from sqlalchemy import Column, String, Integer, ForeignKey, Date, Boolean, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.db.base import BaseModel
import enum


class EnrollmentStatus(str, enum.Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    DROPPED = "dropped"
    WITHDRAWN = "withdrawn"


class Enrollment(BaseModel):
    __tablename__ = "enrollments"
    
    # Student and Course
    student_id = Column(Integer, ForeignKey("students.id"))
    student = relationship("Student", back_populates="enrollments")
    
    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="enrollments")
    
    # Academic Year and Semester
    academic_year_id = Column(Integer, ForeignKey("academic_years.id"))
    academic_year = relationship("AcademicYear", back_populates="enrollments")
    
    semester = Column(String)  # e.g., "Fall 2024", "Spring 2024"
    
    # Enrollment Details
    enrollment_date = Column(Date)
    status = Column(SQLEnum(EnrollmentStatus), default=EnrollmentStatus.ACTIVE)
    
    # Grade
    final_grade = Column(String)  # e.g., "A", "B+", etc.
    grade_points = Column(Integer)
    
    # Attendance
    attendance_percentage = Column(Integer)