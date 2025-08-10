from sqlalchemy import Column, Integer, ForeignKey, Date, Time, Boolean, String, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.db.base import BaseModel
import enum


class AttendanceStatus(str, enum.Enum):
    PRESENT = "present"
    ABSENT = "absent"
    LATE = "late"
    EXCUSED = "excused"
    HOLIDAY = "holiday"


class Attendance(BaseModel):
    __tablename__ = "attendance"
    
    # User (Student/Teacher)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="attendance_records")
    
    # Schedule
    schedule_id = Column(Integer, ForeignKey("schedules.id"))
    schedule = relationship("Schedule", back_populates="attendance_records")
    
    # Date and Time
    date = Column(Date, nullable=False)
    check_in_time = Column(Time)
    check_out_time = Column(Time)
    
    # Status
    status = Column(SQLEnum(AttendanceStatus), nullable=False)
    
    # Remarks
    remarks = Column(String)
    
    # Marked By
    marked_by_id = Column(Integer, ForeignKey("users.id"))
    
    # Late Minutes (if applicable)
    late_minutes = Column(Integer, default=0)