const cardsArray = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
];

let flippedCards = [];
let matchedCards = [];
let allCards = [];
let gameWon = false;
let timerInterval;
let timeLeft = 30;

const cardsContainer = document.getElementById('cards-container');
const congratsMessage = document.getElementById('congrats-message');
const loseMessage = document.getElementById('lose-message');
const timer = document.getElementById('timer');

// Shuffle the cards
function shuffle(cards) {
    return cards.sort(() => Math.random() - 0.5);
}

// Initialize the game
function initializeGame() {
    const shuffledCards = shuffle(cardsArray);
    shuffledCards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', handleCardClick);
        cardsContainer.appendChild(card);
        allCards.push(card);
    });

    startTimer();
}

// Handle card click
function handleCardClick(event) {
    if (gameWon || flippedCards.length === 2 || event.target.classList.contains('flipped') || matchedCards.includes(event.target)) return;

    const card = event.target;
    card.classList.add('flipped');
    card.textContent = card.getAttribute('data-value');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check if two flipped cards match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchedCards.push(firstCard, secondCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        
        // Adding green effect for matched cards
        setTimeout(() => {
            firstCard.style.backgroundColor = 'green';
            secondCard.style.backgroundColor = 'green';
        }, 500);

        // Check if all cards are matched
        if (matchedCards.length === allCards.length) {
            gameWon = true;
            clearInterval(timerInterval);
            congratsMessage.style.display = 'block'; // Show congratulations message
            setTimeout(() => {
                resetGame();
            }, 2000); // Reset the game after 2 seconds
        }

        flippedCards = [];
    } else {
        // Adding red effect for mismatched cards
        setTimeout(() => {
            firstCard.style.backgroundColor = 'red';
            secondCard.style.backgroundColor = 'red';
        }, 500);

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            firstCard.style.backgroundColor = ''; // Reset background color
            secondCard.style.backgroundColor = ''; // Reset background color
            flippedCards = [];
        }, 1000);
    }
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = `${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            loseMessage.style.display = 'block'; // Show lose message
            setTimeout(() => {
                resetGame();
            }, 2000); // Reset the game after 2 seconds
        }
    }, 1000);
}

// Reset the game
function resetGame() {
    flippedCards = [];
    matchedCards = [];
    allCards = [];
    gameWon = false;
    timeLeft = 30;
    timer.textContent = `${timeLeft}s`;
    loseMessage.style.display = 'none';
    congratsMessage.style.display = 'none';

    // Clear and reset cards
    cardsContainer.innerHTML = '';
    initializeGame();
}

// Start the game
initializeGame();
