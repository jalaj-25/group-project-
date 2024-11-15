from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

from flask import Flask, jsonify, request, send_from_directory
import os

app = Flask(__name__)
CORS(app)

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'odd*357.'
app.config['MYSQL_DB'] = 'india_post_db'

mysql = MySQL(app)

@app.route('/data')
def data():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM parcel_deliveries")
    results = cur.fetchall()
    return jsonify(results)

@app.route('/add_parcel', methods=['POST'])
def add_parcel():
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO parcel_deliveries 
        (customer_id, sender_name, recipient_name, sender_contact, recipient_contact, delivery_address, delivery_pincode, delivery_date, parcel_weight, weight_unit, time_slot)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
        (data['customer_id'], data['sender_name'], data['recipient_name'], 
         data['sender_contact'], data['recipient_contact'], 
         data['delivery_address'], data['delivery_pincode'],
         data['delivery_date'], data['parcel_weight'], 
         data['weight_unit'], data['time_slot']))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Parcel delivery added successfully!"}), 201

@app.route('/get_recommended_time', methods=['POST'])
def get_recommended_time():
    data = request.get_json()
    customer_id = data['customer_id']
    cur = mysql.connection.cursor()
    
    # Fetch the most recent delivery time slot for the customer based on customer_id
    cur.execute("""
        SELECT time_slot 
        FROM parcel_deliveries 
        WHERE customer_id = %s 
        ORDER BY delivery_date DESC LIMIT 1
    """, (customer_id,))
    
    result = cur.fetchone()
    cur.close()

    if result:
        return jsonify({'recommended_time': result[0]}), 200
    else:
        return jsonify({'message': 'Recommended_time: Not found'}), 404

@app.route('/update_time_slot', methods=['POST'])
def update_time_slot():
    data = request.get_json()
    delivery_id = data.get('deliveryId')
    new_date_slot = data.get('newDateSlot')
    available_time_slot = data.get('availableTimeSlot')

    if not delivery_id or not new_date_slot or not available_time_slot:
        return jsonify({'message': 'Delivery ID, new date slot, and available time slot are required'}), 400

    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE parcel_deliveries 
        SET delivery_date = %s, time_slot = %s 
        WHERE id = %s
    """, (new_date_slot, available_time_slot, delivery_id))
    
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': f'Delivery ID {delivery_id} date slot updated to {new_date_slot} and time slot updated to {available_time_slot}'}), 200


@app.route('/cancel_parcel', methods=['DELETE'])
def cancel_parcel():
    data = request.get_json()
    delivery_id = data.get('deliveryId')

    if not delivery_id:
        return jsonify({'message': 'Delivery ID is required'}), 400

    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM parcel_deliveries WHERE id = %s", (delivery_id))
    mysql.connection.commit()

    if cur.rowcount > 0:
        message = f'Parcel with Delivery ID {delivery_id} has been canceled successfully'
        return jsonify({'message': message}), 200
    else:
        return jsonify({'message': f'No parcel found with Delivery ID {delivery_id}'}), 404

    cur.close()

@app.route('/')
def index():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'index.html')

# Route to fetch records based on id, pincode, and delivery date
@app.route('/get_postman', methods=['POST'])
def get_postman():
    data = request.get_json()
    postman_id = data.get('id')
    pincode = data.get('pincode')
    delivery_date = data.get('date')

    if not postman_id or not pincode or not delivery_date:
        return jsonify({'message': 'ID, Pincode, and Delivery Date are required'}), 400

    cur = mysql.connection.cursor()

    # Query to fetch Postman details based on id and pincode
    cur.execute("SELECT * FROM Postman WHERE id = %s AND pincode = %s", (postman_id, pincode))
    postman_result = cur.fetchone()

    if not postman_result:
        cur.close()
        return jsonify({'message': 'No records found for the given ID and Pincode'}), 404

    # Query to fetch parcel deliveries based on the entered pincode and delivery date
    cur.execute("""
        SELECT recipient_name, recipient_contact, delivery_address, delivery_date, time_slot 
        FROM parcel_deliveries 
        WHERE delivery_pincode = %s AND delivery_date = %s
    """, (pincode, delivery_date))
    delivery_result = cur.fetchall()
    cur.close()

    deliveries = []
    for delivery in delivery_result:
        deliveries.append({
            'recipient_name': delivery[0],
            'recipient_contact': delivery[1],
            'delivery_address': delivery[2],
            'delivery_date': delivery[3],
            'time_slot': delivery[4]
        })

    return jsonify({
        'postman': {
            'id': postman_result[0],
            'name': postman_result[1],
            'pincode': postman_result[2]
        },
        'deliveries': deliveries
    }), 200


if __name__ == '__main__':
    app.run(debug=True)
