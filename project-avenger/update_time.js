document.getElementById('deliveryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve input values
    const deliveryId = document.getElementById('deliveryId').value;
    const newDateSlot = document.getElementById('newDateSlot').value;
    const availableTimeSlot = document.getElementById('availableTimeSlot').value;

    // Make POST request to Flask API to update the time slot
    fetch('http://127.0.0.1:5000/update_time_slot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            deliveryId: deliveryId,
            newDateSlot: newDateSlot,
            availableTimeSlot: availableTimeSlot
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});