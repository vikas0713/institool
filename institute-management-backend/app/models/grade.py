from sqlalchemy import Column, String, Integer, ForeignKey, Float, Date, Text
from sqlalchemy.orm import relationship
from app.db.base import BaseModel


class Grade(BaseModel):
    __tablename__ = "grades"
    
    # Student and Course
    student_id = Column(Integer, ForeignKey("students.id"))
    student = relationship("Student", back_populates="grades")
    
    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="grades")
    
    # Academic Year
    academic_year_id = Column(Integer, ForeignKey("academic_years.id"))
    academic_year = relationship("AcademicYear", back_populates="grades")
    
    # Grade Details
    assessment_type = Column(String)  # e.g., "Midterm", "Final", "Assignment", "Quiz"
    assessment_name = Column(String)
    
    # Scores
    obtained_marks = Column(Float)
    total_marks = Column(Float)
    percentage = Column(Float)
    grade_letter = Column(String)  # e.g., "A", "B+", etc.
    grade_points = Column(Float)
    
    # Date
    assessment_date = Column(Date)
    
    # Feedback
    feedback = Column(Text)
    
    # Graded By
    graded_by_id = Column(Integer, ForeignKey("users.id"))