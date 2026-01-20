from __future__ import annotations

from typing import Any, Dict

from flask import jsonify, request
from sqlalchemy import select

from db import get_session
from models import Item


def home():
    return "HomeStack API is running"


def health():
    return jsonify({"status": "ok"})


def _parse_item_payload(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Extract and validate the fields we allow from the client."""
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


def list_items():
    """GET /api/items - return all items."""
    with get_session() as session:
        items = session.execute(select(Item).order_by(Item.created_at.desc())).scalars().all()
        return jsonify([i.to_dict() for i in items])


def create_item():
    """POST /api/items - create a new item."""
    payload = request.get_json(silent=True) or {}
    try:
        data = _parse_item_payload(payload)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    item = Item(**data)
    with get_session() as session:
        session.add(item)
        session.flush()
        return jsonify(item.to_dict()), 201


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
