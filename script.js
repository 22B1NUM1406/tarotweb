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
let pageHistory = ['home'];

// Update User UI Function
function updateUserUI(userData) {
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    
    if (userInfo && userName && userAvatar) {
        userInfo.classList.remove('hidden');
        userName.textContent = userData.name;
        
        if (userData.photoURL) {
            userAvatar.innerHTML = `<img src="${userData.photoURL}" alt="User" style="width: 24px; height: 24px; border-radius: 50%;">`;
        } else {
            userAvatar.textContent = '👤';
        }
        
        // Update other pages
        document.querySelectorAll('#user-name-topics, #user-name-tarot, #user-name-result').forEach(el => {
            el.textContent = userData.name;
        });
        
        document.querySelectorAll('#user-avatar-topics, #user-avatar-tarot, #user-avatar-result').forEach(el => {
            if (userData.photoURL) {
                el.innerHTML = `<img src="${userData.photoURL}" alt="User" style="width: 24px; height: 24px; border-radius: 50%;">`;
            } else {
                el.textContent = '👤';
            }
        });
    }
}

// Page Navigation Functions
function showPage(pageId) {
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
    
    updateBackButton();
}

function goBack() {
    if (pageHistory.length > 1) {
        pageHistory.pop();
        const previousPage = pageHistory[pageHistory.length - 1];
        
        document.getElementById('home-page').classList.add('hidden');
        document.getElementById('birthdate-page').classList.add('hidden');
        document.getElementById('topics-page').classList.add('hidden');
        document.getElementById('tarot-page').classList.add('hidden');
        document.getElementById('result-page').classList.add('hidden');
        
        document.getElementById(previousPage).classList.remove('hidden');
        currentPage = previousPage;
        
        updateBackButton();
        playSound('card');
    }
}

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
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }

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
        console.log('🔵 Login процесс эхэллээ...');
        document.getElementById('loading').classList.remove('hidden');
        
        const provider = new firebase.auth.FacebookAuthProvider();
        // provider.addScope('email'); // ← Энэ мөрийг УСТГАХ эсвэл comment хийх
        provider.addScope('public_profile');
        
        console.log('🔵 Firebase popup нээгдэж байна...');
        const result = await firebase.auth().signInWithPopup(provider);
        
        console.log('✅ Login амжилттай:', result.user);
        
        const userData = {
            name: result.user.displayName || 'Таротын хэрэглэгч',
            email: result.user.email || '',
            photoURL: result.user.photoURL || '',
            uid: result.user.uid
        };
        
        user = userData;
        localStorage.setItem('tarotUser', JSON.stringify(userData));
        
        updateUserUI(userData);
        showPage('birthdate-page');
        playSound('success');
        
    } catch (error) {
        console.error('❌ Login алдаа:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        let errorMessage = 'Нэвтрэхэд алдаа гарлаа';
        
        switch(error.code) {
            case 'auth/popup-closed-by-user':
                errorMessage = 'Нэвтрэх цонхыг хаасан байна. Дахин оролдоно уу.';
                break;
            case 'auth/popup-blocked':
                errorMessage = 'Popup блоклогдсон байна. Browser тохиргооноос popup зөвшөөрнө үү.';
                break;
            case 'auth/account-exists-with-different-credential':
                errorMessage = 'Энэ и-мэйлээр өөр нэвтрэх аргаар бүртгэлтэй байна.';
                break;
            case 'auth/unauthorized-domain':
                errorMessage = 'Энэ domain Firebase-д authorized биш байна. Firebase Console дээр domain нэмнэ үү.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Facebook login идэвхжээгүй байна. Firebase Console дээр идэвхжүүлнэ үү.';
                break;
            case 'auth/invalid-api-key':
                errorMessage = 'Firebase API key буруу байна.';
                break;
            default:
                errorMessage = `Алдаа: ${error.message}`;
        }
        
        alert(errorMessage);
        
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
}
// Sound effects
function playSound(type) {
    if (type === 'success' || type === 'card') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'success') {
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioContext.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        } else {
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    }
}

// Submit Birth Date
function submitBirthDate() {
    const birthDateInput = document.getElementById('birthdate-input').value;
    
    if (birthDateInput) {
        birthDate = birthDateInput;
        
        // Load user from localStorage if not already loaded
        if (!user) {
            const savedUser = localStorage.getItem('tarotUser');
            if (savedUser) {
                user = JSON.parse(savedUser);
                updateUserUI(user);
            }
        }
        
        showPage('topics-page');
        playSound('success');
    } else {
        alert('Төрсөн өдрөө оруулна уу');
    }
}

// Select Topic
function selectTopic(topic) {
    selectedTopic = topic;
    document.getElementById('loading').classList.remove('hidden');
    
    setTimeout(() => {
        generateTarotCards();
        document.getElementById('loading').classList.add('hidden');
        showPage('tarot-page');
        playSound('success');
    }, 1000);
}

// Generate Tarot Cards
function generateTarotCards() {
    const container = document.getElementById('tarot-cards-container');
    container.innerHTML = '';
    
    const shuffledCards = [...tarotCards].sort(() => Math.random() - 0.5);
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
        
        cardElement.onclick = () => selectTarotCard(card.id, cardElement);
        container.appendChild(cardElement);
    });
    
    selectedCards = [];
    updateSelectedCount();
}

function selectTarotCard(cardId, cardElement) {
    if (selectedCards.length < 3 && !selectedCards.includes(cardId)) {
        playSound('card');
        selectedCards.push(cardId);
        cardElement.classList.add('flipped');
        cardElement.classList.add('selected');
        updateSelectedCount();
        
        if (selectedCards.length === 3) {
            setTimeout(showResults, 1500);
        }
    }
}

function resetSelection() {
    selectedCards = [];
    document.querySelectorAll('.tarot-card').forEach(card => {
        card.classList.remove('flipped');
        card.classList.remove('selected');
    });
    updateSelectedCount();
}

function updateSelectedCount() {
    const selectedCountElement = document.getElementById('selected-count');
    if (selectedCountElement) {
        selectedCountElement.textContent = `Сонгосон: ${selectedCards.length}/3`;
        selectedCountElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            selectedCountElement.style.transform = 'scale(1)';
        }, 300);
    }
}

function showResults() {
    document.getElementById('loading').classList.remove('hidden');
    
    setTimeout(() => {
        generateResultCards();
        document.getElementById('loading').classList.add('hidden');
        showPage('result-page');
        playSound('success');
    }, 1000);
}

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

function resetReading() {
    document.getElementById('loading').classList.remove('hidden');
    
    setTimeout(() => {
        selectedCards = [];
        selectedTopic = '';
        document.getElementById('loading').classList.add('hidden');
        showPage('topics-page');
        playSound('success');
    }, 1000);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || (event.ctrlKey && event.key === 'z')) {
        goBack();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('birthdate-input').value = today;
    birthDate = today;
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('tarotUser');
    if (savedUser) {
        user = JSON.parse(savedUser);
        updateUserUI(user);
    }
    
    initVisualEffects();
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        showPage('home-page');
    }, 2000);
});