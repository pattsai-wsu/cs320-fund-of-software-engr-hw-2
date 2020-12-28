//Patrick Tsai Student ID: 011709316
//CS320 MW 10:30am

class MenuItem {
    //constructs a MenuItem instance with "name" string, "ingredients" array, and "prices" array attributes
    constructor(nameIn, ingredientsIn, pricesIn) {
        this.name = nameIn;
        this.ingredients = ingredientsIn;
        this.prices = pricesIn;
    }
}

class Menu {
    //constructs an array that will hold MenuItem instances
    constructor(){
        this.menu = [];
    }

    //addMenuItem method - pushes MenuItem to the menu array created by the Menu constructor, in Menu class
    addMenuItem(item){
        this.menu.push(item);
    }

    //findMenuItems method - finds pizzas based on a ingredient, iterate with a for loop, prints pizza name if match
    findMenuItems(topping) {
        for(let menuItem of this.menu) {
            for (let ingredients of menuItem.ingredients) {
                if (topping === ingredients) {
                    console.log(menuItem.name);
                }
            }
        }
    }
}

class Pizza {
    //Pizza object created when adding a pizza to an order with the addPizza method in the Order class
    //properties of Pizza object are - "name" string, "ingredients" array, "size" string, "crust" string
    constructor(menuItemIn,sizeIn,crustIn){
        this.name = menuItemIn.name;
        this.ingredients = menuItemIn.ingredients;
        switch (sizeIn) {
            case "Small":   this.cost=menuItemIn.prices[0];
                break;
            case "Medium":  this.cost = menuItemIn.prices[1];
                break;
            case "Large":   this.cost = menuItemIn.prices[2];
                break;
        }
        this.size = sizeIn;
        this.crust = crustIn;
    }
}

class Order {
    //creates an array, that will hold Pizza instances added by the addPizza() method in the Order class
    constructor() {
        this.order = []
    }

    //adds Pizza instances to the Order array. must include pizza: name, size and crust type
    addPizza(pizzaIn,sizeIn,crustIn) {
        let pizza = new Pizza(pizzaIn,sizeIn,crustIn);
        this.order.push(pizza);
    }

    //the totalCost() method sums up the total cost of the pizza ordered - this method is called in the receiptPrintOut() method of the Order Class
    totalCost() {
        var sum = 0;
        for(let pizza of this.order) {
            sum = sum + pizza.cost;
        }
        return (sum);
    }

    //receiptPrintOut() method - prints out the name, size, crust type, and cost of pizzas ordered also prints out the total cost of the order
    receiptPrintOut() {
        var returnText = "\n\nRECEIPT OF PURCHASE";
        var grandTotal;
        var line = "\n=================================\n";

        for(let pizza of this.order) {
            returnText = returnText + "\n" + pizza.name + " - " + pizza.size + ", " + pizza.crust + ": " + "\t\t" + pizza.cost;
        }

        grandTotal = this.totalCost();
        returnText = returnText + line;
        returnText = returnText + "TOTAL\t\t\t\t\t\t" + grandTotal;
        return (returnText);
    }
}

//ingredients variables used to avoid spelling inconsistencies when creating MenuItem instances
var bHam = "beef ham";
var mush = "mushrooms";
var pine = "pineapple";
var redOn = "red onion";
var mxPep = "mixed peppers";
var blkOl = "black olive";
var freTom = "fresh tomatoes";
var pep = "pepperoni";
var redCh = "red chili";
var grChik = "grilled chicken";
var swCor = "sweet corn";

//prices variables - refactor from Phase1.js - used to avoid inconsistencies when creating MenuItem instances
var classic = [650,850,1050];
var favourite = [750,950,1150];
var ultimate = [950,1150,1350];

//create MenuItem objects - refactor from Phase1.js changed names of instances from pizza1-6 to names of pizzas - include name, ingredients, prices
var regina = new MenuItem("Regina",[bHam,mush],classic);
var hawaiian = new MenuItem("Hawaiian",[bHam,pine],classic);
var veggie = new MenuItem("Veggie",[redOn,mxPep,mush,blkOl,freTom],favourite);
var zzestyPepperoniPassion = new MenuItem("Zzesty Peperoni Passion",[pep,redCh],favourite);
var chickenBali = new MenuItem("Chicken Bali",[grChik,pine,mush,redCh],favourite);
var bbqChicken = new MenuItem("BBQ Chicken",[grChik,redOn,swCor],ultimate);

//prints out each MenuItem instances created from above
/*
console.log(regina);
console.log(hawaiian);
console.log(veggie);
console.log(zzestyPepperoniPassion);
console.log(chickenBali);
console.log(bbqChicken);
 */

//creating a Menu instance and adding the 6 MenuItem instances to the Menu instance - giving the Menu instance access to the MenuItem instances
var fullMenu = new Menu();
fullMenu.addMenuItem(regina);
fullMenu.addMenuItem(hawaiian);
fullMenu.addMenuItem(veggie);
fullMenu.addMenuItem(zzestyPepperoniPassion);
fullMenu.addMenuItem(chickenBali);
fullMenu.addMenuItem(bbqChicken);

//use findMenuItem method to search all the pizzas that contain pineapple as an ingredient
/*
console.log("\nPizzas containing: pineapple");
fullMenu.findMenuItems("pineapple")
*/

//adding a new order - multiple pizzas added to order
//this example will add - regina, veggie, and bbqChicken
let myOrder = new Order;
myOrder.addPizza(regina,"Small","Thin");
myOrder.addPizza(veggie,"Large","Thin");
myOrder.addPizza(bbqChicken,"Medium","Hand Tossed");

//prints out a receipt showing which pizza were ordered
//how much each pizza is and the total cost of the entire order
var receipt = myOrder.receiptPrintOut();
console.log(receipt);