from __future__ import annotations

from functools import wraps
from datetime import datetime, timedelta, timezone
import os

import jwt
from flask import request, jsonify, g

from db import get_session
from models import User


SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-change-this")
JWT_ALGORITHM = "HS256"
JWT_EXPIRES_HOURS = 24


def generate_token(user: User) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "user_id": user.user_id,
        "email": user.email,
        "iat": now,
        "exp": now + timedelta(hours=JWT_EXPIRES_HOURS),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALGORITHM])


def auth_required(view_func):
    @wraps(view_func)
    def wrapped(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")

        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid authorization header"}), 401

        token = auth_header.split(" ", 1)[1].strip()

        try:
            payload = decode_token(token)
            user_id = payload.get("user_id")

            if not user_id:
                return jsonify({"error": "Invalid token payload"}), 401

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        with get_session() as session:
            user = session.get(User, user_id)

            if not user:
                return jsonify({"error": "User not found"}), 401

            g.current_user = {
                "user_id": user.user_id,
                "email": user.email,
                "is_verified": user.is_verified,
            }

        return view_func(*args, **kwargs)

    return wrapped