from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Text, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.db.base import BaseModel
import enum


class NotificationType(str, enum.Enum):
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    SUCCESS = "success"
    ANNOUNCEMENT = "announcement"
    ASSIGNMENT = "assignment"
    EXAM = "exam"
    FEE = "fee"
    ATTENDANCE = "attendance"


class Notification(BaseModel):
    __tablename__ = "notifications"
    
    # User
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="notifications")
    
    # Notification Details
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    type = Column(SQLEnum(NotificationType), default=NotificationType.INFO)
    
    # Status
    is_read = Column(Boolean, default=False)
    is_archived = Column(Boolean, default=False)
    
    # Related Entity (optional)
    entity_type = Column(String)  # e.g., "course", "assignment", "fee"
    entity_id = Column(Integer)
    
    # Action URL (optional)
    action_url = Column(String)
    
    # Sender (optional)
    sender_id = Column(Integer, ForeignKey("users.id"))