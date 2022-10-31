
function updateCards(){

    /* assign variables */
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
    question6 = document.querySelector('#question6');   
    answer6 =   document.querySelector('#answer6');
    question7 = document.querySelector('#question7');
    answer7 =   document.querySelector('#answer7');
    question8 = document.querySelector('#question8');
    answer8 =   document.querySelector('#answer8');
    question9 = document.querySelector('#question9');
    answer9 =   document.querySelector('#answer9');
    question10 = document.querySelector('#question10');
    answer10 =   document.querySelector('#answer10');

    result1 = document.querySelector('#result1');
    result2 = document.querySelector('#result2');
    result3 = document.querySelector('#result3');
    result4 = document.querySelector('#result4');
    result5 = document.querySelector('#result5');
    
    currentQuestion={};
    acceptingAnswers = true;
    score = 0;
    right = 0;
    wrong = 0;

    questionCounter = 0;
    availableQuestions = [];
    questOrder = [];
    questions = [];


 /* fetch data */
    fetch('data/flashcardQA.json').then(resp =>{
        console.log('fetch response ',resp);
        return resp.json();
    }).then(loadedQuestions =>{
        questions = loadedQuestions;
        numberOfQuestions = questions.length;
        console.log(numberofQuestions);
        // usedQuests = getRandomInt(numberOfQuestions);
        
        console.log('number of questions ',numberOfQuestions, 'used questions ',usedQuests);
        scoring(numberOfQuestions);
        startGame(numberOfQuestions);
    });
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
  }

scoring=(numberOfQuestions)=>{
    MAX_QUESTIONS = numberOfQuestions.length;
    SCORE_POINTS = 100;
    num = SCORE_POINTS/MAX_QUESTIONS;
    a=0;
};

 /* game logic */

startGame=(numberOfQuestions)=> {
    console.log('at Start of startGame:: score ', score, 'num points per question',num, 'numberOfQuestions ', numberOfQuestions, 'right: ', right, 'wrong: ', wrong);
    getNewQuestion();
    updateGameStats(score, numberOfQuestions, right, wrong);   
};

 /* game stats container */

updateGameStats=(score, numQ, right, wrong)=>{

    a = right + wrong;
    right=right;
    wrong = wrong;

    left = numQ - a;
    if(a == 0){
        a = 1;
    } 
    pRight = ((100 * right) / a).toFixed(0);
    result1.innerText = `Questions in the Set: ${numQ}`;
    result2.innerText = `Correct Answers: ${right}`;
    result3.innerText = `Wrong Answers: ${wrong}`;
    result4.innerText = `Questions left to answer: ${left}`;
    result5.innerText = `Percent correct so far: ${pRight}%`;
    availableQuestions=[...questions];
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score);

        return window.location.assign('/Workings/Slider_Flips/end.html');
    }
};



getNewQuestion=()=>{
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
    console.log('question order ', questOrder);

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

    console.log('question texts ',question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5);

    myFunction(question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5);
    acceptingAnswers = true;
};

myFunction=(question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5)=>{
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
    //console.log('end of myFunction ',score, question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5);

};

increase=()=>{
    console.log('increment score at start ',score, 'num', num);
    score += num;
    right ++;
    score.innerText = score;
    //console.log('score after increment ',score, 'num: ', num,  'right: ', right, 'wrong: ', wrong);
    updateGameStats(score, availableQuestions.length, right, wrong);
};

moveOn=()=>{
    wrong ++;
    
    //console.log('score after increment ',score, 'num: ', num,  'right: ', right, 'wrong: ', wrong);
    updateGameStats(score, availableQuestions.length, right, wrong);
};

end=()=>{
    updateGameStats(score, availableQuestions.length, right, wrong);
};


showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide-card-inner");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1;}
  if (n < 1) {slideIndex = slides.length;}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}