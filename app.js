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

// Loading Texts Animation
const loadingTexts = [
    "운명의 선을 읽는 중...",
    "생명선의 깊이를 파악하는 중...",
    "두뇌선의 흐름을 따라가는 중...",
    "감정선의 온도를 느끼는 중...",
    "별의 기운을 모으는 중..."
];
let loadingInterval;

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        startAnalysis(e.target.result); // Base64 image
    };
    reader.readAsDataURL(file);
}

function startAnalysis(base64Image) {
    // Hide upload, show loading
    uploadSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    loadingSection.classList.add('flex');

    // Start loading text animation
    let textIndex = 0;
    const loadingTextElement = document.getElementById('loading-text');
    loadingTextElement.innerText = loadingTexts[textIndex]; // initial
    
    loadingInterval = setInterval(() => {
        textIndex = (textIndex + 1) % loadingTexts.length;
        loadingTextElement.innerText = loadingTexts[textIndex];
    }, 1200);

    const apiKeyInput = document.getElementById('api-key');
    const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';

    if (!apiKey) {
        clearInterval(loadingInterval);
        alert('Gemini API Key를 입력해주세요!');
        resetApp();
        return;
    }

    // Save key to localStorage for convenience
    localStorage.setItem('gemini_api_key', apiKey);

    // Call Gemini Vision API
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

    const prompt = `너는 30년 경력의 신비롭고 유쾌한 손금 전문가야. 주어진 손바닥 사진을 보고 생명선, 두뇌선, 감정선을 파악해서 유쾌하고 긍정적인 운세 풀이를 해줘.
반드시 아래 JSON 형식으로만 응답해줘. 다른 말은 절대 덧붙이지 마.
{
  "vitality": 10에서 100 사이의 정수 (생명선 평가),
  "intelligence": 10에서 100 사이의 정수 (두뇌선 평가),
  "charm": 10에서 100 사이의 정수 (감정선 평가),
  "reading": "유쾌하고 긍정적인 도사의 말투로 작성된 상세한 손금 풀이 텍스트 (줄바꿈 포함)"
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
                temperature: 0.7
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
        throw new Error('AI가 올바른 형식으로 응답하지 않았습니다.');
    }
}

function showResults(data) {
    // Hide loading, show results
    loadingSection.classList.add('hidden');
    loadingSection.classList.remove('flex');
    resultSection.classList.remove('hidden');
    resultSection.classList.add('flex');

    // Set Text with typewriter effect
    resultText.innerText = "";
    typeWriterEffect(resultText, data.reading, 30);

    // Animate Stats
    setTimeout(() => {
        statVitality.style.width = `${data.vitality}%`;
        statIntelligence.style.width = `${data.intelligence}%`;
        statCharm.style.width = `${data.charm}%`;

        animateValue(statVitalityVal, 0, data.vitality, 1200);
        animateValue(statIntelligenceVal, 0, data.intelligence, 1200);
        animateValue(statCharmVal, 0, data.charm, 1200);
    }, 300);
}

function typeWriterEffect(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
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
    uploadSection.classList.remove('hidden');
    
    // Reset stats
    statVitality.style.width = '0%';
    statIntelligence.style.width = '0%';
    statCharm.style.width = '0%';
    statVitalityVal.innerText = '0';
    statIntelligenceVal.innerText = '0';
    statCharmVal.innerText = '0';
    resultText.innerHTML = '';
    
    // Reset inputs
    document.getElementById('camera-input').value = '';
    document.getElementById('gallery-input').value = '';
}

// Load API key on startup
window.addEventListener('DOMContentLoaded', () => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
        const apiKeyInput = document.getElementById('api-key');
        if(apiKeyInput) apiKeyInput.value = savedKey;
    }
});
