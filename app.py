import os
from flask import Flask, jsonify
import json
from flask_cors import CORS

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

@app.route('/data', methods=['GET'])
def get_data():
    
    with open("Four_Sector_Stocks.json") as json_file:
        data = json.load(json_file)
    return jsonify(data)
    
    
    
    
    # Get the absolute path to the JSON file
    # file_path = os.path.join(os.path.dirname(__file__), 'static', 'js', 'DataFiles', 'Four_Sector_Stocks.json')

    # # Check if the JSON file exists
    # if os.path.exists(file_path):
    #     # Read the JSON data from the file
    #     with open(file_path, 'r') as file:
    #         data = file.read()

    #     # Remove newline characters from the JSON data
    #     data = data.replace('\n', '')

    #     # Return the JSON data as the API response
    #     return jsonify(data)
    # else:
    #     return 'Data not found', 404


if __name__ == '__main__':
    app.run()
