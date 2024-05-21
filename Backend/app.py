from flask import Flask, jsonify, request
from flask_cors import CORS
from Google_gemini import get_gemini_pro_response
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)


client = MongoClient('mongodb://localhost:27017')
db = client['Chatbot']
collection = db['user_history']
user_collection = db['user_data']

@app.route("/Chatbot", methods=['POST'])
def generate_summary():
    try:
        username = request.args.get('username')
        
        data = request.json
        prompt = data.get('prompt')
       
        response = get_gemini_pro_response(prompt)

        history = {
            'Username': username,
            'Prompt': prompt,
            'Response': response,
        }
        collection.insert_one(history)

        return jsonify({"response": response, "prompt": prompt})

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/chat_history", methods=['GET'])
def get_chat_history():
    try:
        username = request.args.get('username')
        chat_history = list(collection.find({'Username': username}, {'_id': 0}))
        return jsonify(chat_history)

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/login", methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        user = user_collection.find_one({'username': username, 'password': password})
        if user:
            return jsonify({"message": "Success"}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/register", methods=['POST'])
def register():
    try:
        data = request.json
        name = data.get('Name')
        username = data.get('username')
        password = data.get('password')

        if user_collection.find_one({'username': username}):
            return jsonify({"message": 'Exists'}), 400

        new_user = {
            'Name': name,
            'username': username,
            'password': password
        }    

        user_collection.insert_one(new_user)

        return jsonify({"message": 'Success'}), 201

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(host='192.168.1.7',port=5000,debug=True)
