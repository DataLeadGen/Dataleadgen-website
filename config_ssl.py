"""
Alternative configuration file using SSL (port 465) instead of TLS (port 587)
Copy this file to config.py if the SSL method works better for your Gmail account
"""

import os

class Config:
    """Base configuration class"""
    
    # Basic Flask config
    DEBUG = os.environ.get('FLASK_DEBUG', True)
    
    # Forms and security
    WTF_CSRF_ENABLED = True
    SECRET_KEY = os.environ.get("SESSION_SECRET", "dev-secret-key")
    
    # Company Info
    COMPANY_NAME = "Data Lead Generation"
    COMPANY_FOUNDED = "2019"
    COMPANY_FOUNDER = "Zakir Hussain"
    COMPANY_PHONE = "+91 7869874458"
    COMPANY_EMAIL = "zakir@dataleadgen.com"
    COMPANY_ADDRESS = "Sardar Patel colony, ward Number 18, Burhanpur, Madhya Pradesh 450331, IN"
    COMPANY_WEBSITE = "https://dataleadgen.com"
    
    # Flask-Mail configuration using SSL instead of TLS
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465  # SSL port
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True  # Use SSL instead of TLS
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME', 'zakirdataleadgen@gmail.com')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', 'Covid19567')  # App password should be set in environment variable
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER', 'zakirdataleadgen@gmail.com')
    MAIL_MAX_EMAILS = 5
    MAIL_ASCII_ATTACHMENTS = False
    MAIL_DEBUG = True  # Enable debug mode for Flask-Mail
    MAIL_SUPPRESS_SEND = False  # Make sure emails are actually sent
    MAIL_TIMEOUT = 30  # Increase timeout to 30 seconds