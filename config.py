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
