from __future__ import annotations

from typing import Any, Dict

from flask import jsonify, request, g
from sqlalchemy import select
from werkzeug.security import generate_password_hash, check_password_hash

from db import get_session
from models import *
from auth import generate_token, auth_required


def home():
    return "HomeStack API is running"


def health():
    return jsonify({"status": "ok"})


def _parse_item_payload(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Extract and validate item fields from the client."""
    allowed = ["title", "media_type", "creator", "year", "tags", "notes"]
    data = {k: payload.get(k) for k in allowed}

    if not data.get("title") or not str(data["title"]).strip():
        raise ValueError("title is required")
    if not data.get("media_type") or not str(data["media_type"]).strip():
        raise ValueError("media_type is required")

    data["title"] = str(data["title"]).strip()
    data["media_type"] = str(data["media_type"]).strip().lower()

    for k in ["creator", "year", "tags"]:
        if data.get(k) is not None:
            data[k] = str(data[k]).strip()
    if data.get("notes") is not None:
        data["notes"] = str(data["notes"]).strip()

    return data


# -----------------------------
# Users
# -----------------------------
def create_user():
    """POST /api/users - create a new user."""
    payload = request.get_json(silent=True) or {}

    email = str(payload.get("email", "")).strip().lower()
    password = str(payload.get("password", "")).strip()

    if not email:
        return jsonify({"error": "email is required"}), 400
    if not password:
        return jsonify({"error": "password is required"}), 400
    if len(password) < 6:
        return jsonify({"error": "password must be at least 6 characters"}), 400

    with get_session() as session:
        existing_user = session.execute(
            select(User).where(User.email == email)
        ).scalar_one_or_none()

        if existing_user:
            return jsonify({"error": "A user with that email already exists"}), 409

        user = User(
            email=email,
            password_hash=generate_password_hash(password),
            is_verified=True,
        )

        session.add(user)
        session.flush()
        return jsonify(user.to_dict()), 201


def get_user(user_id: int):
    """GET /api/users/<id> - fetch one user."""
    with get_session() as session:
        user = session.get(User, user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify(user.to_dict())


def list_users():
    """GET /api/users - return all users."""
    with get_session() as session:
        users = session.execute(select(User)).scalars().all()
        return jsonify([u.to_dict() for u in users])


# -----------------------------
# Items
# -----------------------------
def list_items():
    """GET /api/items - return all items."""
    with get_session() as session:
        items = session.execute(
            select(Item).order_by(Item.created_at.desc())
        ).scalars().all()

        result = []
        for item in items:
            inv = item.inventory
            item_type = inv.item_type if inv else None
            creator_obj = inv.creator if inv else None

            creator_name = ""
            if creator_obj:
                creator_name = f"{creator_obj.first_name} {creator_obj.last_name}".strip()

            result.append({
                "id": item.id,
                "title": inv.title if inv else "",
                "media_type": item_type.name if item_type else "",
                "creator": creator_name,
                "year": inv.year if inv else None,
                "notes": item.notes or "",
                "tags": ""
            })

        return jsonify(result), 200

@auth_required
def create_item():
    """POST /api/items - create a new item."""
    payload = request.get_json(silent=True) or {}

    try:
        data = _parse_item_payload(payload)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    # auth_required should have set this
    current_user = getattr(g, "current_user", None)
    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    title = data.get("title", "").strip()
    media_type_name = data.get("media_type", "").strip().lower()
    creator_name = (data.get("creator") or "").strip()
    year_raw = (data.get("year") or "").strip()
    notes = (data.get("notes") or "").strip() or None

    year = int(year_raw) if year_raw.isdigit() else None

    with get_session() as session:
        # 1. ItemType
        item_type = session.execute(
            select(ItemType).where(ItemType.name == media_type_name)
        ).scalar_one_or_none()

        if not item_type:
            item_type = ItemType(name=media_type_name)
            session.add(item_type)
            session.flush()

        # 2. Creator
        if creator_name:
            if " " in creator_name:
                first_name, last_name = creator_name.split(" ", 1)
            else:
                first_name, last_name = creator_name, ""

            creator_obj = session.execute(
                select(Creator).where(
                    Creator.first_name == first_name,
                    Creator.last_name == last_name
                )
            ).scalar_one_or_none()

            if not creator_obj:
                creator_obj = Creator(first_name=first_name, last_name=last_name)
                session.add(creator_obj)
                session.flush()
        else:
            creator_obj = Creator(first_name="Unknown", last_name="")
            session.add(creator_obj)
            session.flush()

        # 3. Inventory
        inventory = Inventory(
            item_type_id=item_type.item_type_id,
            creator_id=creator_obj.creator_id,
            title=title,
            year=year,
        )
        session.add(inventory)
        session.flush()

        # 4. Item
        item = Item(
            creator=current_user["user_id"],
            inventory_id=inventory.inventory_id,
            notes=notes,
        )
        session.add(item)
        session.flush()

        return jsonify({
            "id": item.id,
            "title": inventory.title,
            "media_type": item_type.name,
            "creator": f"{creator_obj.first_name} {creator_obj.last_name}".strip(),
            "year": inventory.year,
            "notes": item.notes or "",
        }), 201

def get_item(item_id: int):
    """GET /api/items/<id> - fetch one item."""
    with get_session() as session:
        item = session.get(Item, item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404
        return jsonify(item.to_dict())


def update_item(item_id: int):
    """PUT /api/items/<id> - update an existing item."""
    payload = request.get_json(silent=True) or {}

    allowed = ["title", "media_type", "creator", "year", "tags", "notes"]
    updates = {k: payload.get(k) for k in allowed if k in payload}

    if "title" in updates and (updates["title"] is None or not str(updates["title"]).strip()):
        return jsonify({"error": "title cannot be empty"}), 400
    if "media_type" in updates and (
        updates["media_type"] is None or not str(updates["media_type"]).strip()
    ):
        return jsonify({"error": "media_type cannot be empty"}), 400

    if "title" in updates:
        updates["title"] = str(updates["title"]).strip()
    if "media_type" in updates:
        updates["media_type"] = str(updates["media_type"]).strip().lower()
    for k in ["creator", "year", "tags", "notes"]:
        if k in updates and updates[k] is not None:
            updates[k] = str(updates[k]).strip()

    with get_session() as session:
        item = session.get(Item, item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404

        for k, v in updates.items():
            setattr(item, k, v)

        session.add(item)
        session.flush()
        return jsonify(item.to_dict())


def delete_item(item_id: int):
    """DELETE /api/items/<id> - delete an item."""
    with get_session() as session:
        item = session.get(Item, item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404
        session.delete(item)
        return jsonify({"deleted": True, "id": item_id})


# -----------------------------
# Auth
# -----------------------------
def register():
    payload = request.get_json(silent=True) or {}

    email = str(payload.get("email", "")).strip().lower()
    password = str(payload.get("password", "")).strip()

    if not email:
        return jsonify({"error": "email is required"}), 400
    if not password:
        return jsonify({"error": "password is required"}), 400
    if len(password) < 6:
        return jsonify({"error": "password must be at least 6 characters"}), 400

    with get_session() as session:
        existing_user = session.execute(
            select(User).where(User.email == email)
        ).scalar_one_or_none()

        if existing_user:
            return jsonify({"error": "A user with that email already exists"}), 409

        user = User(
            email=email,
            password_hash=generate_password_hash(password),
            is_verified=True
        )

        session.add(user)
        session.flush()

        token = generate_token(user)

        return jsonify({
            "message": "User registered successfully",
            "token": token
        }), 201


def login():
    payload = request.get_json(silent=True) or {}

    email = str(payload.get("email", "")).strip().lower()
    password = str(payload.get("password", "")).strip()

    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400

    with get_session() as session:
        user = session.execute(
            select(User).where(User.email == email)
        ).scalar_one_or_none()

        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"error": "Invalid email or password"}), 401

        token = generate_token(user)

        return jsonify({
    "message": "Login successful",
    "token": token,
    "user": {
        "user_id": user.user_id,
        "email": user.email,
        "is_verified": user.is_verified,
    }
}), 200

def logout():
    """
    Minimal demo logout.
    For JWT demos, logout is usually handled client-side by deleting the token.
    """
    return jsonify({"message": "Logout successful"}), 200


@auth_required
def me():
    return jsonify({"user": g.current_user})