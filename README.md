# AI-based-Salary-Estimator
An AI based Salary Estimator tool with Chatbot feature

- Created a tool that analyses and estimates salaries for roles in Human Resources, to help candidates negotiate income during interviews.
- Scraped over 1000 job descriptions from glassdoor using Python and Selenium.
- Built report using Power BI to show salary break up based on various factors.
- Optimized Linear, Lasso, and Random Forest Regressors using GridsearchCV to reach the best model.
- Built a client facing API using Flask.
- Built a chatbot for the end user to ask queries regarding estimation of salary.

## Resources Used:
- **Python Version**: 3.7
- **Python Packages**: pandas, numpy, sklearn, matplotlib, seaborn, selenium, flask, json, pickle
- **Data Visualization Tool**: Microsoft Power BI
- **Chatbot Tool**: SAP Conversational AI
- **Front-end**: SAP UI5 (*CSS, Javascript, HTML5*)
- **Scraper Github**: https://github.com/arapfaik/scraping-glassdoor-selenium
- **Scraper Article**: https://towardsdatascience.com/selenium-tutorial-scraping-glassdoor-com-in-10-minutes-3d0915c6d905

## Web Scraping
Scraped 1000 job postings from glassdoor.com. With each job, we got the following:

- Job title
- Salary Estimate
- Job Description
- Rating
- Company
- Location
- Company Size
- Company Founded Date
- Type of Ownership
- Industry
- Sector
- Revenue

## Data Cleaning
Cleaning of the data was required and hence we performed the below steps:

- Parsed numeric data out of salary
- Removed rows without salary
- Transformed founded date into age of company
- Classified categories of companies into Old, Medium and Start-ups based on age of company
- Calculated average salary for all the job postings based on given lower bound and upper bound
- Calculated average revenue for all the companies
- Replaced unknown company founded date by current year

## Data Visualization
Created reports in Microsoft Power BI to perform Exploratory Data Analysis and to visualize the Salary breakup based on:

- Sector
- Location
- Employee Size
- Industry
- Job Title
- Company Age Category

![alt text](https://github.com/E-equals-mcsquare/AI-based-Salary-Estimator/blob/master/Report.png "Report")

## Model Building
I transformed the categorical variables into dummy variables using the pd.get_dummies() method of pandas library. Then, I split the data into training and testing sets with a test size of 20%.

Since this is a regression problem, so I tried three different models:
- Multiple Linear Regression
- Lasso Regression
- Random Forest Regression

I evaluated them using 3 evaluation metrices such as Mean Squared Error, Root Mean Squared Error and Mean Absolute Error.

## Model Performance
The Random Forest model outperformed the other two models on the test set, with respect to MAE and RMSE.

- **Random Forest** : MAE = 7.79, RMSE = 14.39
- **Linear Regression** : MAE = 25.86, RMSE = 27.27
- **Lasso Regression** : MAE = 16.67, RMSE = 23.13

## Model Deployment
The model was deployed on local host server via exposing as a service through Flask API. I used ngrok for HTTPS tunneling of the service, so that the chatbot can use it as a Webhook for calling the service.

## Chatbot
I used SAP Conversational AI for building the chatbot

Entities that are used:
- industry
- sector
- location
- company age category

![alt text](https://github.com/E-equals-mcsquare/AI-based-Salary-Estimator/blob/master/CAIEntities.PNG "Entities")

SAP Conversational AI provides APIs which I had used in the service to get the response of the user queries through simple HTTPS calls.

## Front-End
As an end-product, I used SAP UI5 for holding the Power BI report. The following UI controls are used:
- **iFrame** - For embedding the HTML content of the Power BI Report
- **Custom Control** - For building the Chatbot interface
