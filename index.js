// ----------- Grab Variables -------------
const menuContainer = document.querySelector("#menuContainer")
const drinkDisplay = document.querySelector("#drinkDisplay")
const cart = document.querySelector("#cart")
const customDrink = document.querySelector("#customDrink")
const url = "http://localhost:3000/coffee"

// --------------- fetch request -----------
fetchDrinks()
function fetchDrinks() {
  return fetch(url)
    .then((response) => response.json())
    .then((drinkArray) => displayDrinks(drinkArray))
}
// make a card for each coffee and append to menu?
function displayDrinks(drinkArray) {
  drinkArray.forEach((drink) => {
    const drinkCard = document.createElement("div")
    drinkCard.className = "drinkCard"
    drinkCard.innerHTML = `
        <h2>${drink.name}</h2>
        <img src =${drink.image} > 
        `
    menuContainer.append(drinkCard)
  })
}

//Fetch Coffees
//render Images into menu container with names
//add click event to coffee cards that:
//render image, name, form to drink display
//a form with editable size, flavor
//also default values for coffee selected, size, flavor
//price
//an add to cart button

//add to cart button will:
//add list item to cart container with:
//price that will update on bottom bar as drinks are added
//name of drink
//delete button

//create a drink form with:
//default values for all inputs
//base drink
//flavor dropdown
//size dropdown
//name input-will replace drink name when posted to db.json

//STRETCH
//populate nav bar with filter option for coffee/tea
//add comment section (reviews for shop)
//add star rating?
//change CSS featues based on selected flavor
//reflect price when flavors and size are changed
//
