let counter = 1;
        const totalSlides = 3;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.navigation-auto div');
    
        function showSlide(index) {
            // Reset all slides and dots
            slides.forEach((slide, i) => {
                slide.style.opacity = 0;
                dots[i].classList.remove('active-dot');
            });
    
            // Show the current slide
            slides[index].style.opacity = 1;
            dots[index].classList.add('active-dot');
        }
    
        // Show the first slide on page load
        showSlide(counter - 1);
    
        setInterval(function () {
            // Move to the next slide
            counter++;
            if (counter > totalSlides) {
                counter = 1;
            }
            showSlide(counter - 1);
        }, 3000); // Change image every 3 seconds
    
        // Theme Toggle Functionality
        function toggleTheme() {
            const body = document.body;
            const themeToggleBtn = document.getElementById('theme-toggle-btn');
            body.classList.toggle('dark-mode');

            // Change the icon based on the mode
            if (body.classList.contains('dark-mode')) {
                themeToggleBtn.innerHTML = '☀'; // Sun for dark mode
            } else {
                themeToggleBtn.innerHTML = '🌙'; // Moon for light mode
            }
        }

        function chatbot() {
        }

        function trackParcel() {
            // Implement parcel tracking functionality here
        }
        
        function cancelParcel() {
            // Implement parcel cancel functionality here
        }
        
        function provideFeedback() {
            // Implement feedback functionality here
        }

        function toggleChatbot() {
            const chatbotWindow = document.getElementById('chatbotWindow');
            chatbotWindow.style.display = chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '' ? 'block' : 'none';
            if (chatbotWindow.style.display === 'block') {
                welcomeMessage();
            }
        }

        function closeChatbot() {
            document.getElementById('chatbotWindow').style.display = 'none';
        }

        // Welcome message with quick replies
        function welcomeMessage() {
            setTimeout(() => {
                displayMessage("Hello! How can I assist you today?", 'bot');
                displayQuickReplies(["Track Parcel", "Office Hours", "Contact Us"]);
            }, 1000);
        }

        // Handle user input
        function sendMessage(event) {
            if (event.key === 'Enter') {
                const userInput = document.getElementById('userInput').value;
                if (userInput.trim() !== "") {
                displayMessage(userInput, 'user');
                document.getElementById('userInput').value = '';
                chatbotReply(userInput);
                }
            }
        }

        // Display message in the chat window
        function displayMessage(message, sender) {
            const chatMessages = document.getElementById('chatMessages');
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', sender);
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Simulate chatbot reply (you can modify this to add real functionality)
        function chatbotReply(userInput) {
            clearQuickReplies();  // Clear quick reply buttons after user input
            const responses = {
                "track": "Please provide your tracking number",
                "hours": "India Post office hours are 9 AM to 6 PM (Except Sundays & Gazetted Holidays)",
                "contact": "You can contact us at 18002666868. IVRS facility is available 24*7*365"
            };

            let reply = "I'm sorry, I didn't understand that. Can you please ask again?";
            userInput = userInput.toLowerCase();

            if (userInput.includes("track")) {
                reply = responses["track"];
            } else if (userInput.includes("hours")) {
                reply = responses["hours"];
            } else if (userInput.includes("contact")) {
                reply = responses["contact"];
            }

            setTimeout(() => {
                displayMessage(reply, 'bot');
                displayQuickReplies(["Track Another Parcel", "Contact Support", "Office Hours"]);
            }, 1000);  // Simulate delay for bot reply
        }

        // Display quick reply buttons
        function displayQuickReplies(options) {
            const quickRepliesDiv = document.getElementById('quickReplies');
            quickRepliesDiv.innerHTML = ''; // Clear previous buttons
            options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = () => handleQuickReply(option);
                quickRepliesDiv.appendChild(button);
            });
        }

        // Handle quick reply button clicks
        function handleQuickReply(option) {
            displayMessage(option, 'user');
            chatbotReply(option);
        }

        // Clear quick replies
        function clearQuickReplies() {
            document.getElementById('quickReplies').innerHTML = '';
        }

        function toggleMenu() {
            var menu = document.getElementById("sidebarMenu");
            menu.classList.toggle("closed"); // Toggle the 'closed' class to hide/show the menu
        }  
    const welcomeText = document.querySelector('.welcome-text');
    const followText = document.querySelector('.follow-text');
    const marqueeText = document.querySelector('.marquee-text');

    let isWelcomeVisible = true;

    function showText() {
        if (isWelcomeVisible) {
            welcomeText.style.display = 'block'; // Show welcome text
            followText.style.display = 'none'; // Hide follow text
            marqueeText.style.transform = 'translateX(0)'; // Slide in
            setTimeout(() => {
                welcomeText.classList.add('show'); // Fade in
                setTimeout(() => {
                    welcomeText.classList.remove('show'); // Fade out
                    setTimeout(() => {
                        marqueeText.style.transform = 'translateX(100%)'; // Slide out
                    }, 500); // Wait for fade out before sliding out
                }, 2000); // Show for 2 seconds
            }, 100); // Wait for display to render
        } else {
            followText.style.display = 'block'; // Show follow text
            welcomeText.style.display = 'none'; // Hide welcome text
            marqueeText.style.transform = 'translateX(0)'; // Slide in
            setTimeout(() => {
                followText.classList.add('show'); // Fade in
                setTimeout(() => {
                    followText.classList.remove('show'); // Fade out
                    setTimeout(() => {
                        marqueeText.style.transform = 'translateX(100%)'; // Slide out
                    }, 500); // Wait for fade out before sliding out
                }, 2000); // Show for 2 seconds
            }, 100); // Wait for display to render
        }
        isWelcomeVisible = !isWelcomeVisible; // Toggle visibility
    }

    // Set intervals for the text switch
    setInterval(() => {
        showText();
    }, 2000); // Change text every 8 seconds

    // Set content for each section based on initial state
    function toggleAccordion(section) {
        const content = document.getElementById('accordion-content');
        let htmlContent = '';

        document.querySelectorAll('#accordion div').forEach(div => {
            div.classList.remove('active-heading');
        });

        // Define content for each section
        switch (section) {
            case 'news':
                htmlContent = `
                    <ul>
                        <li><a href="#">Implementation of Philately Scholarship Scheme "Deen Dayal SPARSH Yojana" for the year 202425 - Kerala Circle</a></li>
                        <li><a href="#">Industry consultation regarding on-boarding a new system Integrator</a></li>
                        <li><a href="#">Universal Postal Union International Letter Writing Competition for Young People 2024</a></li>
                        <li><a href="#">Dhai Akhar National Level Letter Writing Competition 2024-25</a></li>
                    </ul>`;
                break;
            case 'tenders':
                htmlContent = `
                    <ul>
                        <li><a href="#">Hiring of commercial vehicles fitted with GPS</a></li>
                        <li><a href="#">Tender for procurement of CBS Passbooks – Nagpur Region (Tender ID : 2020_DOP_593471_1)</a></li>
                        <li><a href="#">​P/PSD/CHN/NYLON ORANGE AIRMAIL BAGS/2020-2021​(Tender ID:2020_DOP_591585_1​)​</a></li>
                        <li><a href="#">Security Services</a></li>
                    </ul>`;
                break;
            case 'notifications':
                htmlContent = `
                    <ul>
                        <li><a href="#">Guidelines for Harnessing Youth Power through Post Offices</a></li>
                        <li><a href="#">Notification for Deen Dayal SPARSH Yojana – KERALA POSTAL CIRCLE</a></li>
                        <li><a href="#">Advertisement For Hiring Of Post Office Accommodation on Lease/Rent Basis</a></li>
                        <li><a href="#">Advertisement for accommodation of Saligramam PO</a></li>
                    </ul>`;
                break;
            case 'recruitment':
                htmlContent = `
                    <ul>
                        <li><a href="#">Direct Recruitment examination for Postman/Mailguard and MTS cadre - 11th list of Tainted candidates</a></li>
                        <li><a href="#">Regarding publication of Result for the post of Mechanic (Motor Vehicle) in Mail Motor Service, Patna of Bihar Circle.</a></li>
                        <li><a href="#">Result of Stage – I Examination in r/o Staff Car Drivers (Ordinary Grade) held on 17.03.2024 in H.P. Postal Circle</a></li>
                        <li><a href="#">Display of final answer keys of paper-I under stage-I (Theory test) of Staff Car Driver</a></li>
                    </ul>`;
                break;
            default:
                htmlContent = ''; // Reset content if invalid section
        }

        // Set the HTML content and ensure the accordion content box is displayed
        content.innerHTML = htmlContent;
        content.style.display = htmlContent ? 'block' : 'none';
    }

    // Call the function to open 'news' section by default
    toggleAccordion('news');

    
