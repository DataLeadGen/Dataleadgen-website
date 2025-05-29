"""
Test script to verify email functionality
Run this script to test if your email configuration is working correctly
"""

import os
import logging
from flask import Flask
from flask_mail import Mail, Message

# Configure logging
logging.basicConfig(level=logging.DEBUG, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Create a simple Flask app for testing
app = Flask(__name__)

# Configure Flask-Mail with Gmail settings
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False,
    MAIL_USERNAME=os.environ.get('MAIL_USERNAME', 'zakirdataleadgen@gmail.com'),
    MAIL_PASSWORD=os.environ.get('MAIL_PASSWORD', 'Covid19567'),
    MAIL_DEFAULT_SENDER=os.environ.get('MAIL_DEFAULT_SENDER', 'zakirdataleadgen@gmail.com')
)

# Initialize Flask-Mail
mail = Mail(app)

def test_email():
    """Send a test email to verify configuration"""
    try:
        # Log SMTP settings for debugging
        logger.info(f"SMTP Settings: Server: {app.config['MAIL_SERVER']}, "
                   f"Port: {app.config['MAIL_PORT']}, "
                   f"Username: {app.config['MAIL_USERNAME']}, "
                   f"TLS: {app.config['MAIL_USE_TLS']}, "
                   f"SSL: {app.config['MAIL_USE_SSL']}")
        
        # Create a test message
        recipient = app.config['MAIL_USERNAME']  # Send to yourself for testing
        sender = app.config['MAIL_DEFAULT_SENDER']
        subject = "Test Email from Data Lead Generation"
        body = "This is a test email to verify that the email configuration is working correctly."
        
        # Create message with explicit sender
        msg = Message(
            subject=subject,
            recipients=[recipient],
            body=body,
            sender=sender,
            reply_to=sender
        )
        
        # Send the email
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
    print("Testing email functionality...")
    success = test_email()
    
    if success:
        print("✅ Test email sent successfully! Check your inbox.")
    else:
        print("❌ Failed to send test email. Check the logs for details.")