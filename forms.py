from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, Length

class ContactForm(FlaskForm):
    """Contact form for users to reach out"""
    name = StringField('Full Name', validators=[
        DataRequired(message="Please enter your name"),
        Length(min=2, max=100, message="Name must be between 2 and 100 characters")
    ])
    
    email = StringField('Email Address', validators=[
        DataRequired(message="Please enter your email address"),
        Email(message="Please enter a valid email address")
    ])
    
    phone = StringField('Phone Number', validators=[
        Length(min=0, max=20, message="Phone number must be less than 20 characters")
    ])
    
    company = StringField('Company Name', validators=[
        DataRequired(message="Please enter your company name"),
        Length(min=2, max=100, message="Company name must be between 2 and 100 characters")
    ])
    
    service_interest = SelectField('Service of Interest', choices=[
        ('data_mining', 'Data Mining'),
        ('email_list', 'Email List Building & Cleaning'),
        ('contact_list', 'Contact List Building'),
        ('data_cleansing', 'Data Cleansing & Cleaning'),
        ('data_scraping', 'Data Scraping & Extraction'),
        ('web_scraping', 'Web & Google Maps Scraping'),
        ('crm_upgrade', 'Upgrade CRM Data & Cleaning'),
        ('email_verification', 'Bulk Email Verification'),
        ('other', 'Other')
    ])
    
    message = TextAreaField('Message', validators=[
        DataRequired(message="Please enter your message"),
        Length(min=10, max=1000, message="Message must be between 10 and 1000 characters")
    ])
    
    submit = SubmitField('Send Message')
