function displayQuiz() {
    const questions = [
        {
            question: "You're thinking about volunteering for the first time. What excites you most?",
            choices: ["Helping people in need and making a real difference.", "Trying something new and meeting new people."],
            weights: [
                {social: +1, yapper: 0 }, // Weight for first choice
                {social: +0, yapper:1 }, // Weight for second choice
            ]
        },
        {
            question: "You're looking at different volunteer opportunities on Google. What appeals to you most?",
            choices: ["A one-time event where you can make an immediate impact.", "A long-term commitment where you can build relationships."],
            weights: [
                {fixer: +1, longterm: 0 }, // Weight for first choice
                {ixer: +0, longterm: 1  } // Weight for second choice
            ]
        },
        {
            question: "There's so many different opportunities available! But hmm... what motivates you most when considering a volunteer opportunity?",
            choices: ["The opportunity to make a tangible difference in the community.", "The chance to gain new experiences and meet new people."],
            weights: [
                {tutor: +1, yapper: 0 } , // Weight for first choice
                {tutor: +0, yapper: 1 } , // Weight for second choice
            ]
        },
        {
            question: "You realize that you can support a cause not only with your time, but also with your financial resources. Would you rather:",
            choices: ["Donate to a cause you believe in.", "Volunteer your time directly."],
            weights: [
                {fixer: +1, longterm: 0} , // Weight for first choice
                {fixer: +0, longterm: 1 }, // Weight for second choice
            ]
        },
        {
            question: "You asked a friend of yours to join you in your volunteering journey! He / she suggested to go for a sharing outreach event",
            choices: ["Sure! That sounds like fun!", "Nah.. I'm not comfortable around big groups of people yet!"],
            weights: [
                {yapper: +1, fixer: 0} , // Weight for first choice
                {yapper: +0, fixer: 1} , // Weight for second choice
            ]
        },
        {
            question:"You find something you're interested in! But it's a volunteering opportunity requires a lot of time and effort. Do you:",
            choices: ["Feel challenged and excited to take it on.", "Feel overwhelmed and look for something less demanding."],
            weights: [
                {longterm: +1, fixer: 0 } , // Weight for first choice
                {longterm: +0, fixer: 1 } , // Weight for second choice
            ]
        },
        {
            question:"Ding! A notification popped up! A neighbor asks you to tutor their child. Do you:",
            choices: ["Offer to help, even if it means adjusting your schedule", " Explain that you're not confident in your tutoring someone"],
            weights: [
                {tutor: +2, social:0} , // Weight for first choice
                {tutor: +0, social:0 } , // Weight for intuition 
            ]
        },
        {
            question:"Well, that was a lot of research done for the day!",
            choices: ["Time to relax!", "Hopefully I can find something I'm passionate about soon...t"],
            weights: [
                {tutor: +0, social:0 } , // Weight for first choice
                {tutor: +0, social:0} , // Weight for second choice
            ]
        },
        {
            question:"You hop onto social media, and you come across a social media post about a local charity event. Do you:",
            choices: ["Share the post with your network and encourage others to attend or donate", "Simply like the post and move on"],
            weights: [
                {social: +1, yapper: 1 } , // Weight for first choice
                {social: +0, yapper: 0} , // Weight for second choice
            ]
        },
        {
            question:"As you scroll on social media, you also learn about an important social issue. Do you:",
            choices: ["Research the issue further and share information with your friends and family.", "Acknowledge the issue but not take any further action."],
            weights: [
                {social: +1, yapper: 1} , // Weight for first choice
                {social: +0, yapper: 0} , // Weight for second choice
            ]
        },
        {
            question:"Still not knowing what to do, you asked your parents for advice. Who's advice resonates with you more?",
            choices: ["Mum: Start small and find something you're passionate about.", "Dad: Use your strengths to find a volunteer role where you can truly make a difference."],
            weights: [
                {longterm: +1, fixer: 1 } , // Weight for first choice
                {social: +1, tutor: 1, yapper: 1} , // Weight for second choice
            ]
        },
        {
            question:"As you was falling asleep, you wondered: If I had a superpower to help me volunteer, what would it be?",
            choices: ["The ability to effortlessly connect with people from all walks of life.", "The ability to multiply yourself to volunteer at multiple places simultaneously."],
            weights: [
                {yapper: +1, longterm: 0 } , // Weight for first choice
                {tutor: +1, longterm:1 } , // Weight for second choice
            ]
        },
        {
            question: "Processing...",
            choices: ["Find out what volunteering opportunities suit me!"],
            weights: [
                {extrovertScore: 0, introvertScore: 0 }, // Placeholder
                {introvertScore: 0, extrovertScore: 0}, //Placeholder
            ]
        },
    ]


    //Variables for scores 
    let currentQuestionIndex = 0;
    let introvertScore = 0;
    let extrovertScore = 0;
    let judgingScore = 0;
    let perceivingScore = 0;
    let sensingScore = 0;
    let intuitionScore = 0;
    let thinkingScore = 0;
    let feelingScore = 0;
    let longterm = 0;
    let fixer = 0;
    let social = 0;
    let tutor = 0;
    let yapper = 0;

    function displayQuestionImage(questionIndex) {
        const imageURLs = [
            "qn 1.png",
            "qn 2.png",
            "qn 3.png",
            "qn 4.png",
            "qn 5.png",
            "qn 6.png",
            "qn 7.png",
            "qn 8.png",
            "qn 9.png",
            "qn 10.png",
            "qn 11.png",
            "qn 12.png",
            "loading.gif",
        ];
        const questionImageElement = document.getElementById('question-image');
        questionImageElement.src = imageURLs[questionIndex];
    }

    document.getElementById('begin-quiz').addEventListener('click', function() {
        document.getElementById('home').style.display = 'none';
        document.getElementById('quiz-page').style.display = 'block';
    });

    //Function to display the current question and choices
    function displayCurrentQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById('question');
        const progressImageElement = document.getElementById('question-progress-image');
        const choiceContainers = document.getElementById('choices');
        
        choiceContainers.innerHTML = '';
        
        questionElement.textContent = currentQuestion.question;
        progressImageElement.src = getQuestionProgressImage(currentQuestionIndex);
        
        displayQuestionImage(currentQuestionIndex);

        currentQuestion.choices.forEach((choice, index) => {
                //Buttons for choices
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choices');
            button.addEventListener('click', () => handleChoiceClick(index));
            choiceContainers.appendChild(button);
        });
        }

    //Function to get progress bar image URL for the current question 
    function getQuestionProgressImage(questionIndex) {
        const progressImageURLs = [
            "Q1 progress.svg",
            "Q2 progress.svg",
            "Q3 progress.svg",
            "Q4 progress.svg",
            "Q5 progress.svg",
            "Q6 progress.svg",
            "Q7 progress.svg",
            "Q8 progress.svg",
            "Q9 progress.svg",
            "Q10 progress.svg",
            "Q11 progress.svg",
            "Q12 progress.svg",
        ];
        return progressImageURLs[questionIndex] || "";
    }

    //Function to handle choice click
    function handleChoiceClick(choiceIndex) {
        // Update scores based on user response
        const currentQuestion = questions[currentQuestionIndex];
        const selectedChoiceWeight = currentQuestion.weights[choiceIndex];
        console.log("Selected choice weight:", selectedChoiceWeight);

                //Update scores based on weight of selected choice
                if (selectedChoiceWeight.hasOwnProperty('longterm')) {
                    longterm += selectedChoiceWeight.longterm;
                }
                if (selectedChoiceWeight.hasOwnProperty('fixer')) {
                    fixer += selectedChoiceWeight.fixer;
                }
                if (selectedChoiceWeight.hasOwnProperty('social')) {
                    social += selectedChoiceWeight.social;
                }
                if (selectedChoiceWeight.hasOwnProperty('tutor')) {
                    tutor += selectedChoiceWeight.tutor;
                }
                if (selectedChoiceWeight.hasOwnProperty('yapper')) {
                    yapper += selectedChoiceWeight.yapper;
                }

            //Move to the next question
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                displayCurrentQuestion();
            } else {
                calculateMBTITypeAndDisplayImage();
            }
        }
        

    //Function to calculate MBTI type based on scores and display image
    function calculateMBTITypeAndDisplayImage() {
        //Calculate introvert/extrovert dimension
        const longfix = longterm > fixer ? "L" :"F";
        //Calculate sensing/intuition dimension
        const socialtutor = social > tutor ? "S" : "T";
        //Calculate thinking/feeling dimension
        const tutoryapper = tutor > yapper ? "T" : "Y";
        //Produce MBTI type string
        const mbtiTypeString = longfix+socialtutor+tutoryapper

        console.log("MBTI Type:", mbtiTypeString);

        document.getElementById('results').style.display = 'none';
        
        //Remove quiz-related elements from the DOM
        const questionElement = document.getElementById('question');
        const choiceContainers = document.getElementById('choices');
        const quizContainer = document.getElementById('quiz');
        const thumbnailImage = document.querySelector('img[src="front page.png"]');
        questionElement.remove();
        choiceContainers.remove();
        quizContainer.remove();
        thumbnailImage.remove();

        displayImage(mbtiTypeString);

        document.getElementById('results').style.display = 'block'
    }
    
    //Function to calculate MBTI type and return image URL 
        function getMBTIImageUrl(mbtiTypeString) {
            const MBTIImageUrls = {
                "LST": "new long term.png",
                "LSY": "new yapper.png",
                "LTT": "new tutor.png",
                "LTY": "new long term.png",
                "FST": "new fixer.png",
                "FSY": "new social savvy.png",
                "FTT": "new tutor.png",
                "FTY": "new social savvy.png"
            };
            return MBTIImageUrls[mbtiTypeString] || ""
        }

        //Display image
        function displayImage(mbtiTypeString) {
            const imageURL = getMBTIImageUrl(mbtiTypeString);
            const mbtiImageContainer = document.getElementById('mbti-image');
            const imageElement = document.createElement('img');
            imageElement.src = imageURL;

            mbtiImageContainer.appendChild(imageElement);
    
    }
        //Display the first question when the quiz starts
        displayCurrentQuestion();
        document.addEventListener('DOMContentLoaded', () => {
        const choiceContainers = document.querySelectorAll('.choice-container');
        choiceContainers.forEach((container) => {
            const choices = container.querySelectorAll('button');
            choices.forEach((choice, choiceIndex) => {
                choice.addEventListener('click', () => {
                    handleChoiceClick(choiceIndex);
                });
            });
        });
    });
}

//Call function to start the quiz
displayQuiz();

// Share quiz button click event handler
document.addEventListener('DOMContentLoaded', function() {
    const shareButton = document.querySelector('.share-button');

    shareButton.addEventListener('click', function() {
        const url = window.location.href;

        navigator.clipboard.writeText(url)
            .then(() => {
                alert('Quiz URL copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy URL: ', err);
            });
    });
});

// Select the button element
const backToHomeButton = document.getElementById('back-to-home');

// Add event listener for the button click
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('back-to-home');

    backButton.addEventListener('click', function() {
        // Redirect to the home page or perform any other action you want
        window.location.href = 'https://k3ttuu.github.io/clickkindness/'; // Replace 'home.html' with the actual URL of your home page
    });
});

// Function to navigate back to the home page
function navigateToHomePage() {
    // Reset quiz state if needed
    resetQuiz(); // Assuming you have a resetQuiz() function defined

    // Hide quiz page and show the home page
    document.getElementById('home').style.display = 'block';
    document.getElementById('quiz-page').style.display = 'none';
}
