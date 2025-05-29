from flask_mail import Mail

# Initialize mail instance to be attached to app later
mail = Mail()

def init_mail(app):
    """Initialize mail with the app"""
    mail.init_app(app)
    return mail