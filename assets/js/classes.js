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

const capital = new countryProp("capital", "Capitals", 1);
const gdp = new countryProp("GDP", "Gross Domestic Product", 5);
const hos = new countryProp("head of state", "Heads of State", 4);
const currency = new countryProp("currency", "National Currencies", 2);
const natAnth = new countryProp("national anthem", "National Anthems", 3);
let countryProps = [capital, gdp, hos, currency, natAnth];