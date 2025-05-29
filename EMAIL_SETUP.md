# Email Setup for Data Lead Generation

This document explains how to set up and use the email functionality for the contact and customize leads forms.

## Prerequisites

1. A Gmail account (zakirdataleadgen@gmail.com)
2. An app password for your Gmail account (not your regular password)

## Setting Up Gmail App Password

Google requires using an App Password instead of your regular password for less secure apps or when 2FA is enabled. Here's how to create one:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Select "Security" from the left menu
3. Under "Signing in to Google," select "2-Step Verification" (you may need to enable this first)
4. At the bottom of the page, select "App passwords"
5. Select "Mail" as the app and "Other (Custom name)" as the device
6. Enter "DataLeadPro" as the name
7. Click "Generate"
8. Google will display a 16-character password - copy this password
9. Use this password in your environment variables (see below)

## Setting Environment Variables

### Option 1: Using the Secure Script (Recommended)

1. Open PowerShell
2. Navigate to the project directory
3. Run the secure script:
   ```
   .\set_env_secure.ps1
   ```
4. When prompted, enter your Gmail app password
5. Start the Flask application

### Option 2: Using the Basic Script

1. Open the `set_env.ps1` file
2. Replace the placeholder password with your actual Gmail app password
3. Save the file
4. Open PowerShell
5. Navigate to the project directory
6. Run the script:
   ```
   .\set_env.ps1
   ```
7. Start the Flask application

### Option 3: Setting Variables Manually

In PowerShell:
```powershell
$env:MAIL_USERNAME = "zakirdataleadgen@gmail.com"
$env:MAIL_PASSWORD = "Covid19567"
$env:MAIL_DEFAULT_SENDER = "zakirdataleadgen@gmail.com"
```

In Command Prompt:
```cmd
set MAIL_USERNAME=zakirdataleadgen@gmail.com
set MAIL_PASSWORD=your-app-password-here
set MAIL_DEFAULT_SENDER=zakirdataleadgen@gmail.com
```

## Security Considerations

1. **NEVER commit your app password to version control**
2. Use environment variables instead of hardcoding credentials
3. Consider using a more robust solution like python-dotenv for production
4. Regularly rotate your app passwords

## Troubleshooting

If emails are not being sent:

1. Check that you're using an app password, not your regular Gmail password
2. Verify that "Less secure app access" is enabled in your Google account (if not using 2FA)
3. Check the application logs for specific error messages
4. Ensure your Gmail account doesn't have any restrictions or blocks on it
5. Run the test scripts to verify your email configuration:
   ```
   # Test Flask-Mail configuration
   python test_email.py
   
   # Test direct SMTP connection (bypasses Flask-Mail)
   python test_smtp_direct.py
   ```

### Additional Troubleshooting Steps

If the test scripts fail, try these additional steps:

1. **Check Gmail Account Settings**:
   - Go to your Gmail account
   - Navigate to Security settings
   - Make sure "2-Step Verification" is enabled
   - Generate a new App Password specifically for this application

2. **Try Alternative Port**:
   - If port 587 (TLS) doesn't work, try port 465 (SSL)
   - Test SSL connectivity:
     ```
     python test_smtp_ssl.py
     ```
   - If SSL works better, replace config.py with config_ssl.py:
     ```
     copy config_ssl.py config.py
     ```
   - Or manually update the config.py file:
     ```python
     MAIL_PORT = 465
     MAIL_USE_TLS = False
     MAIL_USE_SSL = True
     ```

3. **Check Network/Firewall Issues**:
   - Some networks block outgoing SMTP traffic
   - Try running the application from a different network
   - Check with your network administrator if SMTP ports are blocked

4. **Verify App Password Format**:
   - App passwords are 16 characters without spaces
   - Make sure you're copying the entire password correctly

### Common Gmail SMTP Issues and Solutions

1. **Authentication Error**:
   - Make sure you're using an app password if you have 2FA enabled
   - Check that your username and password are correct
   - Try generating a new app password

2. **Connection Timeout**:
   - Check your internet connection
   - Verify that port 587 is not blocked by your firewall or network

3. **SSL/TLS Issues**:
   - Make sure you're using the correct port (587 for TLS, 465 for SSL)
   - Ensure MAIL_USE_TLS is set to True and MAIL_USE_SSL is set to False for port 587

4. **Gmail Security Blocks**:
   - Check your Gmail account for security alerts
   - Visit https://accounts.google.com/DisplayUnlockCaptcha to allow access
   - Check if you need to enable "Less secure app access" in your Google account settings

5. **Rate Limiting**:
   - Gmail limits the number of emails you can send per day
   - If you're sending too many emails, try using a different email service or a dedicated email service provider