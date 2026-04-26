from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# .env 파일에서 환경변수 로드
load_dotenv()

app = Flask(__name__)
# 프론트엔드(로컬 및 깃허브 페이지)에서 백엔드 API를 호출할 수 있도록 CORS 허용
CORS(app, resources={r"/api/*": {"origins": "*"}})

# 환경변수에서 API 키를 읽어옵니다. 이 코드는 절대 외부에 노출되지 않습니다.
API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if not API_KEY:
        return jsonify({"error": "백엔드 서버에 API 키가 설정되지 않았습니다."}), 500

    data = request.json
    base64_data = data.get('image')
    prompt = data.get('prompt')
    
    if not base64_data or not prompt:
        return jsonify({"error": "이미지나 프롬프트 데이터가 없습니다."}), 400

    payload = {
        "contents": [{
            "parts": [
                { "text": prompt },
                {
                    "inline_data": {
                        "mime_type": "image/jpeg",
                        "data": base64_data
                    }
                }
            ]
        }],
        "generationConfig": {
            "response_mime_type": "application/json" if "JSON 형식으로만 응답" in prompt else "text/plain",
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
