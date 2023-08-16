let rootEl = document.querySelector('#root');
let statusBar = document.querySelector("#status-bar");
let timerEl = document.querySelector('#timer');
let difficultyEl = document.querySelector('#difficulty');
let scoreEl = document.querySelector('#score');
let headerEl = document.querySelector('#qcard-title');
let quizboxEL = document.querySelector('#quizbox');

let screen = 'start';

let quizTime = 0;
let quizDiff = "";
let quizScore = 0;

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
        quizboxEL.appendChild(section);
    };

    headerEl.textContent = "New Game";
};


// Game Start Function
function startGame(){
    quizboxEL.innerHTML = '';
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

function coinflip(){
    let coin = Math.floor(Math.random()*2);
    if (coin>0){
      return true;
    } else {
      return false;
    };
  };

function quizRender(){
    let isReverse = coinflip()
    let qBox = document.createElement('section');
    let ul = document.createElement('ul');
    qBox.setAttribute("class", "qBox");
    if (isReverse){
        qBox.textContent = "What is the [property] of [country]?";
    } else {
        qBox.textContent = "[country.property] is the [property] of what country?"
    };

    ul.setAttribute("class", "aUl");
    for (let i=0; i<4; i++){
        let abcd = "ABCD"
        let li = document.createElement('li')
        li.dataset.index = i;
        li.textContent = abcd[i]+": Bub";
        ul.appendChild(li);
    }
    
    quizboxEL.appendChild(qBox);
    quizboxEL.appendChild(ul)
};

// Array Shuffling Function
function arrayShuffler(array, length){
    let newArray = [];
    while (newArray.length !== length){
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
    quizboxEL.addEventListener("click", startGameCl);
};