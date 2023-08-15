class country {
    constructor(name, capital, gdp, hos, currency, natAnth, group){
        this.name = name;
        this.capital = capital;
        this.gdp = gdp;
        this.hos = hos;
        this.currency = currency;
        this.natAnth = natAnth;
        this.group = group;
        this.active = [capital, gdp, hos, currency, natAnth];
    }
};