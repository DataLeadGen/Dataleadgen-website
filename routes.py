from flask import render_template, request, redirect, url_for, flash
from app import app
from forms import ContactForm
from models import LeadSample

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

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Render the contact page and handle form submission"""
    form = ContactForm()
    
    if request.method == 'POST' and form.validate_on_submit():
        # In a real application, you would save the form data to a database
        # and potentially send an email notification
        flash('Thank you for your message! We will get back to you soon.', 'success')
        return redirect(url_for('contact'))
    
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
