# This file is currently empty as we're not using a database
# It's included for future expansion

class LeadSample:
    """Class to represent sample lead data for display purposes"""
    
    @staticmethod
    def get_industry_distribution():
        """Return sample industry distribution data for visualization"""
        return {
            'labels': [
                'Technology', 'Healthcare', 'Manufacturing', 
                'Finance', 'Retail', 'Education', 'Other'
            ],
            'data': [28, 19, 16, 14, 12, 7, 4]
        }
    
    @staticmethod
    def get_lead_quality_metrics():
        """Return sample lead quality metrics for visualization"""
        return {
            'labels': ['Verified Email', 'Valid Phone', 'Complete Profile', 'Decision Maker'],
            'data': [98, 94, 92, 87]
        }
    
    @staticmethod
    def get_monthly_leads():
        """Return sample monthly lead generation data"""
        return {
            'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            'data': [450, 520, 610, 590, 680, 720]
        }

    @staticmethod
    def get_company_size_distribution():
        """Return sample company size distribution data"""
        return {
            'labels': ['1-50', '51-200', '201-500', '501-1000', '1000+'],
            'data': [15, 32, 28, 18, 7]
        }
