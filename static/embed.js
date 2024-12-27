(function () {
  // Add Font Awesome CDN link dynamically to the head
  const fontAwesomeLink = document.createElement("link");
  fontAwesomeLink.rel = "stylesheet";
  fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
  document.head.appendChild(fontAwesomeLink);

  // Wait for the DOM to fully load
  document.addEventListener("DOMContentLoaded", () => {
    try {
      // Create the floating chat button
      const chatButton = document.createElement("div");
      chatButton.id = "chatbot-button";
      chatButton.innerHTML = "<i class='fa fa-comments'></i>"; // Beautiful chat icon from Font Awesome
      chatButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: #cf244f;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1000;
        font-size: 30px; /* Adjust icon size */
        transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
      `;

      // Add hover effect to the chat button
      chatButton.addEventListener("mouseover", () => {
        chatButton.style.transform = "scale(1.1)";
        chatButton.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
        chatButton.style.background = "#ba2548";
      });

      chatButton.addEventListener("mouseout", () => {
        chatButton.style.transform = "scale(1)";
        chatButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        chatButton.style.background = "#cf244f";
      });

      document.body.appendChild(chatButton);

      // Create the popup chat container
      const chatPopup = document.createElement("div");
      chatPopup.id = "chatbot-popup";
      chatPopup.style.cssText = `
        display: none;
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 380px;
        height: 500px;
        background: white;
        border: 1px solid #101010;
        border-radius: 15px;
        z-index: 1001;
        overflow: hidden;
      `;
      chatPopup.innerHTML = `
        <iframe
          id="chatbot-frame"
          src="https://hasnainprojects.pythonanywhere.com/home"
          style="width: 100%; height: 100%; border: none; border-radius: 15px;"
        ></iframe>
      `;
      document.body.appendChild(chatPopup);

      // Toggle functionality for the chat button
      let isChatOpen = false; // Track chat state
      chatButton.addEventListener("click", () => {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
          chatPopup.style.display = "block";
          chatButton.innerHTML = "<i class='fa fa-times'></i>"; // Cross icon for closing
          chatButton.style.transform = "rotate(180deg)"; // Rotate button when open
        } else {
          chatPopup.style.display = "none";
          chatButton.innerHTML = "<i class='fa fa-comments'></i>"; // Chat icon for opening
          chatButton.style.transform = "rotate(0deg)"; // Reset rotation
        }
      });

      // Responsive styles for mobile and tablet view
      const style = document.createElement('style');
      style.innerHTML = `
        @media (max-width: 768px) {
          #chatbot-button {
            width: 50px;
            height: 50px;
            font-size: 24px;
            bottom: 15px;
            right: 15px;
          }

          #chatbot-popup {
            width: 300px;
            height: 400px;
          }
        }

        @media (max-width: 480px) {
          #chatbot-button {
            width: 45px;
            height: 45px;
            font-size: 22px;
            bottom: 10px;
            right: 10px;
          }

          #chatbot-popup {
            width: 100% !important;
            height: 350px;
            right: 4px !important;
              left: 2px !important;
          }
        }
      `;
      document.head.appendChild(style);
    } catch (error) {
      console.error("Error initializing chatbot widget:", error);
    }
  });
})();
