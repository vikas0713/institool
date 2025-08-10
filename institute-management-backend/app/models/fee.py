from sqlalchemy import Column, String, Integer, ForeignKey, Float, Date, Boolean, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.db.base import BaseModel
import enum


class FeeStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    PARTIAL = "partial"
    OVERDUE = "overdue"
    WAIVED = "waived"


class FeeType(str, enum.Enum):
    TUITION = "tuition"
    ADMISSION = "admission"
    EXAM = "exam"
    LIBRARY = "library"
    LABORATORY = "laboratory"
    SPORTS = "sports"
    TRANSPORT = "transport"
    HOSTEL = "hostel"
    OTHER = "other"


class Fee(BaseModel):
    __tablename__ = "fees"
    
    # Student
    student_id = Column(Integer, ForeignKey("students.id"))
    student = relationship("Student", back_populates="fees")
    
    # Academic Year
    academic_year_id = Column(Integer, ForeignKey("academic_years.id"))
    academic_year = relationship("AcademicYear", back_populates="fees")
    
    # Fee Details
    fee_type = Column(SQLEnum(FeeType), nullable=False)
    description = Column(String)
    
    # Amount
    amount = Column(Float, nullable=False)
    paid_amount = Column(Float, default=0)
    discount_amount = Column(Float, default=0)
    fine_amount = Column(Float, default=0)
    
    # Dates
    due_date = Column(Date)
    payment_date = Column(Date)
    
    # Status
    status = Column(SQLEnum(FeeStatus), default=FeeStatus.PENDING)
    
    # Payment Details
    payment_method = Column(String)  # e.g., "Cash", "Card", "Online"
    transaction_id = Column(String)
    receipt_number = Column(String, unique=True)
    
    # Remarks
    remarks = Column(String)