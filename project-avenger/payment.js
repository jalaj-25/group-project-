const stripe = Stripe('YOUR_PUBLIC_KEY'); // Use your Stripe public key
        const elements = stripe.elements();

        // Create an instance of the card Element.
        const cardElement = elements.create('card');
        cardElement.mount('#card-element');

        // Handle amount input
        const amountInput = document.getElementById('amount');
        const summaryAmount = document.getElementById('summary-amount');
        amountInput.addEventListener('input', () => {
            const amount = parseFloat(amountInput.value);
            summaryAmount.textContent = `Amount: $${isNaN(amount) ? '0.00' : amount.toFixed(2)}`;
        });

        // Handle form submission
        const form = document.getElementById('form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const amount = parseFloat(amountInput.value) * 100; // Convert to cents

            if (isNaN(amount) || amount <= 0) {
                document.getElementById('card-errors').textContent = "Please enter a valid amount.";
                return;
            }

            // Create payment intent on server
            const { clientSecret } = await fetch('/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }),
            }).then((response) => response.json());

            // Confirm card payment
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: 'Cardholder Name',
                    },
                    expiration_month: document.getElementById('expiry-month').value,
                    expiration_year: document.getElementById('expiry-year').value,
                    cvv: document.getElementById('cvv').value,
                },
            });

            if (error) {
                document.getElementById('card-errors').textContent = error.message;
            } else {
                alert('Payment successful! Thank you for your purchase.');
                form.reset();
                summaryAmount.textContent = 'Amount: Rs 0.00'; // Reset the summary
            }
        });