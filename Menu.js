class MenuItem {
    constructor(nameIn, ingredientsIn, pricesIn) {
        var name;
        var ingredients;
        var prices;
        this.name = nameIn;
        this.ingredients = ingredientsIn;
        this.prices = pricesIn;
    }
}

class Menu {
    constructor(){
        this.menu = [];
    }

        addMenuItem(item){
          this.menu.push(item);
    }

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

//ingredients
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

//create MenuItem objects - include name, ingredients, prices
var pizza1 = new MenuItem("Regina",[bHam,mush],[650,850,1050]);
var pizza2 = new MenuItem("Hawaiian",[bHam,pine],[650,850,1050]);
var pizza3 = new MenuItem("Veggie",[redOn,mxPep,mush,blkOl,freTom],[750,950,1150]);
var pizza4 = new MenuItem("Zzesty Peperoni Passion",[pep,redCh],[750,950,1150]);
var pizza5 = new MenuItem("Chicken Bali",[grChik,pine,mush,redCh],[750,950,1150]);
var pizza6 = new MenuItem("BBQ Chicken",[grChik,redOn,swCor],[950,1150,1350]);

console.log(pizza1);
console.log(pizza2);
console.log(pizza3);
console.log(pizza4);
console.log(pizza5);
console.log(pizza6);

var fullMenu = new Menu();
fullMenu.addMenuItem(pizza1);
fullMenu.addMenuItem(pizza2);
fullMenu.addMenuItem(pizza3);
fullMenu.addMenuItem(pizza4);
fullMenu.addMenuItem(pizza5);
fullMenu.addMenuItem(pizza6);

console.log("\npizzas containing beef ham");
fullMenu.findMenuItems("beef ham")

console.log("\npizzas containing mushrooms");
fullMenu.findMenuItems("mushrooms")
