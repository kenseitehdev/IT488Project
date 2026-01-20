"""Database utilities for the HomeStack backend.

This project uses plain SQLAlchemy (not Flask-SQLAlchemy) so the backend stays
lightweight and easy to understand.
"""

from __future__ import annotations

import os
from contextlib import contextmanager
from typing import Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DB_PATH = os.path.join(BASE_DIR, "homestack.db")
DATABASE_URL = os.environ.get("DATABASE_URL", f"sqlite:///{DEFAULT_DB_PATH}")

_engine_kwargs = {}
if DATABASE_URL.startswith("sqlite"):
    _engine_kwargs["connect_args"] = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, **_engine_kwargs)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


@contextmanager
def get_session() -> Iterator[Session]:
    """Provide a transactional scope around a series of operations."""
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
