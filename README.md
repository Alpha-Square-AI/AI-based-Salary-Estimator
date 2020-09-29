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
