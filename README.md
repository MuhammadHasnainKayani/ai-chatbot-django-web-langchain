# AI Chatbot Django Web App

A modern chatbot web application built with **Django** and **LangChain**.
This project provides:

* 🖥️ A **chat interface** built using Django templates.
* 🔗 An **embed script** (`embed.js`) and **floating widget** (`widget.js`) for integration into external websites.
* ⚡ Support for **LLMs via LangChain** (e.g., OpenAI GPT, HuggingFace).

---

## 🚀 Features

* Clean **Django-based backend** with SQLite database support.
* Chat UI built with **HTML, CSS, and JavaScript**.
* Floating chatbot widget (`widget.js`) that can be embedded anywhere.
* Easy integration with **LangChain** for advanced conversational AI.
* Ready for **local development** and **deployment**.

---

## 📂 Project Structure

```bash
AI-CHATBOT-DJANGO/
├── chatbot/                 # Django project files
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
├── chatbot_app/             # Core chatbot app
├── static/                  # CSS, JS, images
├── templates/               # Django HTML templates
├── db.sqlite3               # Default SQLite DB
├── embed.js                 # Script for embedding chatbot externally
├── widget.js                # Floating chatbot widget
├── manage.py                # Django project manager
├── requirements.txt         # Python dependencies
└── README.md                # Project documentation
```

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/AI-CHATBOT-DJANGO.git](https://github.com/MuhammadHasnainKayani/ai-chatbot-django-web-langchain.git
   cd ai-chatbot-django-web-langchain

   ```

2. **Create virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   venv\Scripts\activate      # Windows
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations**

   ```bash
   python manage.py migrate
   ```

5. **Run the development server**

   ```bash
   python manage.py runserver
   ```

6. Open in browser:

   ```
   http://127.0.0.1:8000/
   ```

---

## 📌 Embedding the Chatbot

Add this script to any webpage to embed the chatbot widget:

```html
<script src="https://your-domain.com/static/embed.js"></script>
<script src="https://your-domain.com/static/widget.js"></script>
```

---

## 🛠️ Tech Stack

* **Backend:** Django, LangChain
* **Frontend:** HTML, CSS, JavaScript
* **Database:** SQLite (default, can be replaced with PostgreSQL/MySQL)
* **Models:** OpenAI GPT / HuggingFace / Any LangChain-supported model



👉 Next, I can generate the **`requirements.txt`** file for your project so you have the full setup ready.
Would you like me to make a **minimal requirements** (only Django + LangChain) or a **complete one** (with all useful extras like dotenv, requests, etc.)?
