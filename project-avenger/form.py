from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

# Configure MySQL connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'  # Update with your MySQL username
app.config['MYSQL_PASSWORD'] = 'odd*357.'  # Update with your MySQL password
app.config['MYSQL_DB'] = 'india_post_db'

mysql = MySQL(app)

# Route to render HTML form
@app.route('/')
def index():
    return render_template('sender.html')

# Route to handle form submission
@app.route('/submit', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        # Fetch data from form fields
        sender_id = request.form['sender_id']
        sender_name = request.form['sender_name']
        sender_contact = request.form['sender_contact']
        sender_state = request.form['sender_state']
        sender_district = request.form['sender_district']
        sender_address = request.form['sender_address']
        sender_pincode = request.form['sender_pincode']
        recipient_name = request.form['recipient_name']
        recipient_contact = request.form['recipient_contact']
        recipient_state = request.form['recipient_state']
        recipient_district = request.form['recipient_district']
        recipient_address = request.form['recipient_address']
        recipient_pincode = request.form['recipient_pincode']
        service_type = request.form['service_type']
        pickup_date = request.form.get('pickup_date', None)  # Optional field
        pickup_time_slot = request.form.get('pickup_time_slot', None)  # Optional field
        delivery_date = request.form['delivery_date']
        delivery_time_slot = request.form['delivery_time_slot']

        # Insert data into MySQL database
        cursor = mysql.connection.cursor()
        cursor.execute("""
            INSERT INTO parcel_delivery (
                sender_id, sender_name, sender_contact, sender_state, sender_district, sender_address, sender_pincode,
                recipient_name, recipient_contact, recipient_state, recipient_district, recipient_address, recipient_pincode,
                service_type, pickup_date, pickup_time_slot, delivery_date, delivery_time_slot
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            sender_id, sender_name, sender_contact, sender_state, sender_district, sender_address, sender_pincode,
            recipient_name, recipient_contact, recipient_state, recipient_district, recipient_address, recipient_pincode,
            service_type, pickup_date, pickup_time_slot, delivery_date, delivery_time_slot
        ))

        mysql.connection.commit()
        cursor.close()

        flash("Parcel delivery details submitted successfully!")
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
