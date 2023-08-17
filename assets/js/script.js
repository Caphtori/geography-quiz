let rootEl = document.querySelector('#root');
let statusBar = document.querySelector("#status-bar");
let timerEl = document.querySelector('#timer');
let difficultyEl = document.querySelector('#difficulty');
let scoreEl = document.querySelector('#score');
let headerEl = document.querySelector('#qcard-title');
let quizboxEl = document.querySelector('#quizbox');


// Audio by pixabay
let audioCorrect = new Audio("./assets/audio/correct.mp3");

// Audio by pixabay
let audioIncorrect = new Audio("./assets/audio/incorrect.mp3");

let pause = false;

let player = {
    name: "Bub",
    score: 0,
    mode: "standard",
    difficulty: reg,

    recScore: function(){
        localStorage.setItem("currentScore", JSONstringify(this));
    }
};

let pointsAdd = 0;
let screen = 'start';
let isCorrect = false;

let qCounter = 1;
let quizTime = 0;
let quizDiff = player.difficulty.label;
let pdClr = "background-color: "+player.difficulty.clr+";";
let quizScore = 0;

let outBounds = [];
let discard = [];

timerEl.textContent = quizTime;
difficultyEl.textContent = quizDiff;
difficultyEl.setAttribute("style", pdClr)
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
    gameReset();
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
    quizTime = 30;
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
        if (pause){
            timerEl.setAttribute("style", "background-color: var(--clr2);");
            bgClr = true;
            clearInterval(flashInterval);
            
        };
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
        if (pause){
            clearInterval(timerInterval);
        };
        quizTime--;
        timerEl.textContent = timerDisplay();
        if (quizTime===10){
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

function standardCompiler(prop, range, blockList){
    let array = [];
    for (let i=0; i<country.instances.length; i++){
        let choice = country.instances[i];
        if (range.includes(choice.propMW(prop)[1])&&!blockList.includes(choice)){
            array.push(choice);
        };
    };
    return array
};

function quizRender(){
    // let pointsVal = 0;
    let isReverse = coinflip()
    let eligibleList = country.instances;
    let prop = randChoice(countryProp.instances);
    if (player.difficulty===baby||player.difficulty===easy){
        while (prop===gdp){
            prop = randChoice(countryProp.instances);
        }
    };
    if (player.mode==="standard"||player.difficulty!==random||prop!==gdp){
        if (prop !== gdp){
            eligibleList = standardCompiler(prop, player.difficulty.range, discard);
        };
        
    };

    
    let countryCh = randChoice(eligibleList);
    let answers = answerCompiler(countryCh, eligibleList, outBounds, prop);

    

    if (prop===capital||prop===natAnth){
        while (countryCh===djibouti){
            countryCh = randChoice(eligibleList);
        };
    };
    
    console.log(countryCh.label+" "+countryCh.propMW(prop)[1]+" "+countryCh.group);


    if (player.mode==="endless"||player.difficulty===random){
        if (prop===gdp){
            pointsAdd=5;
        } else {
            pointsAdd=countryCh.propMW(prop)[1];
        };
    } else {
        pointsAdd = player.difficulty.points;
    };


    let qBox = document.createElement('section');
    let ul = document.createElement('ul');
    qBox.setAttribute("class", "qBox");
    

    answers = arrayShuffler(answers);


    


    if (isReverse){
        if (prop===gdp){
            qBox.textContent = countryCh.propMW(prop)+" is the "+prop.label+" of what country?";  
        } else if (prop===natAnth){
            qBox.textContent = "'"+countryCh.propMW(prop)[0]+"' is the "+prop.label+" of what country?";
        } else {
            qBox.textContent = countryCh.propMW(prop)[0]+" is the "+prop.label+" of what country?";
        };
    } else {
        qBox.textContent = "What is the " +prop.label+" of "+countryCh.label+"?";
    };

    ul.setAttribute("class", "aUl");
    for (let i=0; i<answers.length; i++){
        let abcd = "ABCD"
        let li = document.createElement('li')
        li.setAttribute("class", "liAnswer");
        if (answers[i]===countryCh){
            li.dataset.isAnswer = "true";
        } else {
            li.dataset.isAnswer = "false";
        };
        if (isReverse){
                li.textContent = abcd[i]+": " + answers[i].label;
                if(prop===gdp){
                    li.dataset.reveal = abcd[i]+": " + answers[i].label+", "+answers[i].propMW(prop);
                } else if(prop===natAnth){
                    li.dataset.reveal = abcd[i]+": " + answers[i].label+', "'+answers[i].propMW(prop)+'"';
                } else {
                    li.dataset.reveal = abcd[i]+": " + answers[i].label+", "+answers[i].propMW(prop)[0];
                }
                
            
            console.log(answers[i].label+" "+answers[i].propMW(prop)[1]+" "+answers[i].group)
        } else {
            if (prop===gdp){
                li.textContent = abcd[i]+": " + answers[i].propMW(prop);
                li.dataset.reveal = abcd[i]+": " + answers[i].propMW(prop)+", "+answers[i].label;
            } else if (prop===natAnth){
                li.textContent = abcd[i]+': "' + answers[i].propMW(prop)[0]+'"';
                li.dataset.reveal = abcd[i]+': "' + answers[i].propMW(prop)[0]+'", '+answers[i].label;
            } else {
                li.textContent = abcd[i]+": " + answers[i].propMW(prop)[0];
                li.dataset.reveal = abcd[i]+": " + answers[i].propMW(prop)[0]+", "+answers[i].label;
            };
            console.log(answers[i].label+" "+answers[i].propMW(prop)[1]+" "+answers[i].group)
        };
        
        ul.appendChild(li);
        li.addEventListener("click", resultCl, { once: true });
        // li.addEventListener("click", resultCl);
        
    }
    if (player.mode==="standard"){
        headerEl.textContent = qCounter+"/10 "+prop.title;
    } else {
        headerEl.textContent = prop.title;
    }
    
    
    discard.push[countryCh];
    quizboxEl.appendChild(qBox);
    quizboxEl.appendChild(ul)
};

// Results Render
function renderResult(){
    let liArray = document.getElementsByClassName("liAnswer");
    let newArray = [];
    for (let i=0; i<liArray.length; i++){
        newArray.push(liArray[i]);
    };
    for (let i=0; i<newArray.length; i++){
        let isRight = newArray[i].getAttribute("data-is-answer");
        if (isRight==="true"){
            newArray[i].setAttribute("class", "right");
        }
        else {
            // let newText = newArray[i].getAttribute("data-reveal");
            newArray[i].textContent = newArray[i].getAttribute("data-reveal");
            newArray[i].setAttribute("class", "wrong");
        };
    };
};

function resultCl(event){
    let element = event.target;
    let liArray = document.getElementsByClassName("liAnswer");
    let isAnswerTemp = element.getAttribute('data-is-answer');
    let delay = 4000;

    
    pause = true;
    startTimer()
    for (let i = 0; i<liArray.length; i++){
        liArray[i].removeEventListener("click", resultCl);
    }
    if (element.matches('li')) {
        if (isAnswerTemp==="true"){
            isCorrect = true;
            audioCorrect.play();
            element.setAttribute("style", "border: 2px solid green;");
        } else {
            isCorrect = false;
            audioIncorrect.play();
            element.setAttribute("style", "border: 2px solid red;");

        }
    };

    renderResult()
    // quiztime = pauseTime
    let t = setTimeout(()=>{
        pause = false;
        startTimer()
    }, delay);
    let t2 = setTimeout(rndrTransition, 1000)
    let t3 = setTimeout(quizRender, delay)
};


// Transition Screen

function rndrTransition(){
    let divText = ["Points: ", "Time: "];

    isCorrect = false;
    quizboxEl.innerHTML = '';
    headerEl.textContent ='';
    qCounter++;
    for (let i=0; i< 2; i++){
        div = document.createElement(div);
        div.setAttribute("class", "transition-div");
        quizboxEl.appendChild(div);
    };

    let divList = document.getElementsByClassName("transition-div");
    for (let i=0; i<divList.length; i++){
        divList[i].textContent = divText[i];
    };

};

// Points Calculator
// function pointsCalculator{
//     if (player.mode==="endless"||player.difficulty===random){
        
//     }
// };


// Answer Compiler
function answerCompiler(correctAnswer, eligible, blockArray, prop){
    let answerArray = [correctAnswer];
    let absoAnswer = correctAnswer.propMW(prop);
    let n = 0;
    let isRegion = false;
    let regionList = [];
    let censure = "Himno Nacional";
    let isCensure = false;

    function getNumber(arrayInput){
        n = Math.floor(Math.random()*arrayInput.length);
    };

    // checks the eligibility of a choice
    function checker(input, inputArray){
        let propCheck = input.propMW(prop);
        if (blockArray.includes(input)){
            return false;
        } else if (absoAnswer===propCheck){
            return false;
        } else if(inputArray.includes(input)){
            return false;
        } else if (isCensure){
            if (propCheck.includes(censure)){
                return false;
            };
        } else if(player.mode==="endless"){
            if (prop !== gdp){
                let diff = absoAnswer[1];
                if (diff===5&&propCheck[1]<4){
                    return false;
                } else if (diff===1&&propCheck[1]>2){
                    return false;
                } else if (diff-propCheck>1||propCheck-diff>1){
                    return false;
                };
            };
        } else {
            return true;
        };
        
    };

    // Checks if the national anthems are too similar
    if (absoAnswer.includes(censure)){
        isCensure = true;
    };

    // ensures that another choice of the same region as the answer is included if possible
    for (let i=0; i<eligible.length; i++){
        let isAdded = checker(eligible[i], regionList);
        let regionMatch = false;
        if (eligible[i].group===correctAnswer.group){
            regionMatch = true;
        }
        if (isAdded&&regionMatch){
            regionList.push(eligible[i]);
        };
    };
    console.log(regionList.length);
    if (regionList.length<1){
        isRegion = true;
    };
    // let isRegion = false;
    for (let i=0; i<3; i++){
        // getNumber()
        let arrayAdd = '';
        
        if (!isRegion){
            getNumber(regionList);
            arrayAdd = regionList[n];
            console.log(arrayAdd.label);

            isRegion = true;
        } else {
            getNumber(eligible);
            arrayAdd = eligible[n];
            let isAdded = checker(arrayAdd, answerArray);
            while (!isAdded){
                getNumber(eligible);
                arrayAdd = eligible[n];
                isAdded = checker(arrayAdd, answerArray);
            };
        };
        
        // while (arrayAdd===correctAnswer||blockArray.includes(arrayAdd)){
        //     getNumber();
        //     arrayAdd = eligible[n];
        // };
        answerArray.push(arrayAdd);
    };
    if (player.mode === "endless"||player.difficulty==="random"){
        discard = [];
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






// Game Reset
function gameReset(){
    player.mode = "standard";
    player.difficulty = reg;
    player.score = 0
    player.name =''
    outBounds = [];
    discard = [];
    isCorrect = false;
    headerEl.textContent ='';

}


// Game End



// Start
// init();
renderStart();

if (screen==="start"){
    quizboxEl.addEventListener("click", startGameCl);
};
// else if(screen==="quiz"){
//     quizboxEl.addEventListener("click", resultCl);
// };