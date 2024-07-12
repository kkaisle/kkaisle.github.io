const intelligenceLevel = document.getElementById('intelligence-level');
const strengthLevel = document.getElementById('strength-level');
const increaseIntelligenceButton = document.getElementById('increase-intelligence');
const increaseStrengthButton = document.getElementById('increase-strength');

async function fetchUserId() {
    try {
        const response = await fetch('http://10.0.0.42:8080/api/users/generate-id');
        const data = await response.json();
        localStorage.setItem('userId', data.userId);
        return data.userId;
    } catch (error) {
        console.error('Error generating user ID:', error);
        return null;
    }
}

async function fetchLevels() {
    try {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = await fetchUserId();
        }

        const response = await fetch(`http://10.0.0.42:8080/api/users/levels?userId=${userId}`);
        const data = await response.json();
        intelligenceLevel.textContent = data.intelligence;
        strengthLevel.textContent = data.strength;
    } catch (error) {
        console.error('Error fetching levels:', error);
    }
}

async function increaseLevel(type) {
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://10.0.0.42:8080/api/users/increase-${type}?userId=${userId}`, {
            method: 'POST'
        });
        const data = await response.json();
        if (type === 'intelligence') {
            intelligenceLevel.textContent = data.intelligence;
        } else if (type === 'strength') {
            strengthLevel.textContent = data.strength;
        }
    } catch (error) {
        console.error(`Error increasing ${type} level:`, error);
    }
}

increaseIntelligenceButton.addEventListener('click', () => increaseLevel('intelligence'));
increaseStrengthButton.addEventListener('click', () => increaseLevel('strength'));

fetchLevels();
