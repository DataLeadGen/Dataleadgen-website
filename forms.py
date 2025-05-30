from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, SelectField, SubmitField, SelectMultipleField, IntegerField, RadioField
from wtforms.validators import DataRequired, Email, Length, Optional

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

class CustomizeLeadsForm(FlaskForm):
    """Form for users to customize their lead generation criteria"""
    
    # Contact information (required)
    name = StringField('Full Name', validators=[
        DataRequired(message="Please enter your name"),
        Length(min=2, max=100, message="Name must be between 2 and 100 characters")
    ])
    
    email = StringField('Email Address', validators=[
        DataRequired(message="Please enter your email address"),
        Email(message="Please enter a valid email address")
    ])
    
    # Country/Location field (can be multiple)
    countries = StringField('Country / Location', validators=[
        Optional()
    ], description="Enter countries or regions separated by commas (e.g., USA, UK, Europe)")
    
    # Industry/Company Type field
    industry = StringField('Industry / Company Type', validators=[
        Optional()
    ], description="Enter industries or company types (e.g., Tech, SaaS, Marketing)")
    
    # Employee Count Range - using dropdown and custom input
    employee_count_range = SelectField('Employee Count Range', choices=[
        ('', 'Select a range'),
        ('1-10', '1-10 employees'),
        ('11-50', '11-50 employees'),
        ('51-200', '51-200 employees'),
        ('201-500', '201-500 employees'),
        ('501-1000', '501-1000 employees'),
        ('1001-5000', '1001-5000 employees'),
        ('5001-10000', '5001-10000 employees'),
        ('10001+', '10001+ employees'),
        ('custom', 'Custom range')
    ], validators=[Optional()])
    custom_employee_count = StringField('Custom Employee Count Range', validators=[Optional()],
                                      description="Enter a custom employee count range (e.g., 100-300)")
    
    # Target Title field (can be multiple)
    target_titles = StringField('Target Titles', validators=[
        Optional()
    ], description="Enter job titles separated by commas (e.g., CEO, Founder, VP of Sales)")
    
    # Leads per company
    leads_per_company = IntegerField('How many leads you want per company', validators=[Optional()])
    
    # Additional Notes
    notes = TextAreaField('Additional Requirements', validators=[Optional()],
                         description="Describe any specific requirements, custom filters, or exclusions (e.g., skip freelancers, exclude agencies, target SaaS only, etc.)")
    
    # Sample file upload
    sample_file = FileField('Attach Sample File', validators=[
        Optional(),
        FileAllowed(['xlsx', 'xls', 'csv', 'pdf', 'jpg', 'jpeg', 'png', 'gif'], 'Only Excel, CSV, PDF, and image files are allowed')
    ], description="Upload a sample file to help us understand your requirements better")
    
    submit = SubmitField('Get My Customized Leads')
