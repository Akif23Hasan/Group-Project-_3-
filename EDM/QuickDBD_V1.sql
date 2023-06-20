-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE IF EXISTS "4_Sector_Stocks";
DROP TABLE IF EXISTS "FAANG";
DROP TABLE IF EXISTS "T_test_AAPL";
DROP TABLE IF EXISTS "T_test_AMZN";
DROP TABLE IF EXISTS "T_test_FB";
DROP TABLE IF EXISTS "T_test_GOOG";
DROP TABLE IF EXISTS "T_test_GOOGL";
DROP TABLE IF EXISTS "T_test_NFLX";


--Create 4_Sector_Stocks table combining data from 4 different GICS Sectors - Communication Service, Consumer Discretionary, Consumer 
--Staples and Information Technology and FAANG Stocks - Facebook, Apple, Amazon, Netflix and Google
CREATE TABLE "4_Sector_Stocks" (
    "Stock_symbol" VARCHAR(10)   NOT NULL,
    "Start_price" FLOAT   NOT NULL,
    "End_price" FLOAT   NOT NULL,
    "Pct_change" FLOAT   NOT NULL,
    "Sector_pct_change" FLOAT   NOT NULL,
    "Stock_trade_volume" FLOAT   NOT NULL,
    "Trade_dollar_volume" FLOAT   NOT NULL,
    "GICS_Sector" VARCHAR(100)   NOT NULL
);

--Design a table called FAANG with all the five stocks - Facebook, Apple, Amazon, Netflix and Goog/Googl
CREATE TABLE "FAANG" (
    "Stock_symbol" VARCHAR(10)   NOT NULL,
    "Start_price" FLOAT   NOT NULL,
    "End_price" FLOAT   NOT NULL,
    "Pct_change" FLOAT   NOT NULL,
    "Sector_pct_change" FLOAT   NOT NULL,
    "Stock_trade_volume" FLOAT   NOT NULL,
    "Trade_dollar_volume" FLOAT   NOT NULL
);

--Design a table for T_test for Apple Stock
CREATE TABLE "T_test_AAPL" (
    "Stock_symbol" VARCHAR(10)   NOT NULL,
    "GICS_Sector" VARCHAR(100)   NOT NULL,
    "t_value" FLOAT   NOT NULL,
    "p_value" FLOAT   NOT NULL
);

--Design a table for T_test for Amazon Stock
CREATE TABLE "T_test_AMZN" (
    "Stock_symbol" VARCHAR(10)   NOT NULL,
    "GICS_Sector" VARCHAR(100)   NOT NULL,
    "t_value" FLOAT   NOT NULL,
    "p_value" FLOAT   NOT NULL
);

--Design a table for T_test for Facebook Stock
CREATE TABLE "T_test_FB" (
    "Stock_symbol" VARCHAR(10)   NOT NULL,
    "GICS_Sector" VARCHAR(100)   NOT NULL,
    "t_value" FLOAT   NOT NULL,
    "p_value" FLOAT   NOT NULL
);

--Design a table for T_test for Google Stock
CREATE TABLE "T_test_GOOG" (
    "Stock_symbol" VARCHAR(10)   NOT NULL,
    "GICS_Sector" VARCHAR(100)   NOT NULL,
    "t_value" FLOAT   NOT NULL,
    "p_value" FLOAT   NOT NULL
);

--Design a table for T_test for Google Stock
CREATE TABLE "T_test_GOOGL" (
    "Stock_symbol" VARCHAR(10)   NOT NULL,
    "GICS_Sector" VARCHAR(100)   NOT NULL,
    "t_value" FLOAT   NOT NULL,
    "p_value" FLOAT   NOT NULL
);

--Design a table for T_test for Netflix Stock
CREATE TABLE "T_test_NFLX" (
    "Stock_symbol" VARCHAR(10)   NOT NULL,
    "GICS_Sector" VARCHAR(100)   NOT NULL,
    "t_value" FLOAT   NOT NULL,
    "p_value" FLOAT   NOT NULL
);


-- Retrieve all the data from respective created tables
SELECT * FROM "4_Sector_Stocks";
SELECT * FROM "FAANG";
SELECT * FROM "T_test_AAPL";
SELECT * FROM "T_test_AMZN";
SELECT * FROM "T_test_FB";
SELECT * FROM "T_test_GOOG";
SELECT * FROM "T_test_GOOGL";
SELECT * FROM "T_test_NFLX";
