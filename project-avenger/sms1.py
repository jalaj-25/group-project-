import pywhatkit as pwk
from datetime import datetime
import time

def send_confirmation_message(recipient_contact, recipient_name, delivery_date, time_slot):
    try:
        # Extract current time to use in sending the message
        current_time = datetime.now()
        hours = current_time.hour
        minutes = current_time.minute + 2  # Send the message 2 minutes from the current time to ensure it gets sent

        # The message to be sent
        message = f"Dear {recipient_name}, your parcel will be delivered on {delivery_date} during the {time_slot} slot. - India Post"

        # Use pywhatkit to send the message instantly
        pwk.sendwhatmsg_instantly(f"+91{recipient_contact}", message, wait_time=10, tab_close=True)

        print("WhatsApp message sent successfully!")
    except Exception as e:
        print(f"An error occurred while sending WhatsApp message: {e}")

