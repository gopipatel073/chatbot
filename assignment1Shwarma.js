const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    OPTION:    Symbol("option"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    PAYMENT:    Symbol("payment")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sOption = "";
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "";
        this.sPayment = "";
    }
    handleInput(sInput){
        let aReturn = [];
        if(sInput === "ORDER")
            {
                aReturn.push(`Your orders is: Size: ${this.sSize}, Item: ${this.sOption}, Toppings: ${this.sToppings}, Drinks: ${this.sDrinks}`)
                return aReturn;
            }
        switch(this.stateCur)
            {
                case OrderState.WELCOMING:
                    this.stateCur = OrderState.OPTION;
                    aReturn.push("Welcome to Gopi's Maxican cafe.");
                    aReturn.push("What kind of dish do you like to eat?");
                    aReturn.push(" Burritobowl , Wrap ");
                    break;

                case OrderState.OPTION:        
                    this.stateCur = OrderState.SIZE;
                    this.sOption = sInput;
                    aReturn.push('What size do you want?')
                    aReturn.push(" Large , Medium , Small ");
                    break;

                case OrderState.SIZE:
                    this.stateCur = OrderState.TOPPINGS;
                    this.sSize = sInput;
                    aReturn.push("What toppings would you like?");
                    aReturn.push(" Falafal , Chicken , Tofu , Vegies ");
                    break;

                case OrderState.TOPPINGS:
                    this.stateCur = OrderState.DRINKS;
                    this.sToppings = sInput;
                    aReturn.push("Your order would be ready in next 3 minutes. ");
                    aReturn.push("Do you need any drink?");
                    aReturn.push(" CanadaDry , Crush , Sprite , DietCoke ");
                    break;

                case OrderState.DRINKS:
                    this.stateCur = OrderState.PAYMENT;   
                    if(sInput.toLowerCase() != "no")
                    {
                        this.sDrinks = sInput;
                    }
                    aReturn.push("How would you like to pay?"); 
                    aReturn.push(" Visa , DebitCard , Cash ");
                    break;

                case OrderState.PAYMENT:
                    this.isDone(true);
                    aReturn.push("Thank you for your order");
                    aReturn.push(`${this.sSize} ${this.sOption} with ${this.sToppings}`);
                    if(this.sDrinks){
                        aReturn.push(this.sDrinks);
                    }
                    let d = new Date(); 
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                    break;
            }
            return aReturn;
    }
}