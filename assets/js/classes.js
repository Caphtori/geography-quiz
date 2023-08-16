class country {
    constructor(label, capital, gdp, hos, currency, natAnth, group){
        this.label = label;
        this.capital = capital;
        this.gdp = gdp;
        this.hos = hos;
        this.currency = currency;
        this.natAnth = natAnth;
        this.group = group;
    }
   propMW(input){
        let n = 0;
        let propArray = [this.capital, this.gdp, this.hos, this.currency, this.natAnth];
        for (let i = 0; i<countryProps.length; i++){
            if (countryProps[i]===input){
                n=i
            };
        };
        return propArray[n];
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
    constructor(label, range, level, clr){
        this.label = label;
        this.range = range;
        this.level =level;
        this.clr = clr;
    }
};

class starterRndr{
    constructor(label, titletxt, array){
        this.label = label;
        this.titleTxt = titletxt;
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
                li.textContent = this.array[i].label;
            } else {
                li.textContent = capitalize(this.array[i], 0);
            };
            if (this.array[i].clr !== undefined){
                let bg = "background-color: "+this.array[i].clr;
                li.setAttribute("style", bg);
            };
            ul.appendChild(li);
        }
        parent.appendChild(title);
        parent.appendChild(ul);
    }
}

const capital = new countryProp("capital", "Capitals", 1);
const gdp = new countryProp("GDP", "Gross Domestic Product (USD)", 5);
const hos = new countryProp("head of state", "Heads of State", 4);
const currency = new countryProp("currency", "National Currencies", 2);
const natAnth = new countryProp("national anthem", "National Anthems", 3);
let countryProps = [capital, gdp, hos, currency, natAnth];



const baby = new diffOption("Baby", [1], 1, "#89cff0");
const easy = new diffOption("Easy", [1, 2], 2, "#90EE90");
const reg = new diffOption("Regular", [2, 3, 4], 3, "#FFFF00");
const hard = new diffOption("Hard", [4, 5], 4, "#ff4500");
const extreme = new diffOption("Extreme", [5], 5, "#FF000D");
const random = new diffOption("Random", [1, 2, 3, 4, 5], 0, "#9966CB");



const mode = new starterRndr("mode", "Choose Game Mode", ["standard", "endless"]);
const diffLevel = new starterRndr("difflvl", "Choose Difficulty Level", [baby, easy, reg, hard, extreme, random]);
let startBtn = {
    label: "START",
    rndr: function(parent){
        let button = document.createElement('button');
        button.setAttribute("class", "startBtn");
        // button.textContent = this.label;
        button.textContent = this.label;

        parent.appendChild(button);
    }
}