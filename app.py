import os
import logging
from flask import Flask
from flask_wtf.csrf import CSRFProtect
from mail import mail, init_mail

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.config.from_object('config.Config')
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Set maximum file upload size to 16MB
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# Initialize CSRF protection
csrf = CSRFProtect(app)

# Initialize Flask-Mail
init_mail(app)
