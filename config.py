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
    
    # Flask-Mail configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    # Gmail credentials - using environment variables for security
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME', 'Zakirdataleadgen@gmail.com')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', 'nbgv jzwz zogy ndgw')  # App password for Gmail
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER', 'Zakirdataleadgen@gmail.com')
    MAIL_MAX_EMAILS = None  # No limit on the number of emails
    MAIL_ASCII_ATTACHMENTS = False
    MAIL_DEBUG = True  # Enable debug mode for Flask-Mail
    MAIL_SUPPRESS_SEND = False  # Ensure emails are sent
    MAIL_TIMEOUT = 30  # Increase timeout to 30 seconds