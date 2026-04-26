// DOM Elements
const uploadSection = document.getElementById('upload-section');
const loadingSection = document.getElementById('loading-section');
const resultSection = document.getElementById('result-section');
const previewImage = document.getElementById('preview-image');
const resultText = document.getElementById('result-text');

// Stat Bars
const statVitality = document.getElementById('stat-vitality');
const statIntelligence = document.getElementById('stat-intelligence');
const statCharm = document.getElementById('stat-charm');
const statVitalityVal = document.getElementById('stat-vitality-val');
const statIntelligenceVal = document.getElementById('stat-intelligence-val');
const statCharmVal = document.getElementById('stat-charm-val');

const loadingTexts = [
    "ANALYZING LINES",
    "READING PATTERNS",
    "EXTRACTING INSIGHTS",
    "COMPLETING DATA"
];
let loadingInterval;

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        startAnalysis(e.target.result);
    };
    reader.readAsDataURL(file);
}

function startAnalysis(base64Image) {
    const apiKeyInput = document.getElementById('api-key');
    const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';

    if (!apiKey) {
        alert('API Key를 입력해주세요.');
        return;
    }

    localStorage.setItem('gemini_api_key', apiKey);

    uploadSection.style.display = 'none';
    loadingSection.classList.remove('hidden');
    loadingSection.classList.add('flex');

    let textIndex = 0;
    const loadingTextElement = document.getElementById('loading-text');
    loadingTextElement.innerText = loadingTexts[textIndex];
    
    loadingInterval = setInterval(() => {
        textIndex = (textIndex + 1) % loadingTexts.length;
        loadingTextElement.innerText = loadingTexts[textIndex];
    }, 1200);

    analyzeWithGemini(base64Image, apiKey)
        .then(data => {
            clearInterval(loadingInterval);
            showResults(data);
        })
        .catch(err => {
            clearInterval(loadingInterval);
            alert('분석 중 오류가 발생했습니다: ' + err.message);
            resetApp();
        });
}

async function analyzeWithGemini(base64Image, apiKey) {
    const base64Data = base64Image.split(',')[1];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const prompt = `당신은 현대적이고 세련된 감각을 지닌 데이터 기반 성향 분석가입니다. 손바닥 사진의 선(생명선, 두뇌선, 감정선) 패턴을 시각적 데이터로 해석하여, 깊이 있고 차분한 톤의 에세이처럼 작성해주세요.

[중요 규칙]
1. 과장된 감탄사나 오래된 점쟁이/도사 같은 말투(오호라, ~하구나, ~하오 등)는 절대 사용하지 마세요. 
2. 인공지능이 출력하는 특유의 형식적인 말투나 마크다운 기호(**, *, # 등)는 절대 사용하지 마세요. 모든 텍스트는 순수한 평문(Plain text)으로만 작성해야 합니다.
3. 세련되고 정제된 어휘를 사용하세요. (예: "매우 훌륭합니다" 대신 "균형 잡힌 흐름을 보여줍니다" 등)
4. 사용자의 잠재력과 성향을 담백하고 객관적이며 긍정적인 방향으로 짚어주세요.

아래 JSON 형식으로만 응답하세요. 다른 텍스트는 덧붙이지 마세요.
{
  "vitality": 10에서 100 사이의 정수,
  "intelligence": 10에서 100 사이의 정수,
  "charm": 10에서 100 사이의 정수,
  "reading": "순수한 텍스트로 작성된 세련된 분석 내용 (줄바꿈 포함)"
}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [
                    { text: prompt },
                    {
                        inline_data: {
                            mime_type: "image/jpeg",
                            data: base64Data
                        }
                    }
                ]
            }],
            generationConfig: {
                response_mime_type: "application/json",
                temperature: 0.6
            }
        })
    });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || 'API 요청 실패');
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    try {
        return JSON.parse(resultText);
    } catch (e) {
        console.error("JSON Parsing Error:", resultText);
        throw new Error('데이터 처리 중 형식이 올바르지 않았습니다.');
    }
}

function showResults(data) {
    loadingSection.classList.add('hidden');
    loadingSection.classList.remove('flex');
    resultSection.classList.remove('hidden');
    resultSection.classList.add('flex');

    resultText.innerText = "";
    typeWriterEffect(resultText, data.reading, 20);

    setTimeout(() => {
        statVitality.style.width = `${data.vitality}%`;
        statIntelligence.style.width = `${data.intelligence}%`;
        statCharm.style.width = `${data.charm}%`;

        animateValue(statVitalityVal, 0, data.vitality, 1200);
        animateValue(statIntelligenceVal, 0, data.intelligence, 1200);
        animateValue(statCharmVal, 0, data.charm, 1200);
    }, 400);
}

function typeWriterEffect(element, text, speed) {
    let i = 0;
    // Remove any accidental markdown asterisks left by AI
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    
    function type() {
        if (i < cleanText.length) {
            element.innerHTML += cleanText.charAt(i) === '\n' ? '<br>' : cleanText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function resetApp() {
    resultSection.classList.add('hidden');
    resultSection.classList.remove('flex');
    uploadSection.style.display = 'flex';
    
    statVitality.style.width = '0%';
    statIntelligence.style.width = '0%';
    statCharm.style.width = '0%';
    statVitalityVal.innerText = '0';
    statIntelligenceVal.innerText = '0';
    statCharmVal.innerText = '0';
    resultText.innerHTML = '';
    
    document.getElementById('camera-input').value = '';
}

window.addEventListener('DOMContentLoaded', () => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
        const apiKeyInput = document.getElementById('api-key');
        if(apiKeyInput) apiKeyInput.value = savedKey;
    }
});
