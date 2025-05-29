# Data Lead Generation Website

A Flask-based website for Data Lead Generation services.

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Email Settings

For the contact forms to work, you need to set up email credentials:

#### For Gmail:

1. Create an App Password for your Gmail account:
   - Go to your Google Account > Security
   - Enable 2-Step Verification if not already enabled
   - Go to App passwords
   - Select "Mail" and "Windows Computer" (or appropriate device)
   - Generate and copy the 16-character password

2. Set environment variables:
   - Run the PowerShell script to set environment variables:
   ```
   .\set_email_env.ps1
   ```
   - Edit the script first to add your actual app password

3. Test email configuration:
   ```
   python test_email_setup.py
   ```

### 3. Run the Application

```bash
python main.py
```

The website will be available at http://localhost:5000

## Features

- Home page with service overview
- About page with team information
- Services page with detailed service descriptions
- Contact form for general inquiries
- Customize leads form for specific lead generation requests
- Sample leads page with data visualizations

## File Structure

- `app.py`: Main Flask application setup
- `config.py`: Configuration settings
- `forms.py`: Form definitions using Flask-WTF
- `mail.py`: Email functionality
- `models.py`: Data models for sample lead data
- `routes.py`: Route definitions and view functions
- `main.py`: Application entry point
- `static/`: Static files (CSS, JS, images)
- `templates/`: HTML templates
  - `emails/`: Email templates
  - `includes/`: Reusable template components

## Troubleshooting

If you encounter issues with email sending:

1. Check that environment variables are set correctly
2. Verify that your app password is correct
3. Make sure less secure app access is enabled in your Google account
4. Check the application logs for detailed error messages