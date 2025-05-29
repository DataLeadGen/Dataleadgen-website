# Deployment Guide for Data Lead Generation Website

This guide provides instructions for deploying the Data Lead Generation website to a production environment.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- A web server (e.g., Nginx, Apache)
- A WSGI server (e.g., Gunicorn, uWSGI)
- SSL certificate for HTTPS (recommended)

## Deployment Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd DataLeadPro
```

### 2. Set Up a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the project root with the following variables:

```
FLASK_APP=main.py
FLASK_ENV=production
MAIL_USERNAME=zakirdataleadgen@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=zakirdataleadgen@gmail.com
SESSION_SECRET=your-secure-session-key
```

Replace `your-app-password` with your actual Gmail app password and `your-secure-session-key` with a strong random string.

### 4. Test the Application

```bash
python test_email_setup.py
```

Make sure the email test is successful before proceeding.

### 5. Set Up Gunicorn

Install Gunicorn if not already installed:

```bash
pip install gunicorn
```

Create a `wsgi.py` file:

```python
from main import app

if __name__ == "__main__":
    app.run()
```

Test Gunicorn:

```bash
gunicorn --bind 0.0.0.0:8000 wsgi:app
```

### 6. Set Up Systemd Service (Linux)

Create a systemd service file `/etc/systemd/system/dataleadpro.service`:

```
[Unit]
Description=Data Lead Generation Website
After=network.target

[Service]
User=your-username
WorkingDirectory=/path/to/DataLeadPro
Environment="PATH=/path/to/DataLeadPro/venv/bin"
EnvironmentFile=/path/to/DataLeadPro/.env
ExecStart=/path/to/DataLeadPro/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:8000 wsgi:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl enable dataleadpro
sudo systemctl start dataleadpro
```

### 7. Set Up Nginx as a Reverse Proxy

Install Nginx:

```bash
sudo apt install nginx  # For Ubuntu/Debian
```

Create an Nginx configuration file `/etc/nginx/sites-available/dataleadpro`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/dataleadpro /etc/nginx/sites-enabled
sudo nginx -t  # Test the configuration
sudo systemctl restart nginx
```

### 8. Set Up SSL with Let's Encrypt

Install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
```

Obtain and configure SSL certificate:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 9. Monitoring and Maintenance

Set up regular backups of your application data.

Consider using monitoring tools like:
- Prometheus for metrics
- Grafana for visualization
- Sentry for error tracking

### Troubleshooting

If you encounter issues:

1. Check the application logs:
   ```bash
   sudo journalctl -u dataleadpro
   ```

2. Check Nginx logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

3. Test the application directly with Gunicorn to isolate issues:
   ```bash
   gunicorn --bind 0.0.0.0:8000 wsgi:app
   ```