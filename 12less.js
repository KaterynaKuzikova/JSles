const SIZES = {
    SMALL:{
        price:50,
        calories:20,
    },
    MIDDLE:{
        price:75,
        calories:30,
    },
    BIG:{
        price:100,
        calories:40,
    },
};

const TOPINGS = {
    CHEESE:{
        price:10,
        calories:20,
    },
    SALAD:{
        price:20,
        calories:5,
    },
    POTATO:{
        price:15,
        calories:10,
    },
    FLAVORING:{
        price:15,
        calories:0,
    },
    MAYONNAISE:{
        price:20,
        calories:5,
    },
};


function Hamburger (size){
    this.size = size;
    this.topings =[];
}

Hamburger.prototype.addTopping = function(toping){
    this.topings.push(toping);
};

Hamburger.prototype.getPrice = function(){
    return this.topings.reduce((a, e) => a += e.price, this.size.price);
};

Hamburger.prototype.getCallories = function(){
    return this.topings.reduce((a, e) => a += e.calories, this.size.calories);
};



const smallHamburger = new Hamburger(SIZES.SMALL);
smallHamburger.addTopping(TOPINGS.MAYONNAISE);
smallHamburger.addTopping(TOPINGS.POTATO);

const totalPrice = smallHamburger.getPrice();
const totalCalories = smallHamburger.getCallories();

console.log("Price with topings: " + smallHamburger.getPrice());

console.log("Callories with topings: " + smallHamburger.getCallories());

