from flask import Flask, jsonify, request, send_from_directory
from flask_mysqldb import MySQL
from flask_cors import CORS
import os
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'odd*357.'
app.config['MYSQL_DB'] = 'india_post_db'

mysql = MySQL(app)

@app.route('/')
def index():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'index.html')

@app.route('/get_postman', methods=['POST'])
def get_postman():
    data = request.get_json()
    postman_id = data.get('id')
    pincode = data.get('pincode')
    delivery_date = data.get('date')

    if not postman_id or not pincode or not delivery_date:
        return jsonify({'message': 'ID, Pincode, and Delivery Date are required'}), 400

    cur = mysql.connection.cursor()

    # Query Postman details
    cur.execute("SELECT id, name, phone_number, pincode FROM Postman WHERE id = %s AND pincode = %s", (postman_id, pincode))
    postman_result = cur.fetchone()

    if not postman_result:
        cur.close()
        return jsonify({'message': 'No records found for the given ID and Pincode'}), 404

    # Query deliveries
    cur.execute(""" 
        SELECT id, recipient_name, recipient_contact, recipient_address, delivery_date, delivery_time_slot 
        FROM parcel_deliveries 
        WHERE recipient_pincode = %s AND delivery_date = %s
    """, (pincode, delivery_date))
    delivery_result = cur.fetchall()

    # Query pickups
    cur.execute(""" 
        SELECT id, sender_name, sender_contact, sender_address, pickup_date, pickup_time_slot 
        FROM parcel_deliveries
        WHERE sender_pincode = %s AND pickup_date = %s
    """, (pincode, delivery_date))
    pickup_result = cur.fetchall()

    cur.close()

    # Prepare deliveries data
    deliveries = [{
        'id': delivery[0],
        'recipient_name': delivery[1],
        'recipient_contact': delivery[2],
        'delivery_address': delivery[3],
        'delivery_date': delivery[4],
        'delivery_time_slot': delivery[5]
    } for delivery in delivery_result]

    # Prepare pickups data
    pickups = [{
        'id': pickup[0],
        'sender_name': pickup[1],
        'sender_contact': pickup[2],
        'sender_address': pickup[3],
        'pickup_date': pickup[4],
        'pickup_time_slot': pickup[5]
    } for pickup in pickup_result]

    # Prepare postman data
    postman_data = {
        'id': postman_result[0],
        'name': postman_result[1],
        'phone_number': postman_result[2],
        'pincode': postman_result[3],
        'profile_image': None  # Add logic for postman profile image if necessary
    }

    return jsonify({'postman': postman_data, 'deliveries': deliveries, 'pickups': pickups})

@app.route('/update_time_slot', methods=['POST'])
def update_time_slot():
    data = request.json
    delivery_id = data.get('deliveryId')
    action = data.get('action')  # pickup, delivery, or return
    new_date_slot = data.get('newDateSlot')
    available_time_slot = data.get('availableTimeSlot')

    if not (delivery_id and action and new_date_slot and available_time_slot):
        return jsonify({'message': 'Missing required data.'}), 400

    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        # Determine which fields to update based on the action
        if action == 'pickup':
            query = """
                UPDATE parcel_deliveries 
                SET pickup_date = %s, pickup_time_slot = %s 
                WHERE id = %s
            """
            values = (new_date_slot, available_time_slot, delivery_id)
        elif action == 'delivery':
            query = """
                UPDATE parcel_deliveries 
                SET delivery_date = %s, delivery_time_slot = %s 
                WHERE id = %s
            """
            values = (new_date_slot, available_time_slot, delivery_id)
        elif action == 'return':
            query = """
                UPDATE parcel_deliveries 
                SET return_date = %s, return_time = %s 
                WHERE id = %s
            """
            values = (new_date_slot, available_time_slot, delivery_id)
        else:
            return jsonify({'message': 'Invalid action selected.'}), 400

        # Execute the update query
        cursor.execute(query, values)
        mysql.connection.commit()

        return jsonify({'message': f'{action.capitalize()} time slot updated successfully!'}), 200

    except MySQLdb.Error as e:
        print("MySQL Error:", e)
        return jsonify({'message': 'Failed to update the time slot.'}), 500

    finally:
        cursor.close()

if __name__ == '__main__':
    app.run(debug=True)
