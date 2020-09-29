# -*- coding: utf-8 -*-
"""
Created on Mon Sep 28 16:12:01 2020

@author: Souvik.Majumder
"""

import os
from flask import request
from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from datetime import datetime
import pandas as pd
import numpy as np
import pickle
import random
import json
import requests

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cf_port = os.getenv("PORT")

def init():
    global model
    file_name = "model_file.p"
    with open(file_name, 'rb') as pickled:
        data = pickle.load(pickled)
        model = data['model']
    
    global sample_pred
    sample_pred = pd.read_csv('sample_x_pred.csv')
    

def predict_salary(memory):
    
    company_age_category = memory.get('company-age-category').get('raw')
    
    if (company_age_category == 'Old'):
        company_age = int(random.randint(20,400))
    elif (company_age_category == 'Medium'):
        company_age = int(random.randint(6,19))
    else:
        company_age = int(random.randint(0,5))
    
    rating = memory.get('rating').get('raw')
    revenue = float('3.5')
    employee_size = memory.get('employee-size').get('raw')
    industry = memory.get('industry').get('raw')
    location = memory.get('location').get('raw') + ', MA'
    job_title = memory.get('job-title').get('raw')
    sector = memory.get('sector').get('raw')
    type_of_ownership = 'Company - Private'

    #year_found = int('2009')
    #year_current = datetime.today().year
    
    #company_age = year_current - year_found
    #rating = float('3.7')
    #revenue = float('3.5')
    #employee_size = int('15000')
    #industry = 'Food & Beverage Manufacturing'
    #job_title = 'HR Generalist'
    #location = 'Boston, MA'
    #sector = 'Manufacturing'
    #type_of_ownership = 'Company - Private'
    
    X_pred = sample_pred.iloc[0:1,1:]
    
    X_pred['Company Age'] = company_age
    X_pred['Rating'] = rating
    X_pred['Average Revenue (in million USD)'] = revenue
    X_pred['Employee Size'] = employee_size
    
    X_pred['Industry_'+industry] = 1
    X_pred['Job Title_'+job_title] = 1
    X_pred['Location_'+location] = 1
    X_pred['Sector_'+sector] = 1
    X_pred['Type of ownership_'+type_of_ownership] = 1
    
    predicted_salary = round(model.predict(X_pred)[0],1)
    
    response_text = 'Your estimated salary would be around $' + str(predicted_salary) + 'K USD'
    
    return response_text


@app.route('/PredictSalary', methods=['POST'])
def main():
    if request.method == 'POST':
        userrequest = request.get_json()
        memory = userrequest.get('conversation').get('memory')
        
        response_text = predict_salary(memory)
        
        return ResponseOutput(response_text,'')


@app.route('/botQueries', methods=['POST'])
@cross_origin()
def botQueries():
    if request.method == 'POST':
        userrequest = request.get_json()
        botresponse = HandleBotQueries(userrequest)
        
        return botresponse
    

def HandleBotQueries(userrequest):
    # Call CAI
    caiurl = "https://api.cai.tools.sap/build/v1/dialog"
    caipayload = json.dumps(userrequest)
    headers = {
    'Authorization': 'Token 3fc21bb044651dee11b7505963cc62a0',
    'Content-Type': 'application/json'
    }

    response = requests.post(url = caiurl, headers=headers, data = caipayload)
    
    responsedata = (response.text)
    
    return responsedata

def ResponseOutput(response_text,memory):
    if (memory != ''):
        response_output = {"replies":[{"type": "text", "content": response_text}],"conversation":{"memory":memory}}

    else: 
        response_output = {
            "replies":[{
                "type": "text",
                "content": response_text
            }]
        }

    return jsonify(response_output)

if __name__ == '__main__':
    init()
    if cf_port is None:
        app.run(host='0.0.0.0', port=5000, debug=True)
    else:
        app.run(host='0.0.0.0', port=int(cf_port), debug=True)
