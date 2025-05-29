# PowerShell script to set environment variables for Flask app
# Run this script before starting the Flask application

# Email configuration
$env:MAIL_USERNAME = "zakirdataleadgen@gmail.com"
$env:MAIL_DEFAULT_SENDER = "zakirdataleadgen@gmail.com"

# Prompt for password (more secure than hardcoding)
$securePassword = Read-Host "Enter your Gmail app password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
$env:MAIL_PASSWORD = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Flask configuration
$env:FLASK_APP = "main.py"
$env:FLASK_ENV = "development"
$env:FLASK_DEBUG = "1"

Write-Host "Environment variables set successfully!"
Write-Host "IMPORTANT: For security reasons, these environment variables will only be available in the current PowerShell session."
Write-Host "You need to run this script each time you open a new terminal window before starting the Flask app."