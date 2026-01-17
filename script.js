  // Tarot Data with symbols and colors
const tarotCards = [
    { id: 0, name: 'The Fool', mongolian: 'Тэнэг', meaning: 'Шинэ эхлэл, боломж, итгэл', symbol: '♈', color: '#FFD700' },
    { id: 1, name: 'The Magician', mongolian: 'Илбэчин', meaning: 'Манифестаци, хүч чадал, шилжилт', symbol: '♊', color: '#4B0082' },
    { id: 2, name: 'The High Priestess', mongolian: 'Тахилч эм', meaning: 'Зөн совин, нууц мэдлэг, дотоод мэдрэмж', symbol: '☾', color: '#0000CD' },
    { id: 3, name: 'The Empress', mongolian: 'Хатан хаан', meaning: 'Үржил шим, бүтээлч байдал, байгаль', symbol: '♋', color: '#32CD32' },
    { id: 4, name: 'The Emperor', mongolian: 'Эзэн хаан', meaning: 'Эрх мэдэл, бүтэц, удирдлага', symbol: '♌', color: '#DC143C' },
    { id: 5, name: 'The Hierophant', mongolian: 'Лам', meaning: 'Уламжлал, сургаал, зөвлөгөө', symbol: '♍', color: '#8B4513' },
    { id: 6, name: 'The Lovers', mongolian: 'Хайрлагчид', meaning: 'Хайр, харилцаа, сонголт', symbol: '♎', color: '#FF69B4' },
    { id: 7, name: 'The Chariot', mongolian: 'Тэрэг', meaning: 'Хяналт, амжилт, зорилго', symbol: '♏', color: '#2E8B57' },
    { id: 8, name: 'Strength', mongolian: 'Хүч', meaning: 'Хүч чадал, зоригт байдал, тэвчээр', symbol: '♐', color: '#FF8C00' },
    { id: 9, name: 'The Hermit', mongolian: 'Ганцаарчин', meaning: 'Дотогшоо харалт, мэргэн ухаан', symbol: '♑', color: '#708090' },
    { id: 10, name: 'Wheel of Fortune', mongolian: 'Азын хүрд', meaning: 'Азын эргэлт, өөрчлөлт', symbol: '♒', color: '#FF4500' },
    { id: 11, name: 'Justice', mongolian: 'Шударга ёс', meaning: 'Шударга ёс, үнэн, хариуцлага', symbol: '♓', color: '#4169E1' },
    { id: 12, name: 'The Hanged Man', mongolian: 'Дүүжлэгдсэн', meaning: 'Өөр өнцгөөс харах', symbol: '⏳', color: '#8A2BE2' },
    { id: 13, name: 'Death', mongolian: 'Үхэл', meaning: 'Өөрчлөлт, төгсгөл, шинэчлэгдэх', symbol: '💀', color: '#000000' },
    { id: 14, name: 'Temperance', mongolian: 'Даруу байдал', meaning: 'Тэнцвэр, зохицуулалт', symbol: '⚖️', color: '#00CED1' },
    { id: 15, name: 'The Devil', mongolian: 'Чөтгөр', meaning: 'Хязгаарлалт, хараат байдал', symbol: '😈', color: '#800000' },
    { id: 16, name: 'The Tower', mongolian: 'Цамхаг', meaning: 'Гэнэтийн өөрчлөлт, устгал', symbol: '⚡', color: '#FF0000' },
    { id: 17, name: 'The Star', mongolian: 'Од', meaning: 'Найдвар, урам зориг', symbol: '⭐', color: '#87CEEB' },
    { id: 18, name: 'The Moon', mongolian: 'Сар', meaning: 'Сэтгэл санаа, айдас, төөрөгдөл', symbol: '🌙', color: '#C0C0C0' },
    { id: 19, name: 'The Sun', mongolian: 'Нар', meaning: 'Баяр баясгалан, амжилт', symbol: '☀️', color: '#FFD700' },
    { id: 20, name: 'Judgement', mongolian: 'Шүүлт', meaning: 'Дахин төрөлт, дуудлага', symbol: '📯', color: '#9370DB' },
    { id: 21, name: 'The World', mongolian: 'Дэлхий', meaning: 'Дуусгал, бүрэн байдал, амжилт', symbol: '🌍', color: '#228B22' }
];

// App State
let currentPage = 'home';
let user = null;
let birthDate = '';
let selectedTopic = '';
let selectedCards = [];
let pageHistory = ['home']; // Шинэ: дэлгэцний түүх

// Page Navigation Functions
function showPage(pageId) {
    // Дэлгэцний түүхэд нэмэх
    pageHistory.push(pageId);
    
    // Hide all pages
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('birthdate-page').classList.add('hidden');
    document.getElementById('topics-page').classList.add('hidden');
    document.getElementById('tarot-page').classList.add('hidden');
    document.getElementById('result-page').classList.add('hidden');
    
    // Show the requested page
    document.getElementById(pageId).classList.remove('hidden');
    currentPage = pageId;
    
    // Буцах товч шинэчлэх
    updateBackButton();
}

// Буцах функц
function goBack() {
    if (pageHistory.length > 1) {
        // Одоогийн дэлгэцийг түүхээс хасах
        pageHistory.pop();
        
        // Өмнөх дэлгэц рүү буцах
        const previousPage = pageHistory[pageHistory.length - 1];
        
        // Бүх дэлгэцийг нуух
        document.getElementById('home-page').classList.add('hidden');
        document.getElementById('birthdate-page').classList.add('hidden');
        document.getElementById('topics-page').classList.add('hidden');
        document.getElementById('tarot-page').classList.add('hidden');
        document.getElementById('result-page').classList.add('hidden');
        
        // Өмнөх дэлгэцийг харуулах
        document.getElementById(previousPage).classList.remove('hidden');
        currentPage = previousPage;
        
        // Буцах товч шинэчлэх
        updateBackButton();
        
        // Дуу тоглуулах
        playSound('card');
    }
}

// Буцах товчны харагдах байдлыг шинэчлэх
function updateBackButton() {
    const backButton = document.getElementById('global-back-button');
    if (backButton) {
        if (pageHistory.length > 1 && currentPage !== 'home') {
            backButton.classList.remove('hidden');
        } else {
            backButton.classList.add('hidden');
        }
    }
}

// Initialize Visual Effects
function initVisualEffects() {
    // Create particles
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }

    // Create stars
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}

// Login Function
async function login() {
    try {
        document.getElementById('loading').classList.remove('hidden');
        
        const provider = new firebase.auth.FacebookAuthProvider();
        
        // GitHub Pages дээр popup ашиглах
        provider.setCustomParameters({
            'display': 'popup'
        });
        
        // Popup нээх
        const result = await firebase.auth().signInWithPopup(provider);
        
        // Хэрэглэгчийн мэдээлэл
        const user = result.user;
        const userData = {
            name: user.displayName || 'Таротын хэрэглэгч',
            email: user.email || '',
            photoURL: user.photoURL || '',
            uid: user.uid
        };
        
        // LocalStorage дээр хадгалах
        localStorage.setItem('tarotUser', JSON.stringify(userData));
        
        // UI шинэчлэх
        updateUserUI(userData);
        
        // Дараагийн хуудас руу шилжих
        showPage('birthdate-page');
        
        playSound('success');
        
    } catch (error) {
        console.error('Login алдаа:', error);
        
        let errorMessage = 'Нэвтрэхэд алдаа гарлаа';
        
        if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Нэвтрэх цонхыг хаасан байна';
        } else if (error.code === 'auth/account-exists-with-different-credential') {
            errorMessage = 'Энэ и-мэйлээр өөр нэвтрэх аргаар бүртгэлтэй байна';
        } else if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Popup блоклогдсон. Popup блоклохыг зогсооно уу';
        } else if (error.code === 'auth/unauthorized-domain') {
            errorMessage = 'Энэ домэйн дээр нэвтрэх эрхгүй байна. Домэйн тохируулна уу.';
        }
        
        alert(errorMessage);
        
        // Алдааны мэдээлэл харуулах
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
        `;
        errorDiv.innerHTML = `
            <h3>Login Алдаа</h3>
            <p>${errorMessage}</p>
            <p><small>Код: ${error.code}</small></p>
            <button onclick="this.parentElement.remove()">Хаах</button>
        `;
        document.body.appendChild(errorDiv);
        
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
}

// Sound effects
function playSound(type) {
    if (type === 'success') {
        // Create a magical sound effect
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioContext.currentTime + 0.5); // C6
                
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'card') {
        // Card flip sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
                
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// Submit Birth Date
function submitBirthDate() {
    const birthDateInput = document.getElementById('birthdate-input').value;
    
    if (birthDateInput) {
        birthDate = birthDateInput;
        
        // Update user info in topics page
        document.getElementById('user-name-topics').textContent = user.name;
        
        // Go to topics page
        showPage('topics-page');
        
        playSound('success');
    } else {
        alert('Төрсөн өдрөө оруулна уу');
    }
}

// Select Topic
function selectTopic(topic) {
    selectedTopic = topic;
    
    // Show loading
    document.getElementById('loading').classList.remove('hidden');
    
    setTimeout(() => {
        // Update user info in tarot page
        document.getElementById('user-name-tarot').textContent = user.name;
        
        // Generate tarot cards
        generateTarotCards();
        
        // Hide loading
        document.getElementById('loading').classList.add('hidden');
        
        // Go to tarot page
        showPage('tarot-page');
        
        playSound('success');
    }, 1000);
}

// Generate Tarot Cards
function generateTarotCards() {
    const container = document.getElementById('tarot-cards-container');
    container.innerHTML = '';
    
    // Shuffle tarot cards
    const shuffledCards = [...tarotCards].sort(() => Math.random() - 0.5);
    
    // Take first 22 cards for display
    const cardsToShow = shuffledCards.slice(0, 22);
    
    cardsToShow.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'tarot-card';
        cardElement.dataset.id = card.id;
        cardElement.style.animationDelay = `${index * 0.1}s`;
        
        cardElement.innerHTML = `
            <div class="tarot-card-inner">
                <div class="tarot-card-front">
                    <div class="tarot-symbol">${card.symbol}</div>
                    <div style="color: ${card.color}; font-family: 'Cinzel', serif; font-size: 0.8rem; margin-top: 0.5rem;">Tarot</div>
                </div>
                <div class="tarot-card-back" style="background: linear-gradient(45deg, #1a0b2e, ${card.color}33);">
                    <div class="tarot-symbol">${card.symbol}</div>
                    <div class="tarot-name">${card.mongolian}</div>
                    <div class="tarot-meaning">${card.meaning}</div>
                </div>
            </div>
            <div class="tarot-glow"></div>
        `;
        
        // Add click event
        cardElement.onclick = () => selectTarotCard(card.id, cardElement);
        
        container.appendChild(cardElement);
    });
    
    // Reset selection
    selectedCards = [];
    updateSelectedCount();
}

// Select Tarot Card
function selectTarotCard(cardId, cardElement) {
    if (selectedCards.length < 3 && !selectedCards.includes(cardId)) {
        // Play card sound
        playSound('card');
        
        selectedCards.push(cardId);
        
        // Add flip animation
        cardElement.classList.add('flipped');
        cardElement.classList.add('selected');
        
        updateSelectedCount();
        
        // If 3 cards selected, show results after delay
        if (selectedCards.length === 3) {
            setTimeout(showResults, 1500);
        }
    }
}

// Reset Card Selection
function resetSelection() {
    selectedCards = [];
    const cardElements = document.querySelectorAll('.tarot-card');
    cardElements.forEach(card => {
        card.classList.remove('flipped');
        card.classList.remove('selected');
    });
    updateSelectedCount();
}

// Update Selected Count
function updateSelectedCount() {
    const selectedCountElement = document.getElementById('selected-count');
    if (selectedCountElement) {
        selectedCountElement.textContent = `Сонгосон: ${selectedCards.length}/3`;
        
        // Add animation
        selectedCountElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            selectedCountElement.style.transform = 'scale(1)';
        }, 300);
    }
}

// Show Results
function showResults() {
    // Show loading
    document.getElementById('loading').classList.remove('hidden');
    
    setTimeout(() => {
        // Update user info in result page
        document.getElementById('user-name-result').textContent = user.name;
        
        // Generate result cards
        generateResultCards();
        
        // Hide loading
        document.getElementById('loading').classList.add('hidden');
        
        // Go to result page
        showPage('result-page');
        
        // Play celebration sound
        playSound('success');
    }, 1000);
}

// Generate Result Cards
function generateResultCards() {
    const container = document.getElementById('result-cards-container');
    container.innerHTML = '';
    
    const positions = ['Өнгөрсөн', 'Одоо', 'Ирээдүй'];
    
    selectedCards.forEach((cardId, index) => {
        const card = tarotCards.find(c => c.id === cardId);
        
        const cardElement = document.createElement('div');
        cardElement.className = 'card result-card';
        cardElement.style.animationDelay = `${index * 0.3}s`;
        
        cardElement.innerHTML = `
            <div class="text-center mb-4">
                <span class="result-position">${positions[index]}</span>
            </div>
            <div class="result-image">
                <div class="tarot-symbol" style="font-size: 3rem;">${card.symbol}</div>
            </div>
            <h3 class="result-title">${card.mongolian}</h3>
            <p class="result-meaning">${card.meaning}</p>
        `;
        
        container.appendChild(cardElement);
    });
}

// Reset Reading
function resetReading() {
    // Show loading
    document.getElementById('loading').classList.remove('hidden');
    
    setTimeout(() => {
        selectedCards = [];
        selectedTopic = '';
        
        // Update user info in topics page
        document.getElementById('user-name-topics').textContent = user.name;
        
        // Hide loading
        document.getElementById('loading').classList.add('hidden');
        
        // Go to topics page
        showPage('topics-page');
        
        playSound('success');
    }, 1000);
}

// Keyboard support for back navigation (optional)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || (event.ctrlKey && event.key === 'z')) {
        goBack();
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default for birthdate input
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('birthdate-input').value = today;
    birthDate = today;
    
    // Initialize visual effects
    initVisualEffects();
    
    // Initialize with home page
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        showPage('home-page');
    }, 2000);
});