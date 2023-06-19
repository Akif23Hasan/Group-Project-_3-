import os
from flask import Flask, jsonify, request
import json
from flask_cors import CORS
import csv

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)


#################################################
# Flask Routes
#################################################

@app.route('/api/v1.0/Four Sector Stocks', methods=['GET'])
def sector_stocks():
    
    with open("Four_Sector_Stocks.json") as json_file:
        data = json.load(json_file)
    return jsonify(data)


@app.route('/api/v1.0/T-Test', methods=['GET'])
def hyp_test():
    
    with open("FAANG_T_Test.json") as json_file:
        data = json.load(json_file)
    return jsonify(data)

    
@app.route("/")
def welcome():
    return (
        f"Welcome to the FAANG API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/Four Sector Stocks<br/>"
        f"/api/v1.0/T-Test<br/>"
    )  
    
if __name__ == '__main__':
   app.run(debug=True)
