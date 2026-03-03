from flask import Flask, jsonify

import urls
from db import engine
from models import Base


def create_app() -> Flask:
    app = Flask(__name__)

    # Create database tables
    Base.metadata.create_all(bind=engine)

    # Register blueprints
    app.register_blueprint(urls.main)

    # Health check endpoint
    @app.route("/api/health")
    def health():
        return {"status": "ok"}

    # CORS headers
    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        return response

    # Error handlers
    @app.errorhandler(404)
    def not_found(_err):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(_err):
        return jsonify({"error": "Internal server error"}), 500

    return app


    @app.route("/api/health")
    def health():
        return {"status": "ok"}

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="127.0.0.1", port=5000)

