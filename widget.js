(function() {
  const css = `
    :root {
      --primary: #2563eb;
      --accent: #4f46e5;
      --bg: #ffffff;
      --chat-bg: #f8fafc;
      --bot-bubble: #f1f5f9;
      --user-bubble: var(--primary);
      --text: #1e293b;
      --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      --radius: 1rem;
      --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    [data-theme="dark"] {
      --bg: #1e293b;
      --chat-bg: #0f172a;
      --bot-bubble: #334155;
      --user-bubble: #2563eb;
      --text: #f8fafc;
    }

    .chatbot-container {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      * { 
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
    }

    .chatbot-toggler {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 64px;
      height: 64px;
      border: none;
      border-radius: 50%;
      background: var(--primary);
      box-shadow: var(--shadow);
      cursor: pointer;
      transition: var(--transition);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
      }
      
      svg {
        width: 24px;
        height: 24px;
        fill: white;
      }

      @media (max-width: 480px) {
        bottom: 1rem;
        right: 1rem;
      }
    }

    .typing-indicator {
      background: var(--bot-bubble);
      padding: 1rem 1.5rem;
      border-radius: var(--radius);
      display: inline-flex;
      gap: 0.75rem;
      align-items: center;
      margin-left: 1rem;
      
      span {
        width: 8px;
        height: 8px;
        background: var(--text);
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out;
        
        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.4s; }
      }
    }

    @keyframes bounce {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-6px); }
    }

    .chatbot {
      position: fixed;
      bottom: calc(64px + 2rem);
      right: 2rem;
      width: 400px;
      height: 500px;
      max-width: 95vw;
      background: var(--bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      transform: translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: var(--transition);
      z-index: 999;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      &.active {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      @media (max-width: 480px) {
        bottom: 0;
        right: 0;
        left :0;
        width: 100vw !important;
        height: 100dvh;
        border-radius: 0;
        
        &.active + .chatbot-toggler {
          display: none !important;
        }
      }
    }

    .chat-header {
      padding: 1rem 1.5rem;
      background: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      gap: 1rem;
      
      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }
      
      .controls {
        margin-left: auto;
        display: flex;
        gap: 0.5rem;
        
        button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.5rem;
          
          &:hover {
            background: rgba(255,255,255,0.1);
          }
        }
      }
    }

    .chatbox {
      flex: 1;
      height: calc(100% - 120px);
      padding: 1.5rem;
      overflow-y: auto;
      background: var(--chat-bg);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      &::-webkit-scrollbar {
        width: 6px;
        &-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 3px;
        }
      }
    }

    .message {
      max-width: 85%;
      padding: 0.75rem 1rem;
      border-radius: var(--radius);
      animation: fadeIn 0.3s ease;
      display: flex;
      gap: 0.75rem;
      position: relative;
      line-height: 1.5;

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        flex-shrink: 0;
        background: rgba(0,0,0,0.1);
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .content {
        flex: 1;
      }

      &.incoming {
        background: var(--bot-bubble);
        color: var(--text);
        align-self: flex-start;
      }

      &.outgoing {
        background: var(--user-bubble);
        color: white;
        align-self: flex-end;
        flex-direction: row-reverse;
      }

      .timestamp {
        font-size: 0.75rem;
        opacity: 0.7;
        margin-top: 0.5rem;
      }

      &.error-message {
        background: #fee2e2;
        color: #dc2626;
        
        .timestamp {
          color: inherit;
        }
      }
    }

    .chat-input {
      padding: 1rem;
      background: var(--bg);
      border-top: 1px solid rgba(0,0,0,0.05);
      display: flex;
      gap: 0.75rem;

      textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 0.75rem;
        resize: none;
        min-height: 48px;
        max-height: 120px;
        background: var(--chat-bg);
        color: var(--text);
        
        &:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(37,99,235,0.1);
        }
      }

      .send-btn {
        background: var(--primary);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: opacity 0.2s;
        
        &:hover {
          opacity: 0.9;
        }
        
        &[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.className = 'chatbot-container';
  container.innerHTML = `
    <div class="chatbot">
      <div class="chat-header">
        <h2>AI Assistant</h2>
        <div class="controls">
          <button class="theme-toggle" title="Toggle theme">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12c0-2.42-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6a6 6 0 0 1 6 6a6 6 0 0 1-6 6m8-9.31V4h-4.69L12 .69L8.69 4H4v4.69L.69 12L4 15.31V20h4.69L12 23.31L15.31 20H20v-4.69L23.31 12L20 8.69Z"/></svg>
          </button>
          <button class="close-btn">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/></svg>
          </button>
        </div>
      </div>
      
      <div class="chatbox"></div>
      
      <div class="chat-input">
        <textarea placeholder="Type your message..." rows="1"></textarea>
        <button class="send-btn" disabled>
          <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
        </button>
      </div>
    </div>
    <button class="chatbot-toggler">
      <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
    </button>
  `;
  document.body.appendChild(container);

  class Chatbot {
    constructor() {
      this.elements = {
        toggler: document.querySelector('.chatbot-toggler'),
        chatbot: document.querySelector('.chatbot'),
        chatbox: document.querySelector('.chatbox'),
        input: document.querySelector('textarea'),
        sendBtn: document.querySelector('.send-btn'),
        themeToggle: document.querySelector('.theme-toggle')
      };

      this.state = {
        isProcessing: false,
        history: JSON.parse(localStorage.getItem('chatHistory')) || []
      };

      this.initialize();
      this.addWelcomeMessage();
    }

    initialize() {
      this.setupEventListeners();
      this.loadHistory();
      this.setupTheme();
    }

    addWelcomeMessage() {
      if (!this.state.history.length) {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'message incoming welcome-message';
        welcomeMessage.innerHTML = `
          <div class="avatar">
            <img src="/static/images/bot.png" alt="bot avatar">
          </div>
          <div class="content">
            <p>Welcome! How can I assist you today?</p>
          </div>
        `;
        this.elements.chatbox.appendChild(welcomeMessage);
      }
    }

    setupEventListeners() {
      const { toggler, chatbot, input, sendBtn, themeToggle } = this.elements;

      toggler.addEventListener('click', () => this.toggleChatbot());
      chatbot.querySelector('.close-btn').addEventListener('click', () => this.toggleChatbot());
      sendBtn.addEventListener('click', () => this.handleSend());
      input.addEventListener('input', () => this.handleInput());
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSend();
        }
      });
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleChatbot() {
      this.elements.chatbot.classList.toggle('active');
      this.elements.input.focus();
    }

    async handleSend() {
      const text = this.elements.input.value.trim();
      if (!text || this.state.isProcessing) return;

      this.setState({ isProcessing: true });
      this.addMessage('outgoing', text);
      this.clearInput();

      try {
        const typingIndicator = this.showTypingIndicator();
        const response = await fetch('/chat/api/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });

        if (!response.ok) {
          const error = await response.json().catch(() => ({ error: 'server-error' }));
          throw new Error(error.error || 'server-error');
        }
        
        const data = await response.json();
        typingIndicator.remove();
        this.addMessage('incoming', data.response);
      } catch (error) {
        console.error('Chat error:', error);
        const errorMessage = error.message === 'server-error' 
          ? '⚠️ Server error. Please try again later.' 
          : '⚠️ Connection error. Please check your internet.';
        this.addErrorMessage(errorMessage);
      } finally {
        this.removeAllTypingIndicators();
        this.setState({ isProcessing: false });
        this.scrollToBottom();
      }

      this.saveHistory();
    }

    addMessage(type, content) {
      const message = document.createElement('div');
      message.className = `message ${type}`;
      
      const timestamp = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      message.innerHTML = `
        <div class="avatar">
          <img src="/static/images/${type === 'incoming' ? 'bot' : 'user'}.png" alt="${type} avatar">
        </div>
        <div class="content">
          <p>${content}</p>
          <div class="timestamp">${timestamp}</div>
        </div>
      `;

      this.elements.chatbox.appendChild(message);
      this.scrollToBottom();
    }

    addErrorMessage(content) {
      const message = document.createElement('div');
      message.className = 'message incoming error-message';
      
      const timestamp = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      message.innerHTML = `
        <div class="avatar">
          <img src="/static/images/bot.png" alt="bot avatar">
        </div>
        <div class="content">
          <p>${content}</p>
          <div class="timestamp">${timestamp}</div>
        </div>
      `;

      this.elements.chatbox.appendChild(message);
      this.scrollToBottom();
    }

    showTypingIndicator() {
      const indicator = document.createElement('div');
      indicator.className = 'message incoming';
      indicator.innerHTML = `
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
      this.elements.chatbox.appendChild(indicator);
      this.scrollToBottom();
      return indicator;
    }

    removeAllTypingIndicators() {
      const indicators = this.elements.chatbox.querySelectorAll('.typing-indicator');
      indicators.forEach(indicator => indicator.parentElement.remove());
    }

    setupTheme() {
      const theme = localStorage.getItem('chatTheme') || 'light';
      document.documentElement.setAttribute('data-theme', theme);
    }

    toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('chatTheme', newTheme);
    }

    handleInput() {
      const { input, sendBtn } = this.elements;
      sendBtn.disabled = input.value.trim().length === 0 || this.state.isProcessing;
      this.autoResizeTextarea();
    }

    autoResizeTextarea() {
      this.elements.input.style.height = 'auto';
      this.elements.input.style.height = `${Math.min(this.elements.input.scrollHeight, 120)}px`;
    }

    clearInput() {
      this.elements.input.value = '';
      this.autoResizeTextarea();
      this.handleInput();
    }

    scrollToBottom() {
      this.elements.chatbox.scrollTop = this.elements.chatbox.scrollHeight;
    }

    saveHistory() {
      const messages = Array.from(this.elements.chatbox.children)
        .filter(msg => !msg.classList.contains('welcome-message') && !msg.querySelector('.typing-indicator'))
        .slice(-50)
        .map(msg => ({
          type: msg.classList.contains('incoming') ? 'incoming' : 'outgoing',
          content: msg.querySelector('p').textContent
        }));
      
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }

    loadHistory() {
      this.state.history.forEach(msg => this.addMessage(msg.type, msg.content));
    }



    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.elements.sendBtn.disabled = this.state.isProcessing || !this.elements.input.value.trim();
    }
  }

  document.addEventListener('DOMContentLoaded', () => new Chatbot());
})();
