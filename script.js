import questions from './questions.js';
document.addEventListener('DOMContentLoaded', () => {
    const spnQtd = document.querySelector('.spnQtd');
    const questionContainer = document.querySelector('.question');
    const answersContainer = document.querySelector('.answers');
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Reiniciar';
    
    let correctAnswers = 0;
    let currentQuestionIndex = 0;
    let shuffledQuestions;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function showQuestion() {
        if (currentQuestionIndex < shuffledQuestions.length) {
            const question = shuffledQuestions[currentQuestionIndex];
            questionContainer.textContent = question.question;
            answersContainer.innerHTML = '';

            question.answers.forEach(answer => {
                const option = document.createElement('button');
                option.textContent = answer.option;
                option.addEventListener('click', () => {
                    if (answer.correct) {
                        correctAnswers++;
                    }
                    currentQuestionIndex++;
                    showQuestion();
                });
                answersContainer.appendChild(option);
            });
        } else {
            spnQtd.textContent = `Você acertou ${correctAnswers} de ${shuffledQuestions.length} perguntas.`;
            answersContainer.innerHTML = '';
            restartButton.addEventListener('click', () => {
                // Reiniciar o quiz
                correctAnswers = 0;
                currentQuestionIndex = 0;
                shuffledQuestions = shuffleArray(questions.slice());
                showQuestion(); // Exibe a primeira pergunta
                spnQtd.textContent = ''; // Limpa o texto de acertos
            });
            answersContainer.appendChild(restartButton);
        }
    }

    shuffledQuestions = shuffleArray(questions.slice());

    // Chamada inicial da função
    showQuestion();
});
