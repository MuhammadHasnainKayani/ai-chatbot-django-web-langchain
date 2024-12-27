document.addEventListener("DOMContentLoaded", () => {
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");

  let userMessage = null;
  const API_URL = "/api/generate_response/";

  // Store the initial height of the input field when the page loads
  const inputInitHeight = chatInput.clientHeight;

  // Function to create chat <li> element
  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing"
      ? `<p></p>`
      : `<img src="${logoImageUrl}" class="logo-image"><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
  };

  // Function to generate a response from the API
  const generateResponse = async (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_message: userMessage }),
    };

    try {
      const res = await fetch(API_URL, requestOptions);
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      const data = await res.json();

      if (data && data.bot_response) {
        messageElement.textContent = data.bot_response;
        saveChatToSession(data.bot_response, "incoming");
      } else {
        throw new Error("Empty response from server");
      }
    } catch (error) {
      messageElement.classList.add("error");
      messageElement.textContent = "Oops! Something went wrong. Please try again.";
    } finally {
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }
  };

// Adjust textarea height dynamically
chatInput.addEventListener("input", () => {
  chatInput.style.height = "auto"; // Reset to calculate the correct height
  chatInput.style.height = `${chatInput.scrollHeight}px`; // Adjust height to match content
});

// Function to handle sending chat
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Append user's message to chatbox
  const outgoingChatLi = createChatLi(userMessage, "outgoing");
  chatbox.appendChild(outgoingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  saveChatToSession(userMessage, "outgoing");

  // Clear the input textarea but preserve its height dynamically
  chatInput.value = "";
  chatInput.dispatchEvent(new Event("input")); // Trigger input event to recalculate height

  // Display "Typing..." while waiting for the response
  const incomingChatLi = createChatLi("Typing...", "incoming");
  chatbox.appendChild(incomingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  generateResponse(incomingChatLi);
};


  // Function to save chat to session storage
  const saveChatToSession = (message, className) => {
    const chatHistory = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    chatHistory.push({ message, className });
    sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  };

  // Function to load chat history from session storage
  const loadChatHistory = () => {
    const chatHistory = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    chatHistory.forEach(chat => {
      const chatLi = createChatLi(chat.message, chat.className);
      chatbox.appendChild(chatLi);
    });
    chatbox.scrollTo(0, chatbox.scrollHeight);
  };

  // Load chat history on page load
  loadChatHistory();

  // Handle sending chat on Enter key press
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  });

  // Handle send button click
  sendChatBtn.addEventListener("click", handleChat);
});
