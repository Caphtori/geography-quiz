let rootEl = document.querySelector('#root');
let statusBar = document.querySelector("#status-bar");
let timerEl = document.querySelector('#timer');
let difficultyEl = document.querySelector('#difficulty');
let scoreEl = document.querySelector('#score');
let headerEl = document.querySelector('#qcard-title');
let quizboxEl = document.querySelector('#quizbox');

let player = {
    name: "Bub",
    score: 0,
    mode: "standard",
    difficulty: reg,

    recScore: function(){
        localStorage.setItem("currentScore", JSONstringify(this));
    }
};


let screen = 'start';
let isCorrect = false;

let quizTime = 0;
let quizDiff = "";
let quizScore = 0;

let outBounds = [];

timerEl.textContent = quizTime;
difficultyEl.textContent = quizDiff;
scoreEl.textContent = quizScore;

// timerEl.textContent(quizTime);
// difficultyEl.textContent(quizDiff);
// scoreEl.textContent(quizScore);
function capitalize(str, n){
    let newStr = '';
    let char = '';
    for (let i=0; i<str.length; i++){
        if (i===n){
            char=str[i].toUpperCase();
        } else {
            char=str[i]
        };
        newStr = newStr+char;
    }
    return newStr;
};

// Start Screen Functions
function renderStart(){
    let sectionClasses =[mode, diffLevel, startBtn];
    for (let i=0; i<sectionClasses.length; i++){
        let section = document.createElement('section');
        section.setAttribute("class", "starter-section");
        sectionClasses[i].rndr(section);
        quizboxEl.appendChild(section);
    };

    headerEl.textContent = "New Game";
};


// Game Start Function
function startGame(){
    screen = "quiz";
    quizboxEl.innerHTML = '';
    statusBar.setAttribute("style", "visibility: visible;");
    quizTime = 60;
    // quizTime = 20;
    timerEl.textContent = timerDisplay();
    startTimer();
    quizRender()
};

function startGameCl(event){
    let element = event.target;
    if (element.matches(".startBtn") === true) {
        startGame();
    }
};



// Timer Functions

function timerDisplay(){
    // let seconds = quizTime;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    
    if (quizTime<60){
        return quizTime;
    } else if (quizTime<3600){
        seconds = quizTime%60;
        minutes = (quizTime-seconds)/60;
        if (seconds<10){
            return minutes+":0"+seconds;
        } else {
            return minutes+":"+seconds;
        };
    } else {
        // let seconds = quizTime%60;
        // let minutes = ((quizTime-seconds)%3600)/60;
        // let hours = (quizTime-(minutes*60))/60;
        let remainder = quizTime%3600;
        seconds = remainder%60;
        minutes = (remainder-seconds)/60
        hours = (quizTime-remainder)/3600;
        if(minutes<10&&seconds<10){
            return hours+":0"+minutes+":0"+seconds;
        } else if (minutes<10){
            return hours+":0"+minutes+":"+seconds;
        } else if (seconds<10){
            return hours+":"+minutes+":0"+seconds;
        } else{
            return hours+":"+minutes+":"+seconds;
        };
    }
};

// Flash Effect
function timerFlash(){
    let crunch = 300;
    let bgClr = true;
    let isCrunch = false;
    let flashClr = "background-color: #FFFF00;";
    let flashInterval = setInterval(()=>{
        if (quizTime===5){
            if (!isCrunch){
                flashClr = "background-color: red;";
                crunch = 100;
                isCrunch = true;
            };
        };
        if (bgClr){
            // timerEl.setAttribute("style", "background-color: '#FF000D';");
            timerEl.setAttribute("style", flashClr);
            bgClr = false;
        } else{
            timerEl.setAttribute("style", "background-color: var(--clr2);");
            bgClr = true;
        };

        if (quizTime===0){
            clearInterval(flashInterval);
            timerEl.setAttribute("style", "background-color: var(--clr2);");
        };
    }, crunch);
};


// The actual timer
function startTimer(){
    let isFlashing =false;
    let timerInterval = setInterval(()=>{
        quizTime--;
        timerEl.textContent = timerDisplay();
        if (quizTime===15){
            if (!isFlashing){
                timerFlash();
                isFlashing=false;
            };
        };
        if (quizTime===0){
            clearInterval(timerInterval);
        };
    }, 1000);
};


// Quiz Render Functions

// function arrayCompiler

function quizRender(){
    let eligibleList = [];

    let prop = randChoice(countryProp.instances);
    let countryCh = randChoice(country.instances);
    let answers = answerCompiler(countryCh, outBounds, prop);


    if (prop===capital||prop===natAnth){
        while (countryCh===djibouti){
            countryCh = randChoice(country.instances);
        };
    };
    


    let isReverse = coinflip()


    let qBox = document.createElement('section');
    let ul = document.createElement('ul');
    qBox.setAttribute("class", "qBox");
    

    answers = arrayShuffler(answers);


    if (isReverse){
        if (prop===gdp){
            qBox.textContent = countryCh.propMW(prop)+" is the "+prop.label+" of what country?"
            
        } else if (prop===natAnth){
            qBox.textContent = "'"+countryCh.propMW(prop)[0]+"' is the "+prop.label+" of what country?"
        } else {
            qBox.textContent = countryCh.propMW(prop)[0]+" is the "+prop.label+" of what country?"
        };
    } else {
        qBox.textContent = "What is the " +prop.label+" of "+countryCh.label+"?";
    };

    ul.setAttribute("class", "aUl");
    for (let i=0; i<answers.length; i++){
        let abcd = "ABCD"
        let li = document.createElement('li')
        // li.dataset.index = i;
        li.setAttribute("class", "liAnswer");
        if (answers[i]===countryCh){
            li.dataset.isAnswer = "true";
            console.log(answers[i].label+" "+li.dataset.isAnswer)
            // li.setAttribute("data-isAnswer", true);
        } else {
            li.dataset.isAnswer = "false";
            console.log(answers[i].label+" "+li.dataset.isAnswer)
            // li.setAttribute("data-isAnswer", false);
        };
        if (isReverse){
            li.textContent = abcd[i]+": " + answers[i].label;
        } else {
            if (prop===gdp){
                li.textContent = abcd[i]+": " + answers[i].propMW(prop);
            } else if (prop===natAnth){
                li.textContent = abcd[i]+": '" + answers[i].propMW(prop)[0]+"'";
            } else {
                li.textContent = abcd[i]+": " + answers[i].propMW(prop)[0];
            };
        };
        
        ul.appendChild(li);
        // li.addEventListener("click", resultCl, { once: true });
        li.addEventListener("click", resultCl);
    }
    headerEl.textContent = prop.title;

    quizboxEl.appendChild(qBox);
    quizboxEl.appendChild(ul)
};

// Results Render
function renderResult(){
    let liArray = document.getElementsByClassName("liAnswer");
    let newArray = [];
    let testNum = 0;
    for (let i=0; i<liArray.length; i++){
        newArray.push(liArray[i]);
    };
    for (let i=0; i<newArray.length; i++){
        testNum++
        let isRight = newArray[i].getAttribute("data-is-answer");
        if (isRight==="true"){
            newArray[i].setAttribute("class", "right");
        }
        else {
            newArray[i].setAttribute("class", "wrong");
        };
    };
};

function resultCl(event){
    let element = event.target;
    let liArray = document.getElementsByClassName("liAnswer");
    let isAnswerTemp = element.getAttribute('data-is-answer');
    console.log(element);
    console.log(isAnswerTemp);
    for (let i = 0; i<liArray.length; i++){
        liArray[i].removeEventListener("click", resultCl);
    }
    if (element.matches('li')) {
        if (isAnswerTemp==="true"){
            isCorrect = true;
            element.setAttribute("style", "border: 2px solid green;");
        } else {
            isCorrect = false;
            element.setAttribute("style", "border: 2px solid red;");
        }
    };
    renderResult()
};


// Answer Compiler
function answerCompiler(correctAnswer, blockArray, prop){
    let answerArray = [correctAnswer];
    let absoAnswer = correctAnswer.propMW(prop);
    // let isRegion = false;
    if (prop===natAnth){
        if (absoAnswer===natAnth){

        }
    }
    for (let i=0; i<3; i++){
        let n = Math.floor(Math.random()*country.instances.length);
        let arrayAdd = country.instances[n];
        while (arrayAdd===correctAnswer||blockArray.includes(arrayAdd)){
            n = Math.floor(Math.random()*country.instances.length);
            arrayAdd = country.instances[n];
        };
        answerArray.push(arrayAdd);
    };
    return answerArray
};



// Misc Functions
function coinflip(){
    let coin = Math.floor(Math.random()*2);
    if (coin>0){
      return true;
    } else {
      return false;
    };
  };

function randChoice(array){
    let choice = Math.floor(Math.random()*array.length);
    return array[choice]
};

function arrayShuffler(array){
    let newArray = [];
    while (newArray.length !== array.length){
       let i = Math.floor(Math.random()*array.length);
       if (!newArray.includes(array[i])){
        newArray.push(array[i]);
       };
    };
    return newArray
};


// Start
// init();
renderStart();

if (screen==="start"){
    quizboxEl.addEventListener("click", startGameCl);
};
// else if(screen==="quiz"){
//     quizboxEl.addEventListener("click", resultCl);
// };