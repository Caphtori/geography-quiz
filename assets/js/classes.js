class country {
    static instances = [];
    constructor(label, capital, gdp, hos, currency, natAnth, group){
        this.label = label;
        this.capital = capital;
        this.gdp = gdp;
        this.hos = hos;
        this.currency = currency;
        this.natAnth = natAnth;
        this.group = group;
        country.instances.push(this);
    }
    propMW(input){
        let n = 0;
        let propArray = [this.capital, this.gdp, this.hos, this.currency, this.natAnth];
        for (let i = 0; i<countryProp.instances.length; i++){
            if (countryProp.instances[i]===input){
                n=i
            };
        };
        return propArray[n];
    }
};


class countryProp{
    static instances=[];
    constructor(label, title, dl){
        this.label = label;
        this.title = title;
        this.dl = dl;
        countryProp.instances.push(this);
    }
};


class diffOption{
    constructor(label, range, points, time, clr){
        this.label = label;
        this.range = range;
        this.points = points;
        this.time = time;
        this.clr = clr;
        
    }
    titleBg (){
        let bg = "background-clr: "+this.clr;
        difficultyEl.setAttribute("style", bg);
    } 
};


class starterRndr{
    static instances=[];
    constructor(label, titletxt, array){
        this.label = label;
        this.titleTxt = titletxt;
        this.array = array;
        starterRndr.instances.push(this);
    }

    rndr (parent) {
        let varSelected = null;
        if (this ===diffLevel){
            // Changed from [2] because baby difficulty is now removed
            varSelected = this.array[1];
        } else {
            varSelected = this.array[0];
        };
        
        let title = document.createElement('h4');
        title.setAttribute("class", "starter-title");
        title.textContent = this.titleTxt;
        let button = document.createElement('button');
        button.setAttribute('class', "choiceBtn");
        let btnList = document.getElementsByClassName("choiceBtn");
        rndrndr(button, varSelected)
        parent.appendChild(title);
        parent.appendChild(button);
        if (mode.array.includes(varSelected)){
            button.addEventListener("click", clickemMode);
        } else {
            button.addEventListener("click", clickEmDiff);
        }
    }
};

function rndrndr(btn, val){
    if (diffLevel.array.includes(val)){
        let bg = "background-color: "+val.clr;
        btn.textContent = val.label;
        btn.setAttribute("style", bg);
    } else {
        btn.textContent = capitalize(val, 0);

    }
};

function clickemMode(event){
    event.preventDefault();
    let element = event.target
    let btnList = document.getElementsByClassName("choiceBtn");
    // let thisBtn = btnList[0];
    let otherBtn = btnList[1];
    let revertStyle = "visibility: visible; background-color: "+player.difficulty.clr;

    if (player.mode==="standard"){
        player.mode = "endless"
        player.difficulty = reg;
        element.textContent = "Endless";
        otherBtn.setAttribute("style", "visibility: hidden;");
        difficultyEl.textContent = player.mode;
        difficultyEl.setAttribute("style", "background-color: white;")
    } else {
        player.mode = "standard";
        element.textContent = "Standard";
        otherBtn.setAttribute("style", revertStyle);
        difficultyEl.textContent = player.difficulty.label;
        // difficultyEl.setAttribute("style", revertStyle);
    };
};

function clickEmDiff(event){
    event.preventDefault();
    let element = event.target
    let btnList = document.getElementsByClassName("choiceBtn");
    // let thisBtn = btnList[1];
    let n = diffLevel.array.indexOf(player.difficulty);
    
    n++;
    if (n>diffLevel.array.length-1){
        player.difficulty = diffLevel.array[0];
        
    } else {
        player.difficulty = diffLevel.array[n];
    }
    let bg = "background-color: "+player.difficulty.clr;
    element.textContent = player.difficulty.label;
    element.setAttribute("style", bg);
    difficultyEl.textContent = player.difficulty.label;
    difficultyEl.setAttribute("style", bg);
    // hisBtn.setAttribute("style", player.difficulty.bg)
    // player.difficulty.titleBg();

    
}

const capital = new countryProp("capital", "Capitals", 1);
const gdp = new countryProp("GDP", "Gross Domestic Product (USD)", 5);
const hos = new countryProp("head of state", "Heads of State", 4);
const currency = new countryProp("currency", "National Currencies", 2);
const natAnth = new countryProp("national anthem", "National Anthems", 3);



const baby = new diffOption("Baby", [1], 1, 0, "#89cff0");
const easy = new diffOption("Easy", [1, 2], 2, 1, "#90EE90");
const reg = new diffOption("Normal", [2, 3, 4], 3, 3, "#FFFF00");
const hard = new diffOption("Hard", [4, 5], 4, 5, "#ff4500");
const extreme = new diffOption("Extreme", [5], 5, 7, "#FF000D");
const random = new diffOption("Random", [1, 2, 3, 4, 5], 0, 4, "#9966CB");



const mode = new starterRndr("mode", "Choose Game Mode", ["standard", "endless"]);
// const diffLevel = new starterRndr("difflvl", "Choose Difficulty Level", [baby, easy, reg, hard, extreme, random]);

// Removed Baby mode from array because it is brokeon.
const diffLevel = new starterRndr("difflvl", "Choose Difficulty Level", [easy, reg, hard, extreme, random]);
let startBtn = {
    label: "START",
    rndr: function(parent){
        let button = document.createElement('button');
        button.setAttribute("class", "startBtn");
        // button.textContent = this.label;
        button.textContent = this.label;

        parent.appendChild(button);
        button.addEventListener("click", startGameCl, { once: true });
    }
}