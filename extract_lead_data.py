import pandas as pd
import trafilatura
import json

def get_sheet_data(url):
    """Extract data from the Google Sheets URL using trafilatura"""
    downloaded = trafilatura.fetch_url(url)
    text = trafilatura.extract(downloaded)
    
    # Log the raw data for debugging
    print("Raw data extracted from URL:")
    print(text[:500] + "..." if text and len(text) > 500 else text)
    
    return text

def parse_sample_leads(text):
    """Parse the extracted text into structured data"""
    # This is a simplified parsing - in a real application, 
    # you'd need more sophisticated parsing based on the actual structure
    if not text:
        return []
    
    # Simple example parsing - adjust based on actual data structure
    lines = text.split('\n')
    leads = []
    current_lead = {}
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Sample parsing logic - would need to be customized
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip().lower().replace(' ', '_')
            value = value.strip()
            
            if key and value:
                current_lead[key] = value
        
        elif current_lead and len(current_lead) > 2:  # Arbitrary threshold to consider a lead complete
            leads.append(current_lead)
            current_lead = {}
    
    # Add the last lead if not empty
    if current_lead and len(current_lead) > 2:
        leads.append(current_lead)
    
    return leads

def save_to_json(data, filename='sample_leads_data.json'):
    """Save the parsed data to a JSON file"""
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Data saved to {filename}")

def main():
    url = "https://docs.google.com/spreadsheets/u/3/d/e/2PACX-1vSBMso2AjnzhcauVWbp0zVNoRNWBwkV7ZnUrwZG9BFwBqj77q_fIgfV3q3_dyDJahuGhbmbYI2vmvAW/pubhtml?gid=911236402&single=true"
    
    print("Fetching data from Google Sheets...")
    sheet_data = get_sheet_data(url)
    
    if not sheet_data:
        print("Failed to extract data from the URL")
        return
    
    print("Parsing lead data...")
    leads = parse_sample_leads(sheet_data)
    
    print(f"Extracted {len(leads)} leads")
    if leads:
        print("Sample lead data:")
        print(json.dumps(leads[0] if leads else {}, indent=2))
    
    save_to_json(leads)

if __name__ == "__main__":
    main()