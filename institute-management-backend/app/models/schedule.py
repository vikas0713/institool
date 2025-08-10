from sqlalchemy import Column, String, Integer, ForeignKey, Time, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.db.base import BaseModel
import enum


class DayOfWeek(str, enum.Enum):
    MONDAY = "monday"
    TUESDAY = "tuesday"
    WEDNESDAY = "wednesday"
    THURSDAY = "thursday"
    FRIDAY = "friday"
    SATURDAY = "saturday"
    SUNDAY = "sunday"


class Schedule(BaseModel):
    __tablename__ = "schedules"
    
    # Course and Class
    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="schedules")
    
    class_id = Column(Integer, ForeignKey("classes.id"))
    class_obj = relationship("Class", back_populates="schedules")
    
    # Teacher
    teacher_id = Column(Integer, ForeignKey("teachers.id"))
    teacher = relationship("Teacher", back_populates="schedules")
    
    # Day and Time
    day_of_week = Column(SQLEnum(DayOfWeek), nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    
    # Room/Location
    room_number = Column(String)
    
    # Academic Year
    academic_year_id = Column(Integer, ForeignKey("academic_years.id"))
    academic_year = relationship("AcademicYear", back_populates="schedules")
    
    # Type
    schedule_type = Column(String)  # e.g., "Lecture", "Lab", "Tutorial"
    
    # Relationships
    attendance_records = relationship("Attendance", back_populates="schedule")