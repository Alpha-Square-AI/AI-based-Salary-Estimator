# -*- coding: utf-8 -*-
"""
Created on Thu Apr  2 11:47:44 2020

@author: Ken
"""

import glassdoor_scraper as gs 
import pandas as pd 

#path = "C:/Users/souvik.majumder/Documents/Glassdoor Scraping/ds_salary_proj-master/ds_salary_proj-master/chromedriver"
path = "C:/Users/souvik.majumder/Documents/Glassdoor Scraping/chromedriver_win32_v85/chromedriver"

df = gs.get_jobs('human resource manager',1000, False, path, 15)

df.to_csv('glassdoor_jobs_hrm.csv', index = False)