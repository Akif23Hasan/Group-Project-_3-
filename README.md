# FAANG: Discovering the Hidden Value and Influence
By Richard Soos, Graham Meadon, Suraksha Regmi, Tao Ma, Akif Hasan

## Overview
In this project, we embark on a captivating journey to unveil the true nature of the top-tier technology stocks known as FAANG (Facebook, Amazon, Apple, Netflix, and Google). Through the utilization of web scraping techniques, we will examine these stocks, comparing their performance against the Consumer Discretionary, Consumer Staples, Information Technology, and Communication Services sectors within the S&P 500 index.

To enhance the visualization of our analysis, we will develop an interactive dashboard powered by JavaScript. This dashboard will focus on various aspects of FAANG stocks, including sectors, ticker trading volume, and share price movement. By comparing these stocks to the broader stock market represented by the specified S&P 500 sectors, we aim to uncover the significance and impact of FAANG stocks on the index.

To accomplish this, we will utilize the Polygon.io API to create a database of the specified S&P 500 sectors along with each FAANG stock. Join us on this exciting quest as we delve into the hidden value and influence of FAANG stocks.

## Goals
1) Investigate how FAANG stocks skew their Global Industry Classification Standard (GICS) sector behavior and determine how naturally each stock would fit into a sector where the other stocks are not present. This comparison will consider a t-test for each stock against the relevant sector.
2) Identify correlations and patterns between the performance of FAANG stocks and market indices to gain insights into the influence of these tech giants on the overall market.
3) Visualize the performance and impact of each FAANG stock by analyzing their price changes and trade volumes over a defined period. Create an interactive dashboard to provide a comprehensive and visually engaging overview of the stocks' performance for easy analysis and comparison.

## Research Questions
1) How does the premium price of FAANG stocks align with their GICS classification? Do these stocks exhibit the traits of another GICS sector?
2) What are the performance trends and impact of FAANG stocks in terms of price changes and trade volumes when compared to the specified S&P 500 index sectors? How can these be effectively visualized and compared through an interactive dashboard?
3) What correlations and patterns exist between FAANG stock performance and market indices? How do these tech giants influence the overall market?

## Datasource
* Polygon.io
* Marketaux News
* D3 JS
* cdn.plot.ly/plotly-latest.min.js
* https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css

## Requirements
* Visualizations must include a Python Flask-powered API, HTML/CSS, JavaScript, and at least one database (SQL, MongoDB, SQLite, etc.).
* The project should include at least one JS library that has not been covered.
* The project must be powered by a dataset with at least 100 records.
* The project must include some level of user-driven interaction (e.g., menus, dropdowns, textboxes).
* The final visualization should ideally include at least three views.

## GitHub
* https://github.com/Akif23Hasan/Group8-Project-_3-FAANG_StockAnalysis
