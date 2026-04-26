from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# 보안 업데이트: 허용된 도메인(Vercel 주소 및 로컬 호스트)에서만 API 호출을 허용합니다. (CORS 공격 방어)
ALLOWED_ORIGINS = [
    "https://palmistry-five.vercel.app",
    "http://127.0.0.1:8000", 
    "http://localhost:8000"
]
CORS(app, resources={r"/api/*": {"origins": ALLOWED_ORIGINS}})

# Render 등 프록시 환경에서 실제 클라이언트 IP를 가져오기 위한 함수
def get_client_ip():
    return request.headers.get("X-Forwarded-For", request.remote_addr).split(',')[0].strip()

# 트래픽 과부하 방지를 위한 Rate Limiter 설정 (메모리 저장소 사용)
limiter = Limiter(
    get_remote_address=get_client_ip,
    app=app,
    storage_uri="memory://",
)

API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify(error="RATE_LIMIT_EXCEEDED"), 429

@app.route('/api/analyze', methods=['POST'])
@limiter.limit("15 per hour")  # 1시간에 15회 제한
@limiter.limit("50 per day")   # 하루에 50회 제한
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
