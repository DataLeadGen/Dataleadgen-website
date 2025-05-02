# This file is currently empty as we're not using a database
# It's included for future expansion
import json
import os

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
    
    @staticmethod
    def get_lead_categories():
        """Return lead categories based on the Google Sheet data"""
        try:
            # Try to load categories from the JSON file
            with open('lead_categories.json', 'r') as f:
                data = json.load(f)
                return data.get('categories', [])
        except (FileNotFoundError, json.JSONDecodeError) as e:
            # Default categories if file not found or invalid
            return [
                {
                    "name": "Influencers",
                    "subcategories": ["Fitness Influencers", "Business Influencers"],
                    "icon": "fa-users",
                    "description": "Connect with influential content creators and social media personalities."
                },
                {
                    "name": "Real Estate",
                    "subcategories": ["Real Estate Agents", "Real Estate Brokers"],
                    "icon": "fa-home",
                    "description": "Premium leads for real estate professionals and investors."
                },
                {
                    "name": "B2B Services",
                    "subcategories": ["Technology", "Marketing"],
                    "icon": "fa-briefcase",
                    "description": "Quality B2B leads for expanding corporate networks."
                }
            ]
