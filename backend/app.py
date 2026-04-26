from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if not API_KEY:
        return jsonify({"error": "백엔드 서버에 API 키가 설정되지 않았습니다."}), 500

    data = request.json
    images = data.get('images', [])
    prompt = data.get('prompt')
    
    if not images or not prompt:
        return jsonify({"error": "이미지나 프롬프트 데이터가 없습니다."}), 400

    parts = [{ "text": prompt }]
    for img in images:
        parts.append({
            "inline_data": {
                "mime_type": "image/jpeg",
                "data": img
            }
        })

    payload = {
        "contents": [{
            "parts": parts
        }],
        "generationConfig": {
            "response_mime_type": "application/json" if "JSON" in prompt else "text/plain",
            "temperature": 0.6
        }
    }
    
    try:
        response = requests.post(GEMINI_URL, json=payload)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        print("API Error:", e)
        return jsonify({"error": "Gemini API 통신 중 오류가 발생했습니다."}), 500

if __name__ == '__main__':
    print("Palm Reader Backend Server started on port 5000.")
    app.run(port=5000, debug=True)
