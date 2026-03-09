from flask import Blueprint
import views

main = Blueprint("main", __name__)

main.add_url_rule("/", view_func=views.home, methods=["GET"])

main.add_url_rule("/api/health", view_func=views.health, methods=["GET"])
main.add_url_rule("/api/items", view_func=views.list_items, methods=["GET"])
main.add_url_rule("/api/items", view_func=views.create_item, methods=["POST"])
main.add_url_rule("/api/items/<int:item_id>", view_func=views.get_item, methods=["GET"])
main.add_url_rule("/api/items/<int:item_id>", view_func=views.update_item, methods=["PUT"])
main.add_url_rule("/api/items/<int:item_id>", view_func=views.delete_item, methods=["DELETE"])
main.add_url_rule("/api/users", view_func=views.list_users, methods=["GET"])
main.add_url_rule("/api/users", view_func=views.create_user, methods=["POST"])
main.add_url_rule("/api/users/<int:user_id>", view_func=views.get_user, methods=["GET"])
main.add_url_rule("/api/auth/register", view_func=views.register, methods=["POST"])
main.add_url_rule("/api/auth/login", view_func=views.login, methods=["POST"])
main.add_url_rule("/api/auth/logout", view_func=views.logout, methods=["POST"])
main.add_url_rule("/api/auth/me", view_func=views.me, methods=["GET"])