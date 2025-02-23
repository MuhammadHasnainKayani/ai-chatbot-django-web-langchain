(function() {
  const config = {
      buttonColor: '#cf244f',
      hoverColor: '#ba2548',
      chatUrl: 'http://127.0.0.1:8000/chat',
      breakpoints: { mobile: 480 },
      zIndex: 2147483647
  };

  // SVG Icons
  const icons = {
      chat: `
          <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
      `,
      close: `
          <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
      `
  };

  let state = {
      isOpen: false,
      isMobile: false
  };

  const container = document.createElement('div');
  const shadowRoot = container.attachShadow({ mode: 'open' });
  document.body.appendChild(container);

  const injectStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
          :host {
              --button-size: 60px;
              --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .chat-button {
              position: fixed;
              bottom: 20px;
              right: 20px;
              width: var(--button-size);
              height: var(--button-size);
              background: ${config.buttonColor};
              color: white;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              z-index: ${config.zIndex};
              transition: var(--transition);
              border: none;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .chat-button svg {
              width: 30px;
              height: 30px;
              transition: var(--transition);
          }

          .chat-button.rotated {
              transform: rotate(180deg);
          }

          .chat-popup {
              position: fixed;
              bottom: 90px;
              right: 20px;
              width: 380px;
              height: 500px;
              background: white;
              border-radius: 15px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
              transform: translateY(20px);
              opacity: 0;
              visibility: hidden;
              transition: var(--transition);
              z-index: ${config.zIndex - 1};
              overflow: hidden;
          }

          .chat-popup.active {
              transform: translateY(0);
              opacity: 1;
              visibility: visible;
          }

          .chat-iframe {
              width: 100%;
              height: 100%;
              border: none;
              display: block;
          }

          .mobile-close {
              display: none;
              position: absolute;
              top: 15px;
              right: 15px;
              cursor: pointer;
              z-index: ${config.zIndex + 1};
              padding: 8px;
              border-radius: 50%;
          }

          .mobile-close svg {
              width: 24px;
              height: 24px;
              color: #666;
          }

          @media (max-width: 480px) {
              .chat-popup {
                  width: 100vw;
                  height: 100vh;
                  bottom: 0;
                  right: 0;
                  border-radius: 0;
              }

              .mobile-close {
                  display: block;
              }

              .chat-button {
                  transition: all 0.3s ease, opacity 0.3s ease;
              }
          }
      `;
      shadowRoot.appendChild(style);
  };

  const createElements = () => {
      // Chat button
      const chatButton = document.createElement('button');
      chatButton.className = 'chat-button';
      chatButton.innerHTML = icons.chat;
      shadowRoot.appendChild(chatButton);

      // Chat popup
      const chatPopup = document.createElement('div');
      chatPopup.className = 'chat-popup';
      chatPopup.innerHTML = `
          <div class="mobile-close">
              ${icons.close}
          </div>
          <iframe class="chat-iframe" 
              src="${config.chatUrl}"
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
              title="Chat interface"
          ></iframe>
      `;
      shadowRoot.appendChild(chatPopup);
  };

  const setupEventListeners = () => {
      const chatButton = shadowRoot.querySelector('.chat-button');
      const mobileClose = shadowRoot.querySelector('.mobile-close');

      chatButton.addEventListener('click', () => {
          state.isOpen = !state.isOpen;
          updateChatState();
      });

      mobileClose.addEventListener('click', () => {
          state.isOpen = false;
          updateChatState();
      });

      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && state.isOpen) {
              state.isOpen = false;
              updateChatState();
          }
      });

      window.addEventListener('resize', () => {
          state.isMobile = window.innerWidth <= config.breakpoints.mobile;
          updateChatState();
      });
  };

  const updateChatState = () => {
      const chatButton = shadowRoot.querySelector('.chat-button');
      const chatPopup = shadowRoot.querySelector('.chat-popup');
      
      // Update button icon and rotation
      chatButton.innerHTML = state.isOpen ? icons.close : icons.chat;
      chatButton.classList.toggle('rotated', state.isOpen);
      
      // Mobile-specific behavior
      if (state.isMobile) {
          chatPopup.classList.toggle('active', state.isOpen);
          chatButton.style.opacity = state.isOpen ? 0 : 1;
          chatButton.style.pointerEvents = state.isOpen ? 'none' : 'all';
          document.body.style.overflow = state.isOpen ? 'hidden' : '';
      } else {
          chatPopup.classList.toggle('active', state.isOpen);
      }
  };

  const init = () => {
      injectStyles();
      state.isMobile = window.innerWidth <= config.breakpoints.mobile;
      createElements();
      setupEventListeners();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
