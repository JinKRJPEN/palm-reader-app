# ✋ PALM INSIGHT

A modern, sleek, and AI-powered web application for personalized palmistry readings. Uncover your hidden potential through the lines of your hands.

[**🌍 View Live Site**](https://palmistry-five.vercel.app)

![Palm Insight Preview](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge) ![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-blue?style=for-the-badge) ![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

---

## ✨ Features

### 📸 Dual Upload Modes
- **Quick Scan (1 Hand):** A simple and fast reading of your dominant hand.
- **Deep Scan (2 Hands):** Upload both your left (innate destiny) and right (present/future) hands for a highly accurate, comparative analysis.

### 🧠 AI-Powered Insights
Built using the **Google Gemini 2.5 Flash Vision API**, the app visually analyzes your life line, head line, and heart line to deliver a professional, essay-style reading.

### 🔍 Advanced Deep Dives
After the main reading, choose to explore specific areas of your life in deeper detail:
- 💼 **Career & Work** (Focusing on the Fate and Work lines)
- 💰 **Wealth & Finance** (Focusing on the Sun and Wealth lines)
- ❤️ **Love & Marriage** (Focusing on the Heart and Marriage lines)

### 📊 Potential Index Visualizer
Your innate potentials—**Vitality, Intelligence, and Emotion**—are extracted and beautifully visualized using smooth, animated progress bars.

### 🌐 Auto Multi-Language Support
The app automatically detects your system language and seamlessly switches both the UI text and the AI's language output. You can also toggle manually.
- 🇺🇸 English
- 🇰🇷 Korean (한국어)
- 🇯🇵 Japanese (日本語)

### 🎆 UI "Dopamine" Effects
A minimalist, elegant confetti animation triggers upon completing a reading, providing a satisfying visual reward that perfectly complements the sleek dark mode design.

---

## 🛠️ Tech Stack

### Frontend
- **HTML5 & Vanilla JavaScript**
- **Tailwind CSS** (via CDN for rapid, utility-first dark mode design)
- **Pretendard Font** (for clean, modern typography)
- **Canvas-Confetti** (for lightweight visual effects)

### Backend
- **Python 3 & Flask** (RESTful API handling)
- **Requests / Google Generative AI** (Interacting with Gemini API securely)
- **Render** (Cloud hosting for the backend to keep the API key strictly hidden from the client)

---

## 🔒 Security Architecture
The Google Gemini API Key is never exposed to the frontend web browser. All image processing and API requests are securely routed through the Python Flask backend, making this application completely safe for public, production deployment.

---

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JinKRJPEN/palm-reader-app.git
   cd palm-reader-app
   ```

2. **Start the Backend Server:**
   ```bash
   cd backend
   pip install -r requirements.txt
   
   # Add your API key to a .env file inside the backend directory: 
   # GEMINI_API_KEY=your_key_here
   
   python app.py
   ```

3. **Run the Frontend:**
   Open `index.html` using Live Server or any local HTTP server (e.g., `python -m http.server 8000`).
   *(Make sure to point the `BACKEND_URL` in `app.js` to `http://127.0.0.1:5000/api/analyze` during local development.)*

---

> *"We read the subtle lines of your palm to visualize your hidden potential."*
