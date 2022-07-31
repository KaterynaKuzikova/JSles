
const products = [
  {
    price: 200,
    name: "TV",
    amount: 3,
    discaunt: 5,
    availableIn: ["Odessa", "Kyiv", "Lviv"],
  },
  {
    price: 300,
    name: "Phone",
    amount: 5,
    discaunt: 10,
    availableIn: ["Baden-baden", "Kyiv", "Lviv"],
  },
  {
    price: 200,
    name: "oven",
    amount: 10,
    discaunt: 13,
    availableIn: ["Chernobaivka", "Lviv", "Zaporoje"],
  },
  {
    price: 400,
    name: "iron",
    amount: 32,
    discaunt: 0,
    availableIn: ["Kharkiv", "Vilnus", "Mykolaiv"],
  },
];


const totalPrice = products.reduce((summ, element) => (summ += element.price * element.amount), 0);

const totalDiscountPrice = products.reduce((summ, element) => 
(summ += (element.price - element.price * element.discaunt / 100) * element.amount), 0);

const allCities = getAllCities(products);

function getAllCities(products) {
  return products.reduce((acc, element) => {
    acc.push(Object.values(element.availableIn));
    return acc;
  }, []);
}

const newArrCities = allCities.flat();

function selectCities(newArrCities) {
  return newArrCities.filter((el, i) => newArrCities.indexOf(el) === i);
}

function filterCity(newArrCities){  
  return newArrCities.filter((el, i) => newArrCities.indexOf(el) !== i);
}

function removeAlIdenticalCities(listDuplCities) {
  return listDuplCities.filter((el, i) => listDuplCities.indexOf(el) === i);
};

const listCities = selectCities(newArrCities);
const listDuplCities = filterCity(newArrCities);
const listDuplCitiesWithoutRepete = removeAlIdenticalCities(listDuplCities);

  console.log(totalPrice);
  console.log(totalDiscountPrice); 
  console.log(listCities);
  console.log(listDuplCitiesWithoutRepete);
  

 