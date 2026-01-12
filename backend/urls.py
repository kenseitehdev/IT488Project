from flask import Blueprint
import views

main = Blueprint('main', __name__)

# Define URL patterns
main.add_url_rule('/', view_func=views.home)
