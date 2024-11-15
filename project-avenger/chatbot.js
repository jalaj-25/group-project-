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
      "track": "Please provide your tracking number.",
      "hours": "India Post office hours are 9 AM to 6 PM(Except Sundays & Gazetted Holidays)",
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