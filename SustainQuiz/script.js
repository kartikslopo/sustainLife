var questions = [
    {
        question : "Modern concept of sustainable development focuses more on :",
        choices : ["Economic development", "Social development", "Environmental protection", "All of the above"],
        answer : "All of the above",
        marked : false,
        correct : false
    },
    {
        question : "Sustainability Science is the study of the concepts of sustainable development and ___",
        choices : ["Environmental science", "General science", "social science", "Geo Science"],
        answer : "Environmental science",
        marked : false,
        correct : false
    },
    {
        question : "As per United Nations, following is (are) the broader issue(s) of human development",
        choices : ["education", "public health", "standard of living", "all of the above"],
        answer : "all of the above",
        marked : false,
        correct : false
    },
    {
        question : "United Nations (UN) decade of education for sustainable development is from :",
        choices : ["2002-11", "2003-12", "2004-13", "2005-14"],
        answer : "2005-14",
        marked : false,
        correct : false
    },
    {
        question : "Numbers of Sustainable Development Goals (SDGs) by United Nations are :",
        choices : ["15", "16", "17", "18"],
        answer : "17",
        marked : false,
        correct : false
    },
    {
        question : "The Sustainable Development Goals (SDGs) recognize that all countries must stimulate action in the following key areas.",
        choices : ["people, planet, prosperity, peace and partnership", "people, planet, prosperity, plants and planning", "people, planet, prosperity, plants and partnership", "people, planet, prosperity, peace and planning"],
        answer : "people, planet, prosperity, peace and partnership",
        marked : false,
        correct : false
    },
    {
        question : "Sustainable development can be thought of in terms of three spheres i.e :-",
        choices : ["environment, economy and society", "environment, economy and equity", "environment, ecology and society", "environment, economy and ecology"],
        answer : "environment, economy and society",
        marked : false,
        correct : false
    },
    {
        question : "When the consumption of natural resources are equal to nature’s ability to replenish then sustainability is :",
        choices : ["not sustainable", "steady state economy", "environmentally sustainable", "none of the above"],
        answer : "steady state economy",
        marked : false,
        correct : false
    },
    {
        question : "A promising direction towards sustainable development is to design systems that are :",
        choices : ["flexible and irreversible", "flexible and reversible", "inflexible and reversible", "inflexible and irreversible"],
        answer : "flexible and reversible",
        marked : false,
        correct : false
    },
    {
        question : "Following is (are) the element(s) of sustainable agriculture : -",
        choices : ["permaculture", "agroforestry", "mixed farming", " all of the above"],
        answer : "agroforestry",
        marked : false,
        correct : false
    },
    {
        question : "Sustainable energy : -",
        choices : ["is clean", "can be used over a long period of time", "both (A) and (B)", " none of the above"],
        answer : "none of the above",
        marked : false,
        correct : false
    },
    {
        question : "The technology which meets the sustainable development needs is often referred to as : -",
        choices : [" advanced technology", "appropriate technology", "sustainable technology", "adaptive technology"],
        answer : "sustainable technology",
        marked : false,
        correct : false
    },
    {
        question : "The criterion for corporate sustainability : -",
        choices : ["eco-efficiency", "socio-efficiency", " both (A) and (B)", "none of the above"],
        answer : "rare, as of now",
        marked : false,
        correct : false
    },
    {
        question : "Four domains of circles of sustainability, used by the United Nations.",
        choices : [" economic, ecological, political and cultural", "economic, social, political and cultural", "economic, ecological, social and cultural", "economic, ecological, political and social"],
        answer : "economic, social, political and cultural",
        marked : false,
        correct : false
    },
    {
        question : "The United Nations Conference on Sustainable Development (UNCSD) is also known as : -",
        choices : [" Rio 2010", " Rio 2011", " Rio 2012", " Rio 2013"],
        answer : "Rio 2012",
        marked : false,
        correct : false
    }
];

var score = 0;
var quizDuration = 0;
var quizSecondElapsed = 0;
var quizInterval;
var questionDuration = 15;
var questionSecondElapsed = 0;
var questionInterval;
var currentQuestion = 0;
var username;
var highScore = document.getElementById("highScore");
highScore.setAttribute("style", "background-color: white");
var quizTimer = document.getElementById("quizTimer");
var quiz = document.getElementById("quiz");
var timerTable = document.getElementById("timer");
var randomQuestions;

function init() {
    clear();
    reset();
    let heading = document.createElement("p");
    heading.setAttribute("id", "heading");
    heading.textContent = "Test your knowledge on sustainability with these exiting questions !";
    quiz.appendChild(heading);
    let instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions")
    instructions.textContent = "Scores are given on the basis of time required to answer a question.";
    quiz.appendChild(instructions);
    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.textContent = "Enter Name : ";
    let nameInput = document.createElement("input");
    nameInput.setAttribute("id", "name");
    nameInput.setAttribute("name", "name");
    let lb = document.createElement("br");
    quiz.appendChild(nameLabel);
    quiz.appendChild(nameInput);
    quiz.appendChild(lb);
    let startQuiz = document.createElement("button");
    startQuiz.setAttribute("id", "startQuiz");
    startQuiz.textContent = "Start Quiz!";
    quiz.appendChild(startQuiz);
    startQuiz.addEventListener("click", function(){
        username = nameInput.value;
        randomQuestions = rQuestions(questions);
        sidebar(randomQuestions);
        startquiz(randomQuestions);
    })
}

function clear() {
    quiz.innerHTML = "";
}

function sidebar(randomQuestions) {
    var side = document.getElementById("sidebar");
    side.className = "sb";
    side.style.visibility = "visible";
    for(let i = 0; i < questions.length; i++){
        let sideQuestion = document.createElement("li");
        sideQuestion.setAttribute("id", i + 1);
        sideQuestion.setAttribute("style", "list-style-type:none");
        sideQuestion.textContent = i + 1;
        side.appendChild(sideQuestion);
    }
    side.addEventListener("click", function() {
        toggleSidebar(randomQuestions);
    })
}

function toggleSidebar(randomQuestions) {
    let e = event.target;
    if(e.matches("li")){
        let questionno = e.textContent;
        showQuestion(Number(questionno) - 1, randomQuestions);
    }
}

function reset() {
    score = 0;
    quizDuration = 0;
    quizSecondElapsed = 0;
    currentQuestion = 0;
    questionDuration = 15;
    questionSecondElapsed = 0;
    questionInterval;
    for(let i = 0; i < questions.length; i++){
        questions[i].marked = false;
    }
    quizInterval;
}

function startquiz(randomQuestions){
    timerTable.style.visibility = "visible";
    quizDuration = questions.length * 10;
    startTimer();
    time();
    showQuestion(currentQuestion, randomQuestions);
}

function rQuestions(arr) {
    var randomQuestions = [];
    var result = [], randNumber,Count=questions.length;
    while ( Count > 0) {
        randNumber = Math.round(Math.random() * (questions.length - 1));
        if (result.indexOf(randNumber) == -1) {
            result.push(randNumber);
            Count--;
        }
    }
    for(let i = 0; i < questions.length; i++) {
        randomQuestions[i] = arr[result[i]];
        randomQuestions[i].number = i + 1;
    }
    return randomQuestions;
}

function startTimer() {
    clearInterval(quizInterval);
    quizSeconds = quizDuration;
    quizInterval = setInterval(function() {
        quizSecondElapsed++;
        questionSecondElapsed++;
        time();
    }, 1000);
}

function time() {
    quizTimer.textContent = quizDuration - quizSecondElapsed;
    if((quizDuration - quizSecondElapsed) < 1){
        endQuiz();
    }
}

function showQuestion(i, randomQuestions) {
    clear();
    questionSecondElapsed = 0;
    currentQuestion = i;
    if(i == randomQuestions.length){
        endQuiz();
        return;
    }
    let question = document.createElement("h1");
    question.setAttribute("question", randomQuestions[i].question);
    question.setAttribute("id", "question")
    question.textContent = "Q" +  eval(i + 1) + ". " + randomQuestions[i].question;
    quiz.appendChild(question);
    let choicebox = document.createElement("ul");
    choicebox.setAttribute("id", "choicebox");
    quiz.append(choicebox);
    for(let j = 0; j < randomQuestions[i].choices.length; j++){
        let listchoice = document.createElement("li");
        listchoice.setAttribute("choice-value", randomQuestions[i].choices[j]);
        listchoice.setAttribute("id","questionNum-" + j);
        listchoice.setAttribute("style", "list-style-type:none");
        listchoice.textContent = j + 1 + ". " + randomQuestions[i].choices[j];
        if(randomQuestions[i].marked && randomQuestions[i].answer == randomQuestions[i].choices[j]){
            listchoice.setAttribute("style", "background-color: green; color: white");
        }
        if(randomQuestions[i].userAnswer == randomQuestions[i].choices[j] && randomQuestions[i].userAnswer != randomQuestions[i].answer){
            listchoice.setAttribute("style", "background-color: red;");
        }
        choicebox.appendChild(listchoice);
    }
    choicebox.addEventListener("click", function () {
        scoreAnswer(randomQuestions[i]);
    })
    let previous = document.createElement("button");
    previous.setAttribute("id", "previous");
    previous.textContent = "Previous";
    quiz.appendChild(previous);
    if(i == 0){
        previous.style.visibility = "hidden";
    }
    let next = document.createElement("button");
    next.setAttribute("id", "next");
    if(i == randomQuestions.length - 1){
        next.textContent = "Submit";
    }else{
        next.textContent = "Next";
    }
    quiz.appendChild(next);
    previous.addEventListener("click", function () {
        currentQuestion--;
        showQuestion(currentQuestion, randomQuestions);
    })
    next.addEventListener("click", function(){
        currentQuestion++;
        showQuestion(currentQuestion, randomQuestions);
    })
}

function scoreAnswer(current) {
    var e = event.target;
    if(e.matches("li") && !current.marked){
        let selectedItem = e.textContent.slice(3);
        if(selectedItem == current.answer){
            if(questionDuration < questionSecondElapsed + 1){
                score += 0;
            }else{
                score += questionDuration - questionSecondElapsed;
            }
            document.getElementById("score").textContent = score;
            current.correct = true;
            document.getElementById(current.number).style.backgroundColor = "green";
            document.getElementById(current.number).style.color = "white";
        }
        else{
            document.getElementById(current.number).style.backgroundColor = "red";
        }
        current.marked = true;
        current.userAnswer = selectedItem;
        showAnswer(current, selectedItem);
    }
}

function showAnswer(current, selectedItem) {
    for(let i = 0; i < current.choices.length; i++){
        let questionid = "#questionNum-" + i;
        let questionrow = document.querySelector(questionid);
        if(current.choices[i] == current.answer){
            questionrow.setAttribute("style", "background-color: green; color: white");
        }
        else if(selectedItem == current.choices[i]){
            questionrow.setAttribute("style", "background-color: red");
        }
    }
    setTimeout(function() {
        showQuestion(currentQuestion + 1, randomQuestions);
    }, 1000);
}

function refresh() {
    location.reload();
}

function endQuiz(){
    stopTimer();
    clear();
    timerTable.style.visibility = "hidden";
    var sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none";
    let heading = document.createElement("p");
    heading.setAttribute("id", "heading");
    heading.textContent = "Quiz Over!";
    let instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = "Hey! " + username + " Your Score is " + score;
    let playAgain = document.createElement("button");
    playAgain.setAttribute("id", "startQuiz");
    playAgain.textContent = "Play again";
    quiz.appendChild(heading);
    quiz.appendChild(instructions);
    quiz.appendChild(playAgain);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    var d = new Date(),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    let t = h + ':' + m;
    let thisScore = [{username : username, score : score, date : today, time : t}];
    let storedScores = JSON.parse(localStorage.getItem("quizScores"));
    if(storedScores == null){
        storedScores = thisScore;
    }else{
        storedScores.push(thisScore[0]);
    }
    localStorage.setItem("quizScores", JSON.stringify(storedScores));
    let heading2 = document.createElement("h2");
    heading2.setAttribute("id", "heading");
    heading2.textContent = "Top 5 High Scores";
    quiz.appendChild(heading2);
    if(storedScores != null){
        storedScores.sort((a, b) => (a.score < b.score) ? 1: -1);
        let scoresToDisplay = 5;
        if(storedScores.length < 5){
            scoresToDisplay = storedScores.length;
        }
        for(let i = 0; i < scoresToDisplay; i++){
            var s = storedScores[i];
            var p = document.createElement("p");
            p.textContent = s.score + " by " + s.username + " on " + s.date +  " at " + s.time;
            quiz.appendChild(p);
        }
    }
    playAgain.addEventListener("click", refresh);
}

function stopTimer() {
    quizSeconds = 0;
    clearInterval(quizInterval);
}

function highScores() {
    stopTimer();
    clear();
    var sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none";
    timerTable.setAttribute("style", "visibility: hidden");
    let storedScores = JSON.parse(localStorage.getItem("quizScores"));
    let heading = document.createElement("h2");
    heading.setAttribute("id", "heading");
    heading.textContent = "Top 5 High Scores";
    quiz.appendChild(heading);
    if(storedScores != null){
        storedScores.sort((a, b) => (a.score < b.score) ? 1: -1);
        let scoresToDisplay = 5;
        if(storedScores.length < 5){
            scoresToDisplay = storedScores.length;
        }
        for(let i = 0; i < scoresToDisplay; i++){
            var s = storedScores[i];
            var p = document.createElement("p");
            p.textContent = s.score + " by " + s.username + " on " + s.date +  " at " + s.time;
            quiz.appendChild(p);
        }
    }else{
        let p = document.createElement("p");
        p.textContent = "Your High Scores will be shown here";
        quiz.append(p);
    }
    let playAgain = document.createElement("button");
    playAgain.setAttribute("id", "startQuiz");
    playAgain.textContent = "Play Quiz!";
    quiz.appendChild(playAgain);
    playAgain.addEventListener("click", refresh);
}

init();

highScore.addEventListener("click", highScores);