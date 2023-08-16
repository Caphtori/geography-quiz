class country {
    constructor(name, capital, gdp, hos, currency, natAnth, group){
        this.name = name;
        this.capital = capital;
        this.gdp = gdp;
        this.hos = hos;
        this.currency = currency;
        this.natAnth = natAnth;
        this.group = group;
    }
};

class countryProp{
    constructor(label, title, dl){
        this.label = label;
        this.title = title;
        this.dl = dl;
    }
};

class diffOption{
    constructor(name, range, level, clr){
        this.name = name;
        this.range = range;
        this.level =level;
        this.clr = clr;
    }
};

class starterRndr{
    constructor(label, titletxt, array){
        this.label = label;
        this.titletxt = titletxt;
        this.array = array;
    }
    rndr (parent) {
        let title = document.createElement('h4');
        let ul = document.createElement('ul');
        title.textContent = this.titleTxt;
        // ul.setAttribute("class", this.label);
        ul.setAttribute("class", "starter-ul");
        for (let i=0; i<this.array.length; i++){
            let li = document.createElement('li');
            if (this.array[i].label !== undefined){
                li.textContent = capitalize(this.array[i], 0);
            } else {
                li.textContent = this.array[i].label;
            };
            // if (this.array[i].label !== undefined){
            //     li.setAttribute("class", String(this.array[i]));
            // } else{
            //     li.setAttribute("class", this.array[i]);
            // };
            if (this.array[i].clr !== undefined){
                li.setAttribute("style", "background-color: array[i].clr");
            };
            ul.appendChild(li);
        }
        parent.appendChild(ul);
    }
}

// class gameMode{
//     constructor(label, clr, txtClr){
//         this.label = label;
//         this.clr = clr;
//     }
// };

const capital = new countryProp("capital", "Capitals", 1);
const gdp = new countryProp("GDP", "Gross Domestic Product", 5);
const hos = new countryProp("head of state", "Heads of State", 4);
const currency = new countryProp("currency", "National Currencies", 2);
const natAnth = new countryProp("national anthem", "National Anthems", 3);
let countryProps = [capital, gdp, hos, currency, natAnth];



const baby = new diffOption("Baby", [1], 1, "#89cff0");
const easy = new diffOption("Easy", [1, 2], 2, "#90EE90");
const reg = new diffOption("Regular", [2, 3, 4], 3, "#FFFF00");
const hard = new diffOption("Hard", [4, 5], 4, "#ff4500");
const extreme = new diffOption("Extreme", [5], 5, "#FF000D");
const random = new diffOption("Random", [1, 2, 3, 4, 5], 0, "#cc8899");

// let diffLevels = [baby, easy, reg, hard, extreme, random];

// const standard = new gameMode("standard", "")

const mode = new starterRndr("mode", "Choose Game Mode", ["standard", "endless"]);
const diffLevel = new starterRndr("difflvl", "Choose Difficulty Level", [baby, easy, reg, hard, extreme, random]);
let startBtn = {
    label: "START",
    rndr: (parent)=>{
        let button = document.createElement('button');
        button.setAttribute("class", "startBtn");
        button.textContent = this.label;

        parent.appendChild(button);
    }
}