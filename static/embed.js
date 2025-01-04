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
      chatButton.innerHTML = "<i class='fa fa-comments'></i>";
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
        font-size: 30px;
        transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
      `;

      // Add hover effects
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
        border: none;
        border-radius: 15px;
         box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 8px 10px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        overflow: hidden;
      `;
      chatPopup.innerHTML = `
        <iframe
          id="chatbot-frame"
          src="https://hasnainprojects.pythonanywhere.com/home"
          style="width: 100%; height: 100%; border: none;"
        ></iframe>
        <div id="chatbot-popup-close">
          <i class="fa fa-times"></i>
        </div>
      `;

      // Style the close button
      const chatPopupClose = chatPopup.querySelector("#chatbot-popup-close");
      chatPopupClose.style.cssText = `
        display: none;
        position: absolute;
        top: 22px;
        right: 20px;
        font-size: 22px;
        cursor: pointer;
        color: #ebf0ec;
        z-index: 1002;
      `;

      // Add functionality to hide the chatbot on close button click
      chatPopupClose.addEventListener("click", () => {
        chatPopup.style.display = "none"; // Hide chatbot
        chatButton.style.display = "flex"; // Show chat button again
        chatPopupClose.style.display = "none"; // Hide close button
      });

      document.body.appendChild(chatPopup);

      // Toggle functionality for the chat button
      chatButton.addEventListener("click", () => {
        const isMobileView = window.innerWidth <= 480; // Check if in mobile view
        if (isMobileView) {
          chatPopup.style.display = "block"; // Show chatbot in fullscreen
          chatPopup.style.width = "100%";
          chatPopup.style.height = "100%";
          chatPopup.style.borderRadius = "0 !important";
          chatPopup.style.bottom = "0";
          chatPopup.style.right = "0";
          chatButton.style.display = "none"; // Hide chat button in mobile view
          chatPopupClose.style.display = "block"; // Show close button
        } else {
          const isChatOpen = chatPopup.style.display === "block";
          if (!isChatOpen) {
            chatPopup.style.display = "block"; // Show chatbot
            chatButton.innerHTML = "<i class='fa fa-times'></i>"; // Cross icon
          } else {
            chatPopup.style.display = "none"; // Hide chatbot
            chatButton.innerHTML = "<i class='fa fa-comments'></i>"; // Chat icon
          }
        }
      });

      // Responsive styles for mobile and tablet view
      const style = document.createElement("style");
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
          #chatbot-popup {
            display: none;
            border-radius: 0 !important;
          }
          #chatbot-popup-close {
            display: none; /* Initially hidden until chat opens */
          }
        }
      `;
      document.head.appendChild(style);
    } catch (error) {
      console.error("Error initializing chatbot widget:", error);
    }
  });
})();
