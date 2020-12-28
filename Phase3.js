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
    //refactor from Phase2.js - added the "make" boolean property, used to signify if enough ingredients to "make" pizza - default is true
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
        this.make = true;
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

    //bubble sort tailored to ordering the pizzas - reorders the Order Instance by size from small to large
    //refactor of Order class from Phase2.js - added the maxPizzaMake() method
    bubbleSortPizzaOrder() {
        let len = this.order.length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < (len-1); j++) {
                    if ((this.order[j].size === "Medium" && this.order[j + 1].size === "Small") || (this.order[j].size ==="Large" && this.order[j + 1].size === "Small")  || (this.order[j].size === "Large" && this.order[j + 1].size === "Medium")) {
                        let tmp = this.order[j];
                        this.order[j] = this.order[j + 1];
                        this.order[j + 1] = tmp;
                    }
                }
            }
    }

    //the totalCost() method sums up the total cost of the pizza ordered - this method is called in the receiptPrintOut() method of the Order Class
    totalCost() {
        var sum = 0;
        for(let pizza of this.order) {
            if (pizza.make === true) {
                sum = sum + pizza.cost;
            }
        }
        return (sum);
    }

    //receiptPrintOut() method - prints out the name, size, crust type, and cost of pizzas ordered also prints out the total cost of the order
    //refactor from Phase2.js - at bottom of receipt, prints out the pizzas that cannot be made due to lack of ingredients
    receiptPrintOut() {
        var returnText = "\nRECEIPT OF PURCHASE\n";
        var grandTotal;
        var badPizza = false;
        var sorry = "THE FOLLOWING PIZZAS COULD NOT BE MADE\nDUE TO LACK OF INGREDIENTS\n";
        var line = "\n=======================================================\n";

        for (let pizza of this.order) {
            if (pizza.make === true) {
                returnText = returnText + "\n" + pizza.name + " - " + pizza.size + ", " + pizza.crust + ":\t\t" + pizza.cost;
            }
        }

        for (let pizza of this.order) {
            if (pizza.make === false) {
                badPizza = true;
                sorry = sorry + "\n" + pizza.name + " - " + pizza.size + ", " + pizza.crust;
            }
        }

        grandTotal = this.totalCost();
        returnText = returnText + line + "TOTAL\t\t\t\t\t\t" + grandTotal + line;

        if (badPizza === true) {
            returnText = returnText + sorry + line;
        }

        return (returnText);
    }
}

class Inventory {
    //constructs an array of ingredients and their initial quantities
    constructor() {
        this.inventory = [
            {ingredient: bHam, quantity: 4},
            {ingredient: mush, quantity: 4},
            {ingredient: pine, quantity: 4},
            {ingredient: redOn, quantity: 2},
            {ingredient: mxPep, quantity: 4},
            {ingredient: blkOl, quantity: 4},
            {ingredient: freTom, quantity: 4},
            {ingredient: pep, quantity: 4},
            {ingredient: redCh, quantity: 4},
            {ingredient: grChik, quantity: 4},
            {ingredient: swCor, quantity: 4}
        ];
    }
}

class Store {
    //a Store instance will create an array of ingredients and their initial quantities based on quantities held in the Inventory class
    constructor(inventory) {
        this.currentInventory = inventory;
    }

    //placeHolder() method - checks if each pizza, based an order, can be made - dependent on the amount of existing ingredients
    //if the pizza can be made, the method will subtract the ingredients from the Store instance (and the "make" property of Pizza instance remains true)
    //if a pizza cannot be made, the method will not subtract the ingredients from the Store instance, and the "make" property of that particular Pizza is set to false
    placeHolder(currentOrder) {
        var i=0;
        while (i < currentOrder.order.length){
            var pSize = currentOrder.order[i].size;
            var pSizeScaler;

            //array to hold the index of "matched" ingredients in the Store array instance
            var invenHold = [];

            switch(pSize) {
                case "Small": pSizeScaler= 1;
                            break;
                case "Medium": pSizeScaler = 2;
                            break;
                case "Large": pSizeScaler = 3;
            }

            //match the ingredients of Order Pizza instance and the ingredients in the Store array (current ingredient inventory)
            for(let topping of currentOrder.order[i].ingredients) {
                var h=0;
                while(topping !== this.currentInventory.inventory[h].ingredient) {
                    h++;
                }

                //push the index of the matched ingredient in the Store inventory to array
                invenHold.push(h);

                //if not enough ingredients - set Pizza "make" property to false
                if((this.currentInventory.inventory[h].quantity - pSizeScaler) < 0){
                     currentOrder.order[i].make = false;
                     break
                }
            }

            //if Pizza can be made - loop through the matched ingredient array, and subtract the scaler quantity set by the size of the pizza
            if(currentOrder.order[i].make === true) {
                for(let quan of invenHold) {
                    this.currentInventory.inventory[quan].quantity -= pSizeScaler;
                }
            }

            //reset matched ingredient array to 0 size
            invenHold.length = 0;
            i++;
        }
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
// this example will add - regina, veggie, and bbqChicken
let myOrder = new Order;
myOrder.addPizza(regina,"Small","Thin");
myOrder.addPizza(veggie,"Large","Thin");
myOrder.addPizza(bbqChicken,"Medium","Hand Tossed");

//bubble sort to order pizzas by size from small to large
myOrder.bubbleSortPizzaOrder();

//initializes an instance of Inventory - all initial quanitities of ingredients are contained the Inventory class
let inventory = new Inventory();

//initializes an instance of Store - this instance will keep current quantities of ingredients with respect to pizzas already made
let currentInventory = new Store(inventory);
currentInventory.placeHolder(myOrder);

//prints out a receipt showing which pizza were ordered
//how much each pizza is and the total cost of the entire order - and if any pizzas cannot be made due to lack of ingredients
var receipt = myOrder.receiptPrintOut();
console.log(receipt);

//testing
//for (let obj of inventory.inventory) {
//        console.log(obj.ingredient + " " + obj.quantity);
//}