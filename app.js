// 1. Language & i18n
const i18n = {
    ko: {
        title: "손금 분석의 새로운 기준",
        subtitle: "손바닥의 미세한 선들을 읽어\n숨겨진 잠재력을 데이터로 시각화합니다.",
        tab_quick: "간편 스캔 (한 손)",
        tab_deep: "정밀 스캔 (양 손)",
        upload_quick: "Tap to Upload",
        upload_left: "왼손 (선천적 운명)",
        upload_right: "오른손 (현재/미래)",
        analyze_btn: "양손 분석 시작하기",
        loading: "ANALYZING LINES",
        idx_title: "잠재력 지표",
        ins_title: "상세 분석",
        deep_title: "특정 영역의 더 깊은 분석이 필요하신가요?",
        btn_career: "Career<br><span class='text-[9px] text-brand-500 font-medium block mt-1'>사업/직업</span>",
        btn_wealth: "Wealth<br><span class='text-[9px] text-brand-500 font-medium block mt-1'>금전운</span>",
        btn_love: "Love<br><span class='text-[9px] text-brand-500 font-medium block mt-1'>연애/결혼</span>",
        vitality: "Vitality <span class='text-brand-600 ml-1 text-[10px]'>생명</span>",
        intelligence: "Intelligence <span class='text-brand-600 ml-1 text-[10px]'>두뇌</span>",
        emotion: "Emotion <span class='text-brand-600 ml-1 text-[10px]'>감정</span>",
        analysis_comp: "Analysis Complete",
        reset_btn: "새로운 분석 시작",
        err_msg: "분석 중 오류가 발생했습니다.",
        ai_prompt: `당신은 세련된 감각을 지닌 데이터 기반 성향 분석가입니다. 제공된 손바닥 사진의 선(생명선, 두뇌선, 감정선) 패턴을 읽어 차분하고 정제된 에세이 톤으로 분석하세요. 한국어로 응답하세요.
[규칙]
1. 과장된 감탄사나 점쟁이 말투는 절대 쓰지 마세요.
2. 마크다운 기호(**, *)는 절대 사용하지 말고 순수 텍스트로만 쓰세요.
3. 세련되고 객관적이며 긍정적인 방향으로 2~3문단 작성하세요.
아래 JSON 형태만 출력:
{"vitality": 정수(10-100), "intelligence": 정수(10-100), "charm": 정수(10-100), "reading": "텍스트 내용"}`
    },
    en: {
        title: "A New Standard in Palmistry",
        subtitle: "We read the subtle lines of your palm\nto visualize your hidden potential.",
        tab_quick: "Quick Scan (1 Hand)",
        tab_deep: "Deep Scan (2 Hands)",
        upload_quick: "Tap to Upload",
        upload_left: "Left Hand (Innate)",
        upload_right: "Right Hand (Future)",
        analyze_btn: "Start Deep Analysis",
        loading: "ANALYZING LINES",
        idx_title: "Potential Index",
        ins_title: "Detailed Insight",
        deep_title: "Want a deeper reading on a specific area?",
        btn_career: "Career<br><span class='text-[9px] text-brand-500 font-medium block mt-1'>Work & Biz</span>",
        btn_wealth: "Wealth<br><span class='text-[9px] text-brand-500 font-medium block mt-1'>Finances</span>",
        btn_love: "Love<br><span class='text-[9px] text-brand-500 font-medium block mt-1'>Relationships</span>",
        vitality: "Vitality",
        intelligence: "Intelligence",
        emotion: "Emotion",
        analysis_comp: "Analysis Complete",
        reset_btn: "Start New Scan",
        err_msg: "An error occurred during analysis.",
        ai_prompt: `You are a modern, sophisticated data-driven palmistry analyst. Analyze the palm lines and write a calming, refined essay. Respond in natural, elegant English.
[Rules]
1. No exaggerated fortune-teller tropes.
2. No markdown symbols like **. Use plain text only.
3. Use refined vocabulary. Be objective yet positive (2-3 paragraphs).
Respond ONLY with this JSON:
{"vitality": int(10-100), "intelligence": int(10-100), "charm": int(10-100), "reading": "Essay text"}`
    },
    ja: {
        title: "手相分析の新しい基準",
        subtitle: "手のひらの微細な線を読み取り\n隠された潜在能力をデータ化します。",
        tab_quick: "簡単スキャン (片手)",
        tab_deep: "精密スキャン (両手)",
        upload_quick: "タップしてアップロード",
        upload_left: "左手 (生まれ持った運命)",
        upload_right: "右手 (現在・未来)",
        analyze_btn: "両手の分析を開始",
        loading: "ANALYZING LINES",
        idx_title: "潜在能力インデックス",
        ins_title: "詳細な分析",
        deep_title: "特定の分野についてさらに詳しく知りたいですか？",
        btn_career: "Career<br><span class='text-[9px] text-brand-500 font-medium block mt-1'>仕事・事業</span>",
        btn_wealth: "Wealth<br><span class='text-[9px] text-brand-500 font-medium block mt-1'>金運</span>",
        btn_love: "Love<br><span class='text-[9px] text-brand-500 font-medium block mt-1'>恋愛・結婚</span>",
        vitality: "Vitality <span class='text-brand-600 ml-1 text-[10px]'>生命</span>",
        intelligence: "Intelligence <span class='text-brand-600 ml-1 text-[10px]'>知能</span>",
        emotion: "Emotion <span class='text-brand-600 ml-1 text-[10px]'>感情</span>",
        analysis_comp: "Analysis Complete",
        reset_btn: "新しい分析を開始",
        err_msg: "分析中にエラーが発生しました。",
        ai_prompt: `あなたは現代的で洗練されたデータ主導の手相アナリストです。提供された手相のパターンを分析し、落ち着いた洗練されたエッセイのように解釈してください。自然で洗練された日本語で答えてください。
[ルール]
1. 古い占い師のような誇張された表現は使わないでください。
2. マークダウン記号(**等)は絶対に使用せず、純粋なテキストにしてください。
3. 洗練された語彙を使用し、客観的かつポジティブに2〜3段落で書いてください。
以下のJSON形式のみで応答してください:
{"vitality": 整数(10-100), "intelligence": 整数(10-100), "charm": 整数(10-100), "reading": "エッセイテキスト"}`
    }
};

let currentLang = 'ko';

function initLang() {
    const sysLang = navigator.language.slice(0, 2);
    if (['ko', 'ja'].includes(sysLang)) currentLang = sysLang;
    else currentLang = 'en';
    applyLang();
}

function setLanguage(lang) {
    currentLang = lang;
    applyLang();
}

function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) {
            el.innerHTML = i18n[currentLang][key].replace(/\n/g, '<br>');
        }
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('text-brand-100', 'font-bold');
        btn.classList.add('text-brand-600');
        if (btn.id === `lang-${currentLang}`) {
            btn.classList.remove('text-brand-600');
            btn.classList.add('text-brand-100', 'font-bold');
        }
    });
}

// 2. DOM & State
const BACKEND_URL = 'https://palm-reader-app-anx0.onrender.com/api/analyze';
let currentMode = 'quick'; // 'quick' or 'deep'
let imagesToAnalyze = []; // array of base64 strings

function setMode(mode) {
    currentMode = mode;
    imagesToAnalyze = [];
    document.getElementById('preview-left').style.opacity = '0';
    document.getElementById('preview-right').style.opacity = '0';
    document.getElementById('check-left').classList.add('hidden');
    document.getElementById('check-right').classList.add('hidden');
    document.getElementById('btn-analyze-deep').disabled = true;
    document.getElementById('btn-analyze-deep').classList.add('opacity-30', 'cursor-not-allowed');

    if (mode === 'quick') {
        document.getElementById('mode-quick').classList.replace('bg-transparent', 'bg-brand-800');
        document.getElementById('mode-quick').classList.replace('text-brand-500', 'text-brand-100');
        document.getElementById('mode-deep').classList.replace('bg-brand-800', 'bg-transparent');
        document.getElementById('mode-deep').classList.replace('text-brand-100', 'text-brand-500');
        document.getElementById('upload-quick-area').classList.remove('hidden');
        document.getElementById('upload-quick-area').classList.add('flex');
        document.getElementById('upload-deep-area').classList.add('hidden');
        document.getElementById('upload-deep-area').classList.remove('flex');
    } else {
        document.getElementById('mode-deep').classList.replace('bg-transparent', 'bg-brand-800');
        document.getElementById('mode-deep').classList.replace('text-brand-500', 'text-brand-100');
        document.getElementById('mode-quick').classList.replace('bg-brand-800', 'bg-transparent');
        document.getElementById('mode-quick').classList.replace('text-brand-100', 'text-brand-500');
        document.getElementById('upload-deep-area').classList.remove('hidden');
        document.getElementById('upload-deep-area').classList.add('flex');
        document.getElementById('upload-quick-area').classList.add('hidden');
        document.getElementById('upload-quick-area').classList.remove('flex');
    }
}

function handleImageUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64 = e.target.result;
        if (type === 'quick') {
            imagesToAnalyze = [base64];
            startAnalysis();
        } else if (type === 'left') {
            document.getElementById('preview-left').src = base64;
            document.getElementById('preview-left').style.opacity = '1';
            document.getElementById('check-left').classList.remove('hidden');
            document.getElementById('check-left').classList.add('flex');
            imagesToAnalyze[0] = base64;
            checkDeepAnalysisReady();
        } else if (type === 'right') {
            document.getElementById('preview-right').src = base64;
            document.getElementById('preview-right').style.opacity = '1';
            document.getElementById('check-right').classList.remove('hidden');
            document.getElementById('check-right').classList.add('flex');
            imagesToAnalyze[1] = base64;
            checkDeepAnalysisReady();
        }
    };
    reader.readAsDataURL(file);
}

function checkDeepAnalysisReady() {
    const btn = document.getElementById('btn-analyze-deep');
    if (imagesToAnalyze[0] && imagesToAnalyze[1]) {
        btn.disabled = false;
        btn.classList.remove('opacity-30', 'cursor-not-allowed');
        btn.classList.add('opacity-100', 'hover:bg-white', 'hover:shadow-lg');
    }
}

function startDeepAnalysis() {
    if (imagesToAnalyze[0] && imagesToAnalyze[1]) {
        startAnalysis();
    }
}

let loadingInterval;
function startAnalysis() {
    document.getElementById('upload-section').style.display = 'none';
    document.getElementById('loading-section').classList.remove('hidden');
    document.getElementById('loading-section').classList.add('flex');

    const loadingTextElement = document.getElementById('loading-text');
    loadingTextElement.innerHTML = i18n[currentLang].loading;

    // Use first image for preview
    document.getElementById('preview-image-result').src = imagesToAnalyze[0];

    analyzeWithBackend(imagesToAnalyze)
        .then(data => {
            showResults(data);
        })
        .catch(err => {
            alert(i18n[currentLang].err_msg + '\n' + err.message);
            resetApp();
        });
}

async function analyzeWithBackend(base64Array) {
    const imagesData = base64Array.map(img => img.split(',')[1]);
    let promptBase = i18n[currentLang].ai_prompt;
    if (base64Array.length === 2) {
        promptBase = promptBase.replace('제공된 손바닥 사진', '제공된 양손 사진(첫 번째: 왼손/선천, 두 번째: 오른손/후천)')
                               .replace('the palm lines', 'the lines of both palms (first: left/innate, second: right/future)')
                               .replace('提供された手相', '提供された両手の手相（1枚目:左手/先天、2枚目:右手/後天）');
    }

    const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            images: imagesData,
            prompt: promptBase
        })
    });

    if (!response.ok) {
        throw new Error('API Request Failed');
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    try {
        return JSON.parse(resultText);
    } catch (e) {
        throw new Error('Data parse error');
    }
}

function triggerDopamineEffect() {
    if (typeof confetti !== 'undefined') {
        const duration = 2000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: ['#ffffff', '#b0b0b0', '#888888']
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: ['#ffffff', '#b0b0b0', '#888888']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

function showResults(data) {
    document.getElementById('loading-section').classList.add('hidden');
    document.getElementById('loading-section').classList.remove('flex');
    document.getElementById('result-section').classList.remove('hidden');
    document.getElementById('result-section').classList.add('flex');

    triggerDopamineEffect();

    const resultTextEl = document.getElementById('result-text');
    resultTextEl.innerText = "";
    typeWriterEffect(resultTextEl, data.reading, 20);

    setTimeout(() => {
        document.getElementById('stat-vitality').style.width = `${data.vitality}%`;
        document.getElementById('stat-intelligence').style.width = `${data.intelligence}%`;
        document.getElementById('stat-charm').style.width = `${data.charm}%`;

        animateValue(document.getElementById('stat-vitality-val'), 0, data.vitality, 1200);
        animateValue(document.getElementById('stat-intelligence-val'), 0, data.intelligence, 1200);
        animateValue(document.getElementById('stat-charm-val'), 0, data.charm, 1200);
        
        setTimeout(() => {
            document.getElementById('deep-dive-section').classList.remove('hidden');
        }, 1500);
    }, 400);
}

async function analyzeDeepDive(topic) {
    const deepDiveResult = document.getElementById('deep-dive-result');
    deepDiveResult.classList.remove('hidden');
    deepDiveResult.innerHTML = `<span class="animate-pulse text-brand-400 text-[13px]">${i18n[currentLang].loading}...</span>`;

    const imagesData = imagesToAnalyze.map(img => img.split(',')[1]);
    
    let topicName = '';
    if (currentLang === 'ko') {
        if (topic === 'career') topicName = '사업/직업운 (운명선, 사업선 중심)';
        else if (topic === 'wealth') topicName = '금전운 (재물선, 태양선 중심)';
        else if (topic === 'love') topicName = '연애/결혼운 (결혼선, 감정선 중심)';
    } else if (currentLang === 'en') {
        if (topic === 'career') topicName = 'Career & Work (Fate line)';
        else if (topic === 'wealth') topicName = 'Wealth & Finance (Sun line)';
        else if (topic === 'love') topicName = 'Love & Marriage (Heart line, Marriage line)';
    } else {
        if (topic === 'career') topicName = '仕事・事業運 (運命線・太陽線)';
        else if (topic === 'wealth') topicName = '金運 (財運線・太陽線)';
        else if (topic === 'love') topicName = '恋愛・結婚運 (結婚線・感情線)';
    }

    let prompt = `당신은 현대적이고 세련된 데이터 기반 분석가입니다. 방금 제공된 손바닥 사진을 다시 보고, 이번에는 오직 [${topicName}]에 대해서만 집중적으로 1~2단락으로 심층 분석해주세요. 순수 텍스트 문자열(에세이 형태)만 그대로 출력하세요. 마크다운 기호 금지. 답변은 한국어로 하세요.`;
    
    if (currentLang === 'en') {
        prompt = `You are a modern data-driven analyst. Focus ONLY on [${topicName}] based on the provided image(s). Write 1-2 paragraphs of elegant essay. Plain text only, no markdown. Respond in English.`;
    } else if (currentLang === 'ja') {
        prompt = `あなたは洗練されたアナリストです。提供された画像を基に、[${topicName}]についてのみ集中的に1〜2段落で深く分析してください。純粋なテキストのみを出力し、マークダウンは禁止です。日本語で答えてください。`;
    }

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                images: imagesData,
                prompt: prompt
            })
        });

        if (!response.ok) throw new Error('API Request Failed');
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        deepDiveResult.innerText = '';
        typeWriterEffect(deepDiveResult, text, 20);
    } catch (err) {
        deepDiveResult.innerText = i18n[currentLang].err_msg;
    }
}

function typeWriterEffect(element, text, speed) {
    let i = 0;
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '');
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
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('flex');
    document.getElementById('upload-section').style.display = 'flex';
    
    document.getElementById('stat-vitality').style.width = '0%';
    document.getElementById('stat-intelligence').style.width = '0%';
    document.getElementById('stat-charm').style.width = '0%';
    document.getElementById('stat-vitality-val').innerText = '0';
    document.getElementById('stat-intelligence-val').innerText = '0';
    document.getElementById('stat-charm-val').innerText = '0';
    document.getElementById('result-text').innerHTML = '';
    
    document.getElementById('deep-dive-section').classList.add('hidden');
    document.getElementById('deep-dive-result').classList.add('hidden');
    document.getElementById('deep-dive-result').innerText = '';
    
    document.getElementById('camera-input-quick').value = '';
    document.getElementById('camera-input-left').value = '';
    document.getElementById('camera-input-right').value = '';
    setMode(currentMode); // reset visuals
}

window.addEventListener('DOMContentLoaded', () => {
    initLang();
    setMode('quick');
});
