"""
Test script to verify Gmail connectivity using SSL (port 465)
This script uses Python's built-in smtplib to test SMTP connection to Gmail using SSL
"""

import os
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email configuration
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 465  # SSL port
USERNAME = os.environ.get('MAIL_USERNAME', 'zakirdataleadgen@gmail.com')
PASSWORD = os.environ.get('MAIL_PASSWORD', 'Covid19567')
SENDER = USERNAME
RECIPIENT = USERNAME  # Send to yourself for testing

def test_smtp_ssl_connection():
    """Test direct SMTP connection to Gmail using SSL"""
    print(f"Testing SMTP SSL connection to {SMTP_SERVER}:{SMTP_PORT}...")
    print(f"Using account: {USERNAME}")
    
    try:
        # Create a secure SSL context
        context = ssl.create_default_context()
        
        # Connect directly with SSL
        print("Connecting to SMTP server with SSL...")
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            # Login to the SMTP server
            print("Logging in...")
            server.login(USERNAME, PASSWORD)
            
            # Create a test message
            print("Creating test message...")
            message = MIMEMultipart("alternative")
            message["Subject"] = "SMTP SSL Test"
            message["From"] = SENDER
            message["To"] = RECIPIENT
            
            # Create plain text and HTML versions of the message
            text = "This is a test email sent via SMTP SSL to verify connectivity."
            html = """
            <html>
              <body>
                <h2>SMTP SSL Test Successful</h2>
                <p>This is a test email sent via SMTP SSL to verify connectivity.</p>
                <p>If you're seeing this, your SMTP SSL connection to Gmail is working correctly!</p>
              </body>
            </html>
            """
            
            # Attach parts to the message
            part1 = MIMEText(text, "plain")
            part2 = MIMEText(html, "html")
            message.attach(part1)
            message.attach(part2)
            
            # Send the message
            print("Sending test email...")
            server.sendmail(SENDER, RECIPIENT, message.as_string())
        
        print("✅ SMTP SSL test completed successfully!")
        print(f"A test email has been sent to {RECIPIENT}")
        return True
        
    except Exception as e:
        print(f"❌ SMTP SSL test failed: {str(e)}")
        return False

if __name__ == "__main__":
    test_smtp_ssl_connection() 