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
    // let startSections = document.createElement('ul')
    // let gameOptions = document.createElement('ul');
    // let diffOptions = document.createElement('ul');
    // let startButton = document.createElement('button');
    // let sections = [];
    // let mode = {
    //     label: "mode",
    //     titleTxt: "Choose Game Mode",
    //     rndr: (parent, array)=>{
    //         let title = document.createElement('h4');
    //         let ul = document.createElement('ul');
    //         title.textContent = this.titleTxt;
    //         ul.setAttribute("class", this.label);
    //         for (let i=0; i<array.length; i++){
    //             let li = document.createElement('li');
    //             // let proper = 
    //             li.textContent = capitalize(this.label, 0);
    //             // li.setAttribute("class", String(array)+" "+array[i]);
    //             // if (array[i].label)
    //             li.setAttribute("class", array[i]);
    //             ul.appendChild(li);
    //         }
    //         parent.appendchild(ul);

    //         // parent.setAttribute("style", "display: flex; ")

    //     }
    // }
    let sectionClasses =[mode, diffLevel, startBtn];
    for (let i=0; i<sectionClasses.length; i++){
        let section = document.createElement('section');
        // section.setAttribute("class", sectionClasses[i]);
        sectionClasses[i].rndr(section);
        quizboxEL.appendChild(section);
    };

    // for (let i=0; i<quizboxEL.children.length; i++){
    //     if (quizboxEL.children[i]==="")
    // };

    // for (let i=0; i<diffLevels.length; i++){

    // };

    // for (let i=0; i<diffLevels.length; i++){

    // };

    headerEl.textContent = "New Game";
};

function init(){
    
    renderStart();
};

init()