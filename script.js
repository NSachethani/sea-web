const quizQuestions = [
    {
        question: "What percentage of Earth's oxygen comes from the ocean?",
        options: ["25%", "50%", "75%", "10%"],
        correct: 1
    },
    {
        question: "Which is the largest animal in the ocean?",
        options: ["Great White Shark", "Blue Whale", "Giant Squid", "Orca"],
        correct: 1
    },
    {
        question: "How much of Earth's surface is covered by ocean?",
        options: ["51%", "61%", "71%", "81%"],
        correct: 2
    },
    {
        question: "Which zone has no sunlight at all?",
        options: ["Sunlight Zone", "Twilight Zone", "Midnight Zone", "Abyssal Zone"],
        correct: 2
    },
    {
        question: "What is the process by which ocean plants produce oxygen?",
        options: ["Respiration", "Photosynthesis", "Decomposition", "Evaporation"],
        correct: 1
    },
    {
        question: "Which creature has three hearts?",
        options: ["Shark", "Octopus", "Dolphin", "Sea Turtle"],
        correct: 1
    },
    {
        question: "What percentage of marine life is still undiscovered?",
        options: ["50%", "60%", "80%", "90%"],
        correct: 2
    },
    {
        question: "Which ocean zone is also called the 'bathypelagic zone'?",
        options: ["Sunlight Zone", "Twilight Zone", "Midnight Zone", "Abyssal Zone"],
        correct: 2
    }
];

let currentQuestion = 0;
let answered = false;

function init() {
    setupMobileMenu();
    setupQuiz();
    setupScrollAnimations();
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

function setupQuiz() {
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (answered) return;
            
            answered = true;
            const isCorrect = option.dataset.correct === "true";
            
            if (isCorrect) {
                option.classList.add('correct');
                document.getElementById('result').textContent = "Correct! Great job! 🌊";
                document.getElementById('result').style.color = "#4ade80";
            } else {
                option.classList.add('wrong');
                const correctOption = document.querySelector('.quiz-option[data-correct="true"]');
                correctOption.classList.add('correct');
                document.getElementById('result').textContent = `Wrong! The correct answer is: ${quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correct]}`;
                document.getElementById('result').style.color = "#ff6b6b";
            }
            
            setTimeout(() => {
                nextQuestion();
            }, 2000);
        });
    });
}

function nextQuestion() {
    currentQuestion = (currentQuestion + 1) % quizQuestions.length;
    answered = false;
    
    const question = quizQuestions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = question.options.map((option, index) => 
        `<button class="quiz-option" data-correct="${index === question.correct}">${option}</button>`
    ).join('');
    
    document.getElementById('result').textContent = '';
    
    setupQuiz();
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.zone-card, .creature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', init);
