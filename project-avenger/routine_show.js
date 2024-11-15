const id = localStorage.getItem('id');
        const pincode = localStorage.getItem('pincode');
        const date = localStorage.getItem('date');

        fetch('http://localhost:5000/get_postman', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, pincode: pincode, date: date })
        })
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = ''; 

            if (data.message) {
                resultContainer.innerHTML = `<p>${data.message}</p>`;
            } else {
                let resultHTML = `<h3>Postman Details:</h3>`;
                resultHTML += `
                    <div class="postman-details">
                        <div class="postman-info">
                            <p><strong>ID:</strong> ${data.postman.id}</p>
                            <p><strong>Name:</strong> ${data.postman.name}</p>
                            <p><strong>Phone Number:</strong> ${data.postman.phone_number}</p>
                            <p><strong>Pincode:</strong> ${data.postman.pincode}</p>
                        </div>
                        <img src="${data.postman.profile_image || 'images/profile.png'}" alt="Postman Profile Image" class="profile-image">
                    </div>
                `;

                // Combine deliveries and pickups into one array
                const combined = data.deliveries.map(delivery => ({
                    ...delivery,
                    type: 'delivery',
                    timeSlot: delivery.delivery_time_slot
                })).concat(data.pickups.map(pickup => ({
                    ...pickup,
                    type: 'pickup',
                    timeSlot: pickup.pickup_time_slot
                })));

                // Sort combined array by time slot
                combined.sort((a, b) => new Date(`1970-01-01T${a.timeSlot}`) - new Date(`1970-01-01T${b.timeSlot}`));

                // Display sorted results
                resultHTML += '<h3>Routine:</h3>';
                combined.forEach(item => {
                    if (item.type === 'delivery') {
                        resultHTML += `
                            <div class="delivery-box">
                                <div class="delivery-details">
                                    <h4>Delivery Information</h4>
                                    <p><strong>Delivery ID:</strong> ${item.id}</p>
                                    <p><strong>Customer Name:</strong> ${item.recipient_name}</p>
                                    <p><strong>Contact Number:</strong> ${item.recipient_contact}</p>
                                    <p><strong>Delivery Address:</strong> ${item.delivery_address}</p>
                                    <p><strong>Delivery Date:</strong> ${item.delivery_date}</p>
                                    <p><strong>Time Slot:</strong> ${item.timeSlot}</p>
                                </div>
                                <div class="buttons">
                                    <button onclick="trackAddress('${item.delivery_address}')">Track</button>
                                    <button onclick="showOtpInput(this)">Done</button>
                                </div>
                                <div class="otp-input">
                                    <input type="text" placeholder="Enter OTP">
                                    <button onclick="submitOtp(this)">Submit OTP</button>
                                </div>
                            </div>`;
                    } else {
                        resultHTML += `
                            <div class="pickup-box">
                                <div class="pickup-details">
                                    <h4>Pickup Information</h4>
                                    <p><strong>Pickup ID:</strong> ${item.id}</p>
                                    <p><strong>Customer Name:</strong> ${item.sender_name}</p>
                                    <p><strong>Contact Number:</strong> ${item.sender_contact}</p>
                                    <p><strong>Pickup Address:</strong> ${item.sender_address}</p>
                                    <p><strong>Pickup Date:</strong> ${item.pickup_date}</p>
                                    <p><strong>Time Slot:</strong> ${item.timeSlot}</p>
                                </div>
                                <div class="buttons">
                                    <button onclick="trackAddress('${item.sender_address}')">Track</button>
                                    <button onclick="showOtpInput(this)">Done</button>
                                </div>
                                <div class="otp-input">
                                    <input type="text" placeholder="Enter OTP">
                                    <button onclick="submitOtp(this)">Submit OTP</button>
                                </div>
                            </div>`;
                    }
                });

                resultContainer.innerHTML = resultHTML;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = '<p>Error fetching data</p>';
        });

        // Function to track address using Google Maps
        function trackAddress(address) {
            const formattedAddress = encodeURIComponent(address);
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
            window.open(googleMapsUrl, '_blank');
        }

        // Function to show OTP input box
        function showOtpInput(button) {
            const otpInput = button.parentElement.nextElementSibling;
            otpInput.style.display = 'block';
        }

        // Function to submit OTP and hide buttons
        function submitOtp(button) {
            const otpInput = button.previousElementSibling;
            const otpValue = otpInput.value;

            if (otpValue === "") {
                alert("Please enter the OTP.");
            } else {
                const parentBox = button.closest('.delivery-box, .pickup-box');
                const buttons = parentBox.querySelector('.buttons');
                buttons.style.display = 'none';
                otpInput.closest('.otp-input').style.display = 'none';
                parentBox.classList.add('done'); // Add 'done' class to change color
            }
        }
