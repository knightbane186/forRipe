const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');


// // fetch('https://super-awesome-quiz.vercel.app/api/questions')
// this is not working 
fetch('https://super-awesome-quiz.vercel.app/questions')
    .then(response => response.json())
    .then(data => {
        // Accessing the nested questions array
        data.sections.forEach(section => {
            section.questions.forEach(question => {
                const questionDiv = document.createElement('div');
                questionDiv.innerHTML = `
                    <h2>${question.question_text}</h2>
                    ${question.answer_options.map(option => `
                        <label>
                            <input type="radio" name="${question.id}" value="${option.id}">
                            ${option.text}
                        </label>
                    `).join('<br>')}
                `;
                quizContainer.appendChild(questionDiv);
            });
        });
    })
    .catch(error => {
        quizContainer.innerHTML = "Error loading questions. Please try again later.";
    });





// Handle form submission and score calculation, I can add additioinal features here if needed but I think this will suffice. 
submitBtn.addEventListener('click', function() {
    const quizForm = document.getElementById('quiz-form');
    const formData = new FormData(quizForm);   
    const answers = [];
    
    formData.forEach((value, key) => {
        answers.push({
            id: key,
            answer: value
        });
    });
//this  bit will basically send the data and check the response match 
    fetch('https://super-awesome-quiz.vercel.app/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.score !== undefined) {
            alert(`Your score is: ${data.score}`);
        } else {
            alert('Error calculating score. Please try again.');
        }
    })
    .catch(error => {
        alert('Server error. Please try again later.');
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('toggle-dark-mode');

darkModeToggle.addEventListener('click', function() {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        darkModeToggle.innerText = 'Toggle Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerText = 'Toggle Light Mode';
    }
});
