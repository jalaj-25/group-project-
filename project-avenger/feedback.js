const stars = document.querySelectorAll('.star');
        let selectedRating = 0;

        stars.forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = star.getAttribute('data-value');
                updateStarSelection(selectedRating);
            });
        });

        function updateStarSelection(rating) {
            stars.forEach(star => {
                star.classList.remove('selected');
                if (star.getAttribute('data-value') <= rating) {
                    star.classList.add('selected');
                }
            });
        }

        document.getElementById('feedbackForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Retrieve input values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const orderNumber = document.getElementById('order_number').value.trim();
            const feedback = document.getElementById('feedback').value.trim();

            // Validate input values
            if (!name || !email || !orderNumber || !selectedRating || !feedback) {
                document.getElementById('message').innerText = 'Please fill in all fields.';
                return;
            }

            // Make POST request to Flask API to submit feedback
            fetch('http://127.0.0.1:5000/submit_feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    order_number: orderNumber,
                    rating: selectedRating,
                    user_feedback: feedback
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('message').innerText = data.message;
                document.getElementById('feedbackForm').reset(); // Reset form fields after submission
                updateStarSelection(0); // Reset star selection
                selectedRating = 0; // Reset selected rating
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('message').innerText = 'Error submitting feedback. Please try again.';
            });
        });
