let rootEl = document.querySelector('#root');
let timerEl = document.querySelector('#timer');
let difficultyEl = document.querySelector('#difficulty');
let scoreEl = document.querySelector('#score');
let headerEl = document.querySelector('#qcard-title');
let quizboxEL = document.querySelector('#quizbox');

// let gameModes = ["standard", "endless"]

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

function init(){
    
    renderStart();
};

init()