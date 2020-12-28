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

//create MenuItem instances for the required pizzas in assignment - include name, ingredients, prices
var pizza1 = new MenuItem("Regina",[bHam,mush],[650,850,1050]);
var pizza2 = new MenuItem("Hawaiian",[bHam,pine],[650,850,1050]);
var pizza3 = new MenuItem("Veggie",[redOn,mxPep,mush,blkOl,freTom],[750,950,1150]);
var pizza4 = new MenuItem("Zzesty Peperoni Passion",[pep,redCh],[750,950,1150]);
var pizza5 = new MenuItem("Chicken Bali",[grChik,pine,mush,redCh],[750,950,1150]);
var pizza6 = new MenuItem("BBQ Chicken",[grChik,redOn,swCor],[950,1150,1350]);

//prints out each MenuItem instances created from above
console.log(pizza1);
console.log(pizza2);
console.log(pizza3);
console.log(pizza4);
console.log(pizza5);
console.log(pizza6);

//creating a Menu instance and adding the 6 MenuItem instances
//to the Menu instance - giving the Menu instance access to the MenuItem instances
var fullMenu = new Menu();
fullMenu.addMenuItem(pizza1);
fullMenu.addMenuItem(pizza2);
fullMenu.addMenuItem(pizza3);
fullMenu.addMenuItem(pizza4);
fullMenu.addMenuItem(pizza5);
fullMenu.addMenuItem(pizza6);

//use findMenuItem method to search all the pizzas that contain pineapple as an ingredient
console.log("\nPizzas containing: pineapple");
//console.log(fullMenu.menu);
fullMenu.findMenuItems("pineapple")