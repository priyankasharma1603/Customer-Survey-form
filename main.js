let currentQuestion = 0;
let answers = [];
const questions = [
    { text: "How satisfied are you with our products?", type: "rating", max: 5 },
    { text: "How fair are the prices compared to similar retailers?", type: "rating", max: 5 },
    { text: "How satisfied are you with the value for money of your purchase?", type: "rating", max: 5 },
    { text: "On a scale of 1-10 how would you recommend us to your friends and family?", type: "rating", max: 10 },
    { text: "What could we do to improve our service?", type: "text" }
];

function startSurvey() {
    document.getElementById("welcome-screen").style.display = "block";
    document.getElementById("startbtn").style.display = "none";
    document.getElementById("survey-screen").style.display = "block";
    showQuestion();
}

function showQuestion() {
    const questionNumber = document.getElementById("question-number");
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");

    questionNumber.textContent = `${currentQuestion + 1}/${questions.length}`;
    questionText.textContent = questions[currentQuestion].text;

    if (questions[currentQuestion].type === "rating") {
        optionsContainer.innerHTML = generateRatingOptions();
    } else if (questions[currentQuestion].type === "text") {
        optionsContainer.innerHTML = generateTextInput();
    }
}

function generateRatingOptions() {
    let optionsHTML = "";
    const maxRating = questions[currentQuestion].max;

    for (let i = 1; i <= maxRating; i++) {
        optionsHTML += `<label><input type="radio" name="rating" value="${i}">${i}</label>`;
    }

    return optionsHTML;
}

function generateTextInput() {
    return '<textarea rows="4" cols="50" id="text-answer"></textarea>';
}

function prevQuestion() {
    if (currentQuestion > 0) {
        saveAnswer();
        currentQuestion--;
        showQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        saveAnswer();
        currentQuestion++;
        showQuestion();
    } else {
        showConfirmation();
    }
}

function skipQuestion() {
    if (currentQuestion < questions.length - 1) {
        saveAnswer();
        currentQuestion++;
        showQuestion();
    } else {
        showConfirmation();
    }
}

function saveAnswer() {
    const answer = questions[currentQuestion].type === "text"
        ? document.getElementById("text-answer").value
        : document.querySelector('input[name="rating"]:checked').value;

    answers.push({
        questionId: currentQuestion + 1,
        answer: answer
    });
}

function showConfirmation() {
    document.getElementById("survey-screen").style.display = "none";
    document.getElementById("confirmation-screen").style.display = "block";
    // You can add logic here to save the answers to the database or local storage
}

// Redirect to the welcome screen after 5 seconds
setTimeout(() => {
    document.getElementById("confirmation-screen").style.display = "none";
    document.getElementById("welcome-screen").style.display = "block";
}, 5000);