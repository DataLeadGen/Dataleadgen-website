from flask import render_template, request, redirect, url_for, flash
from app import app
from forms import ContactForm, CustomizeLeadsForm
from models import LeadSample
from flask_mail import Message, Attachment
import logging
from mail import mail
import os
from werkzeug.utils import secure_filename
from datetime import datetime


@app.route('/')
def index():
    """Render the home page"""
    return render_template('index.html')

@app.route('/about')
def about():
    """Render the about page"""
    return render_template('about.html')

@app.route('/services')
def services():
    """Render the services page"""
    services_list = [
        {
            'title': 'Data Mining',
            'description': 'Extract valuable insights from raw data to drive business decisions.',
            'icon': 'fa-solid fa-database'
        },
        {
            'title': 'Email List Building & Cleaning',
            'description': 'Create and maintain high-quality email lists for effective outreach campaigns.',
            'icon': 'fa-solid fa-envelope'
        },
        {
            'title': 'Contact List Building',
            'description': 'Develop comprehensive contact lists of potential clients in your target market.',
            'icon': 'fa-solid fa-address-book'
        },
        {
            'title': 'Data Cleansing & Cleaning',
            'description': 'Clean and validate your existing data to improve accuracy and effectiveness.',
            'icon': 'fa-solid fa-broom'
        },
        {
            'title': 'Data Scraping & Extraction',
            'description': 'Extract specific data points from websites and digital sources.',
            'icon': 'fa-solid fa-code'
        },
        {
            'title': 'Web & Google Maps Scraping',
            'description': 'Gather location-based business information for targeted marketing campaigns.',
            'icon': 'fa-solid fa-map-location-dot'
        },
        {
            'title': 'Upgrade CRM Data & Cleaning',
            'description': 'Enhance your CRM data with additional information and remove duplicates or errors.',
            'icon': 'fa-solid fa-arrows-spin'
        },
        {
            'title': 'Bulk Email Verification',
            'description': 'Verify email addresses to reduce bounce rates and improve deliverability.',
            'icon': 'fa-solid fa-check-double'
        }
    ]
    return render_template('services.html', services=services_list)

def send_email(subject, recipient, template, **kwargs):
    """Helper function to send emails"""
    try:
        # Log email attempt for debugging
        logging.info(f"Attempting to send email: Subject: {subject}, Recipient: {recipient}")
        
        # Create message with explicit sender
        sender = app.config['MAIL_DEFAULT_SENDER']
        msg = Message(
            subject=subject,
            recipients=[recipient],
            sender=sender,
            reply_to=sender
        )
        
        # Set HTML content
        msg.html = render_template(template, **kwargs)
        
        # Log SMTP settings for debugging
        logging.info(f"SMTP Settings: Server: {app.config['MAIL_SERVER']}, "
                    f"Port: {app.config['MAIL_PORT']}, "
                    f"Username: {app.config['MAIL_USERNAME']}, "
                    f"TLS: {app.config['MAIL_USE_TLS']}, "
                    f"SSL: {app.config['MAIL_USE_SSL']}")
        
        # Send email
        mail.send(msg)
            
        logging.info(f"Email sent successfully to {recipient}")
        return True
    except Exception as e:
        logging.error(f"Error sending email: {str(e)}")
        # Print more detailed error information
        import traceback
        logging.error(traceback.format_exc())
        return False

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Render the contact page and handle form submission"""
    form = ContactForm()
    
    if request.method == 'POST' and form.validate_on_submit():
        try:
            # Prepare email content
            subject = f"New Contact Form Submission from {form.name.data}"
            recipient = app.config['MAIL_USERNAME']
            
            # Send email
            email_sent = send_email(
                subject=subject,
                recipient=recipient,
                template='emails/contact_form.html',
                name=form.name.data,
                email=form.email.data,
                phone=form.phone.data,
                company=form.company.data,
                service_interest=dict(form.service_interest.choices).get(form.service_interest.data),
                message=form.message.data
            )
            
            if email_sent:
                flash('Thank you for your message! We will get back to you soon.', 'success')
            else:
                flash('There was an issue sending your message. Please try again later or contact us directly.', 'danger')
                
            return redirect(url_for('contact'))
        except Exception as e:
            logging.error(f"Error in contact form submission: {str(e)}")
            flash('An unexpected error occurred. Please try again later.', 'danger')
    
    return render_template('contact.html', form=form)

@app.route('/sample-leads')
def sample_leads():
    """Render the sample leads page with data visualizations"""
    # Get sample data for charts
    industry_data = LeadSample.get_industry_distribution()
    quality_data = LeadSample.get_lead_quality_metrics()
    monthly_data = LeadSample.get_monthly_leads()
    company_size_data = LeadSample.get_company_size_distribution()
    
    # Get lead categories from the enhanced model
    lead_categories = LeadSample.get_lead_categories()
    
    return render_template(
        'sample_leads.html',
        industry_data=industry_data,
        quality_data=quality_data,
        monthly_data=monthly_data,
        company_size_data=company_size_data,
        lead_categories=lead_categories
    )

@app.errorhandler(404)
def page_not_found(e):
    """Handle 404 errors"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    """Handle 500 errors"""
    return render_template('500.html'), 500

@app.route('/customize-leads', methods=['GET', 'POST'])
def customize_leads():
    """Render the customize leads page and handle form submission"""
    form = CustomizeLeadsForm()
    
    if request.method == 'POST' and form.validate_on_submit():
        try:
            # Form is validated with required name and email fields
            
            # Prepare email content
            subject = f"New Lead Customization Request from {form.name.data}"
            recipient = app.config['MAIL_USERNAME']
            
            # Get employee count range
            employee_count_range = ""
            if form.employee_count_range.data:
                if form.employee_count_range.data == 'custom' and form.custom_employee_count.data:
                    employee_count_range = f"Custom: {form.custom_employee_count.data}"
                elif form.employee_count_range.data != 'custom':
                    # Get the label from the choices
                    for value, label in form.employee_count_range.choices:
                        if value == form.employee_count_range.data:
                            employee_count_range = label
                            break
            
            # Get leads per company
            leads_per_company = f"{form.leads_per_company.data} leads per company" if form.leads_per_company.data is not None else "Not specified"
            
            # Create message with explicit sender
            sender = app.config['MAIL_DEFAULT_SENDER']
            msg = Message(
                subject=subject,
                recipients=[recipient],
                sender=sender,
                reply_to=sender
            )
            
            # Set HTML content
            msg.html = render_template(
                'emails/customize_leads_form.html',
                name=form.name.data,
                email=form.email.data,
                countries=form.countries.data,
                industry=form.industry.data,
                employee_count=employee_count_range,
                target_titles=form.target_titles.data,
                leads_per_company=leads_per_company,
                notes=form.notes.data,
                has_attachment=form.sample_file.data is not None
            )
            
            # Handle file attachment if provided
            if form.sample_file.data:
                try:
                    # Get the file data
                    file_data = form.sample_file.data
                    filename = secure_filename(file_data.filename)
                    
                    # Add timestamp to filename to make it unique
                    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
                    filename_parts = os.path.splitext(filename)
                    unique_filename = f"{filename_parts[0]}_{timestamp}{filename_parts[1]}"
                    
                    # Attach the file to the email
                    attachment = Attachment(
                        filename=unique_filename,
                        content_type=file_data.content_type,
                        data=file_data.read()
                    )
                    msg.attachments.append(attachment)
                    
                    logging.info(f"File attached: {unique_filename}")
                except Exception as e:
                    logging.error(f"Error attaching file: {str(e)}")
            
            # Send email
            try:
                mail.send(msg)
                logging.info(f"Email sent successfully to {recipient}")
                email_sent = True
            except Exception as e:
                logging.error(f"Error sending email: {str(e)}")
                import traceback
                logging.error(traceback.format_exc())
                email_sent = False
            
            if email_sent:
                flash('Thank you for submitting your lead criteria! Our team will review your request and get back to you soon.', 'success')
            else:
                flash('There was an issue sending your request. Please try again later or contact us directly.', 'danger')
                
            return redirect(url_for('customize_leads'))
        except Exception as e:
            logging.error(f"Error in customize leads form submission: {str(e)}")
            import traceback
            logging.error(traceback.format_exc())
            flash('An unexpected error occurred. Please try again later.', 'danger')
    
    return render_template('customize_leads.html', form=form)

@app.context_processor
def inject_config():
    """Inject configuration variables into templates"""
    from datetime import datetime
    return {
        'company_name': app.config['COMPANY_NAME'],
        'company_founded': app.config['COMPANY_FOUNDED'],
        'company_founder': app.config['COMPANY_FOUNDER'],
        'company_phone': app.config['COMPANY_PHONE'],
        'company_email': app.config['COMPANY_EMAIL'],
        'company_address': app.config['COMPANY_ADDRESS'],
        'company_website': app.config['COMPANY_WEBSITE'],
        'now': datetime.now()
    }
