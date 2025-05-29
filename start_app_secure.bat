@echo off
echo Setting up environment variables for Data Lead Generation website...
set MAIL_USERNAME=zakirdataleadgen@gmail.com
set /p MAIL_PASSWORD=Enter your Gmail App Password: 
set MAIL_DEFAULT_SENDER=zakirdataleadgen@gmail.com

echo Starting the application...
python main.py

pause