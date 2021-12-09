
function updateCards(){
question1 = document.querySelector('#question1');   
answer1 =   document.querySelector('#answer1');
question2 = document.querySelector('#question2');
answer2 =   document.querySelector('#answer2');
question3 = document.querySelector('#question3');
answer3 =   document.querySelector('#answer3');
question4 = document.querySelector('#question4');
answer4 =   document.querySelector('#answer4');
question5 = document.querySelector('#question5');
answer5 =   document.querySelector('#answer5');
progressText = document.querySelector('#progressText');
scoreText = document.querySelector('#scoreText');
progressBarFull = document.querySelector('#progressBarFull');
progressTextLength = document.querySelector('#result1');
scoreBar = document.querySelector('#scoreBar');

currentQuestion={};
acceptingAnswers = true;
score = 0;

questionCounter = 0;
availableQuestions = [];
questOrder = [];
questions = [];

fetch('data/flashcardQA.json').then(resp =>{
    console.log(resp);
    return resp.json();
}).then(loadedQuestions =>{

    //console.log(loadedQuestions);
    questions = loadedQuestions;
   
    startGame();
});
}

SCORE_POINTS = 100;
MAX_QUESTIONS = 5;

startGame=()=> {
    questionCounter=0;
    score=20;
    availableQuestions=[...questions];
    getNewQuestion();
};

getNewQuestion=()=>{
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score);
        score = 20;

        return window.location.assign('/Workings/Slider_Flips/end.html');
    }
    console.log(availableQuestions.length);
/************************************************* */
    var percent = 10;
    progressBarFull.style.width = percent + "%";
    function increase(){
      percent = percent > 90 ? 10 : percent + 10;
      document.querySelector(".progressBarFull").style.width = percent + "%";
    }

/********************************************* */

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    scoreText =`Score ${score}`;
   
    scoreBar.style.width = `${(score/(SCORE_POINTS*100))*100}%`;

    var questOrder = shuffle([1,2,3,4,0]);

    function shuffle(questOrder) {
        var i = questOrder.length,
            j = 0,
            temp;
        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            // swap randomly chosen element with current element
            temp = questOrder[i];
            questOrder[i] = questOrder[j];
            questOrder[j] = temp;
        }
        return questOrder;
    }
    console.log(questOrder);

    qu1= questions[0];
    qu1a = qu1.question;
    a1a = qu1.answer;

    qu2= questions[1];
    qu2a = qu2.question;
    a2a = qu2.answer;

    qu3= questions[2];
    qu3a = qu3.question;
    a3a = qu3.answer;

    qu4= questions[3];
    qu4a = qu4.question;
    a4a = qu4.answer;

    qu5= questions[4];
    qu5a = qu5.question;
    a5a = qu5.answer;
  
    question1 = `Q: ${qu1a}`;
    answer1 = `A: ${a1a}`;

    question2 = `Q: ${qu2a}`;
    answer2 = `A: ${a2a}`;

    question3 = `Q: ${qu3a}`;
    answer3 = `A: ${a3a}`;

    question4 = `Q: ${qu4a}`;
    answer4 = `A: ${a4a}`;

    question5 = `Q: ${qu5a}`;
    answer5 = `A: ${a5a}`;

    console.log(question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5);


    // choices.forEach(choice => {
    //     const number = choice.dataset['number'];
    //     choice.innerText = currentQuestion['choice'+ number];
    // });

    // availableQuestions.splice(questionsIndex,1)
    myFunction(question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5);
    acceptingAnswers = true;
};

myFunction=(question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5)=>{
    //console.log(question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5);
    document.getElementById('question1').innerText = question1;   
    document.getElementById('answer1').innerText= answer1 ;
    document.getElementById('question2').innerText = question2;
    document.getElementById('answer2').innerText = answer2;
    document.getElementById('question3').innerText = question3;
    document.getElementById('answer3').innerText = answer3;
    document.getElementById('question4').innerText = question4;
    document.getElementById('answer4').innerText = answer4;
    document.getElementById('question5').innerText = question5;
    document.getElementById('answer5').innerText = answer5;
    //console.log(question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5);

};

// choices.forEach(choice =>{
//     choice.addEventListener('click', e=>{
//         if(!acceptingAnswers) return 
        
//         acceptingAnswers = false
//         const selectedChoice = e.target
//         const selectedAnswer = selectedChoice.dataset['number']

//         let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

            
//         if(classToApply === 'correct'){
//             incrementScore(SCORE_POINTS)
//         }
        
//         selectedChoice.parentElement.classList.add(classToApply)

//         setTimeout(()=>{
//             selectedChoice.parentElement.classList.remove(classToApply)
//             getNewQuestion()

//         }, 1000)
       
//     })
// })

incrementScore = num =>{
    score +=num;
    score.innerText = score;
};

