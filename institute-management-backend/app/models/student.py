from sqlalchemy import Column, String, Integer, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from app.db.base import BaseModel


class Student(BaseModel):
    __tablename__ = "students"
    
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    user = relationship("User", back_populates="student_profile")
    
    student_id = Column(String, unique=True, index=True, nullable=False)
    enrollment_date = Column(Date)
    admission_number = Column(String, unique=True)
    
    # Academic Information
    class_id = Column(Integer, ForeignKey("classes.id"))
    current_class = relationship("Class", back_populates="students")
    
    department_id = Column(Integer, ForeignKey("departments.id"))
    department = relationship("Department", back_populates="students")
    
    # Parent/Guardian Information
    guardian_name = Column(String)
    guardian_phone = Column(String)
    guardian_email = Column(String)
    guardian_relation = Column(String)
    
    # Emergency Contact
    emergency_contact_name = Column(String)
    emergency_contact_phone = Column(String)
    
    # Additional Information
    blood_group = Column(String)
    medical_conditions = Column(String)
    
    # Academic Performance
    current_cgpa = Column(Float)
    
    # Relationships
    enrollments = relationship("Enrollment", back_populates="student")
    grades = relationship("Grade", back_populates="student")
    fees = relationship("Fee", back_populates="student")