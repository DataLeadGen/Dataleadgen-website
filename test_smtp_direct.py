"""
Direct SMTP test script to verify Gmail connectivity without Flask-Mail
This script uses Python's built-in smtplib to test SMTP connection to Gmail
"""

import os
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email configuration
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
USERNAME = os.environ.get('MAIL_USERNAME', 'zakirdataleadgen@gmail.com')
PASSWORD = os.environ.get('MAIL_PASSWORD', 'Covid19567')
SENDER = USERNAME
RECIPIENT = USERNAME  # Send to yourself for testing

def test_smtp_connection():
    """Test direct SMTP connection to Gmail"""
    print(f"Testing SMTP connection to {SMTP_SERVER}:{SMTP_PORT}...")
    print(f"Using account: {USERNAME}")
    
    try:
        # Create a secure SSL context
        context = ssl.create_default_context()
        
        # Connect to the SMTP server
        print("Connecting to SMTP server...")
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.ehlo()  # Can be omitted
        
        # Start TLS encryption
        print("Starting TLS encryption...")
        server.starttls(context=context)
        server.ehlo()  # Can be omitted
        
        # Login to the SMTP server
        print("Logging in...")
        server.login(USERNAME, PASSWORD)
        
        # Create a test message
        print("Creating test message...")
        message = MIMEMultipart("alternative")
        message["Subject"] = "Direct SMTP Test"
        message["From"] = SENDER
        message["To"] = RECIPIENT
        
        # Create plain text and HTML versions of the message
        text = "This is a test email sent directly via SMTP to verify connectivity."
        html = """
        <html>
          <body>
            <h2>SMTP Test Successful</h2>
            <p>This is a test email sent directly via SMTP to verify connectivity.</p>
            <p>If you're seeing this, your SMTP connection to Gmail is working correctly!</p>
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
        
        # Close the connection
        print("Closing connection...")
        server.quit()
        
        print("✅ SMTP test completed successfully!")
        print(f"A test email has been sent to {RECIPIENT}")
        return True
        
    except Exception as e:
        print(f"❌ SMTP test failed: {str(e)}")
        return False

if __name__ == "__main__":
    test_smtp_connection()