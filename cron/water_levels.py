import sys
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

# URL Config
URL = 'https://vmc.gov.in/WaterLevel.aspx'
page = requests.get(URL)

# BeautifulSoup Scraper
soup = BeautifulSoup(page.content, 'html.parser')

# Fetch Data
try:
    vishwamitri_date = soup.find(id = 'grvVishwamitri_lblwldate_0').text
    vishwamitri_time = soup.find(id = 'grvVishwamitri_lblwltime_0').text
    vishwamitri_level = soup.find(id = 'grvVishwamitri_lblrlevel_0').text

    ajwa_date = soup.find(id = 'grdAjwa_lblwldate_0').text
    ajwa_time = soup.find(id = 'grdAjwa_lblwltime_0').text
    ajwa_level = soup.find(id = 'grdAjwa_lblrlevel_0').text
except(AttributeError):
    print("Data fetch error!!!")
    sys.exit(1)

# Model Data
vishwamitri_data = {
    'server_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
    'date': vishwamitri_date,
    'time': vishwamitri_time,
    'level': float(vishwamitri_level)
}
ajwa_data = {
    'server_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
    'date': ajwa_date,
    'time': ajwa_time,
    'level': float(ajwa_level)
}

# MongoDB Atlas Connection
client = MongoClient("CONNECTION URI")
db = client.flood_monitor_project

# Write and update db operation result
vishwamitri_level_insert_result = db.vishwamitri_levels.insert_one(vishwamitri_data)
ajwa_level_insert_result = db.ajwa_levels.insert_one(ajwa_data)
print("Successfully inserted " + str(vishwamitri_level_insert_result.inserted_id) + " into Vishwamitri and " + str(ajwa_level_insert_result.inserted_id) + " into Ajwa collection")