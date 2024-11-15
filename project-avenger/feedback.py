from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests

# Initialize the SQLite database and create a table for feedback
def init_db():
    conn = sqlite3.connect('feedback.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            order_number TEXT,
            rating INTEGER,
            user_feedback TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Call the function to initialize the database when the application starts
init_db()

@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    try:
        # Retrieve the JSON data sent from the frontend
        data = request.json
        
        # Validate the rating value
        rating = int(data['rating'])
        if rating < 1 or rating > 5:
            return jsonify({"message": "Invalid rating. Please provide a value between 1 and 5."}), 400
        
        # Save data to SQLite database
        conn = sqlite3.connect('feedback.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO feedback (name, email, order_number, rating, user_feedback)
            VALUES (?, ?, ?, ?, ?)
        ''', (data['name'], data['email'], data['order_number'], rating, data['user_feedback']))
        conn.commit()  # Save (commit) the changes
        conn.close()  # Close the connection

        # Send a success message back to the client
        return jsonify({"message": "Feedback submitted successfully!"}), 200
    except Exception as e:
        # Handle exceptions and send an error message back
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
