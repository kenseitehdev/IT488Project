"""SQLAlchemy ORM models for HomeStack."""

from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, Optional

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Item(Base):
    """Represents a physical media item (book, DVD, vinyl, etc.)."""

    __tablename__ = "items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    media_type: Mapped[str] = mapped_column(String(50), nullable=False)  # book, dvd, etc.
    creator: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)  # author/director/artist
    year: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    tags: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)  # comma-separated
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "media_type": self.media_type,
            "creator": self.creator,
            "year": self.year,
            "tags": self.tags,
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
