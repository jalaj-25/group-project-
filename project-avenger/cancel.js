document.getElementById("cancelParcelForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const trackingNumber = document.getElementById("trackingNumber").value;
    const contactNumber = document.getElementById("contact_number").value;
    const reason = document.getElementById("reason").value;

    if (!trackingNumber || !contactNumber || !reason) {
        alert("Please fill out all fields.");
        return;
    }

    // Send the data to the Flask backend
    fetch('http://localhost:5000/cancel_parcel', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            deliveryId: trackingNumber,
            contact_number: contactNumber,
            reason: reason
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            document.getElementById("cancelMessage").innerHTML = data.message;
            document.getElementById("cancelMessage").classList.remove("error");
            document.getElementById("cancelMessage").style.display = "block";
        } else {
            document.getElementById("cancelMessage").innerHTML = "An error occurred. Please try again.";
            document.getElementById("cancelMessage").classList.add("error");
            document.getElementById("cancelMessage").style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("cancelMessage").innerHTML = "An error occurred. Please try again.";
        document.getElementById("cancelMessage").classList.add("error");
        document.getElementById("cancelMessage").style.display = "block";
    });

    // Optionally, clear the form
    document.getElementById("cancelParcelForm").reset();
});
