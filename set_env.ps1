# PowerShell script to set environment variables for Flask app
# Run this script before starting the Flask application

# Email configuration
$env:MAIL_USERNAME = "zakirdataleadgen@gmail.com"
$env:MAIL_PASSWORD = "Covid19567"  # This should be your Gmail app password
$env:MAIL_DEFAULT_SENDER = "zakirdataleadgen@gmail.com"

# Flask configuration
$env:FLASK_APP = "main.py"
$env:FLASK_ENV = "development"
$env:FLASK_DEBUG = "1"

Write-Host "Environment variables set successfully!"
Write-Host "IMPORTANT: For security reasons, these environment variables will only be available in the current PowerShell session."
Write-Host "You need to run this script each time you open a new terminal window before starting the Flask app."