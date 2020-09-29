# -*- coding: utf-8 -*-
"""
Created on Sun Sep 27 22:46:42 2020

@author: Souvik.Majumder
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt 
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.metrics import mean_squared_error
from sklearn.metrics import SCORERS
from sklearn.model_selection import cross_val_score

columns = ['Company Age',
           'Industry',
           'Job Title',
           'Location',
           'Rating',
           'Average Revenue (in million USD)',
           'Average Salary (in K USD)',
           'Sector',
           'Employee Size',
           'Type of ownership']

jobs_df = pd.read_csv('model_dataset.csv',usecols=columns)

jobs_df = pd.get_dummies(jobs_df)

encoded_columns = []
for i,key in enumerate(jobs_df.keys()):
    if i > 5:
        encoded_columns.append(key)

X = jobs_df.drop('Average Salary (in K USD)', axis =1)
y = jobs_df['Average Salary (in K USD)'].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

(X_test.iloc[0:1,:]).to_csv('sample_x_pred.csv')

# Multiple Linear Regression
from sklearn.linear_model import LinearRegression

linear_regressor = LinearRegression()
linear_regressor.fit(X_train, y_train)

y_pred_linear_regressor = linear_regressor.predict(X_test)
mse_linear_regressor = mean_squared_error(y_test, y_pred_linear_regressor)
rmse_linear_regressor = np.sqrt(mse_linear_regressor)

# Lasso Regression
from sklearn.linear_model import Lasso

lasso_regressor = Lasso(alpha = 0.9)
lasso_regressor.fit(X_train, y_train)

alpha = []
error = []

for i in range(1,100):
    alpha.append(i/100)
    lasso_regressor = Lasso(alpha=(i/100))
    error.append(np.mean(cross_val_score(lasso_regressor,X_train,y_train, scoring = 'neg_mean_squared_error', cv= 3)))
    
plt.plot(alpha,error)

y_pred_lasso_regressor = lasso_regressor.predict(X_test)
mse_lasso_regressor = mean_squared_error(y_test, y_pred_lasso_regressor)
rmse_lasso_regressor = np.sqrt(mse_lasso_regressor)

# Random Forest Regressor
from sklearn.ensemble import RandomForestRegressor

rf_regressor = RandomForestRegressor()
rf_regressor.fit(X_train, y_train)

y_pred_rf_regressor = rf_regressor.predict(X_test)
mse_rf_regressor = mean_squared_error(y_test, y_pred_rf_regressor)
rmse_rf_regressor = np.sqrt(mse_rf_regressor)

from sklearn.model_selection import GridSearchCV
parameters = {'n_estimators':range(10,300,10), 'criterion':('mse','mae'), 'max_features':('auto','sqrt','log2')}

gs = GridSearchCV(rf_regressor,parameters,scoring='neg_mean_squared_error',cv=3,verbose=True)
gs.fit(X_train,y_train)

gs.best_score_
gs.best_estimator_

y_pred_rf_regressor = gs.predict(X_test)
mse_rf_regressor = mean_squared_error(y_test, y_pred_rf_regressor)
rmse_rf_regressor = np.sqrt(mse_rf_regressor)

plt.plot(y_test)
plt.plot(y_pred_rf_regressor)

# Saving the best model
import pickle
pickl = {'model': rf_regressor}
pickle.dump( pickl, open( 'model_file' + ".p", "wb" ) )