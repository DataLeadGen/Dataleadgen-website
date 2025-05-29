"""
Test script to verify email configuration is working correctly.
Run this after setting up your email environment variables.
"""

import os
from flask import Flask
from flask_mail import Mail, Message
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def test_email_config():
    """Test email configuration by sending a test email"""
    
    # Create a minimal Flask app for testing
    app = Flask(__name__)
    
    # Configure mail settings
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')
    
    # Log the configuration (without password)
    logger.info(f"Mail server: {app.config['MAIL_SERVER']}")
    logger.info(f"Mail port: {app.config['MAIL_PORT']}")
    logger.info(f"Mail username: {app.config['MAIL_USERNAME']}")
    logger.info(f"Mail default sender: {app.config['MAIL_DEFAULT_SENDER']}")
    
    # Check if credentials are set
    if not app.config['MAIL_USERNAME'] or not app.config['MAIL_PASSWORD']:
        logger.error("Email credentials not set. Please set MAIL_USERNAME and MAIL_PASSWORD environment variables.")
        return False
    
    # Initialize mail
    mail = Mail(app)
    
    # Create a test message
    recipient = app.config['MAIL_USERNAME']  # Send to yourself for testing
    msg = Message(
        subject="Test Email from Data Lead Generation Website",
        recipients=[recipient],
        body="This is a test email to verify that the email configuration is working correctly.",
        sender=app.config['MAIL_DEFAULT_SENDER']
    )
    
    try:
        with app.app_context():
            mail.send(msg)
        logger.info(f"Test email sent successfully to {recipient}")
        return True
    except Exception as e:
        logger.error(f"Error sending test email: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return False

if __name__ == "__main__":
    success = test_email_config()
    if success:
        print("[SUCCESS] Email test successful! Your email configuration is working correctly.")
    else:
        print("[FAILED] Email test failed. Please check the logs for more information.")