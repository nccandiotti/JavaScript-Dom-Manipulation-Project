// ----------- Grab Variables -------------

const menuContainer = document.querySelector("#menuContainer")
const drinkDisplay = document.querySelector("#drinkDisplay")
const cart = document.querySelector("#cart")
const customDrink = document.querySelector("#customDrink")
const allCoffeesUrl = "http://localhost:3000/coffee"
const customDrinkForm = document.querySelector("#customDrinkForm")

// --------------- fetch request -----------

fetchDrinks()
function fetchDrinks() {
  return fetch(allCoffeesUrl)
    .then((response) => response.json())
    .then((drinkArray) => {
      drinkArray.forEach((drinkObj) => displayDrinks(drinkObj))
    })
}

//---------logic------>

function displayDrinks(drinkObj) {
  const drinkCard = document.createElement("div")
  drinkCard.className = "drinkCard"
  drinkCard.innerHTML = `
        <h2>${drinkObj.drink}</h2>
        <img src =${drinkObj.image}> 
        `
  if (!drinkObj.id || drinkObj.id > 5) {
    const customDrinkDeleteBtn = document.createElement("button")
    customDrinkDeleteBtn.textContent = "TRASHCAN"
    drinkCard.append(customDrinkDeleteBtn)
    customDrinkDeleteBtn.addEventListener("click", () => {
      fetch(`http://localhost:3000/coffee/${drinkObj.id}`, {
        method: "DELETE",
      })
      drinkCard.remove()
    })
  }
  drinkCard.addEventListener("click", () => createModalCard(drinkObj))
  menuContainer.append(drinkCard)
}

//-----------------------------------------

function createModalCard(drinkObj) {
  const modalCard = document.createElement("div")
  modalCard.className = "modalCard"
  modalCard.style.display = "grid"
  const coffeeName = document.createElement("p")
  const coffeePrice = document.createElement("p")
  const coffeeImage = document.createElement("img")
  const exitButton = document.createElement("button")

  coffeeName.className = "name"
  coffeePrice.className = "coffeePrice"

  coffeeName.textContent = drinkObj.drink
  coffeePrice.textContent = drinkObj.price
  coffeeImage.style.maxHeight = "200px"
  coffeeImage.src = drinkObj.image

  exitButton.className = "close-modal"
  exitButton.textContent = "x"
  exitButton.addEventListener("click", () => {
    modalCard.style.display = "none"
  })

  if (!drinkObj.id || drinkObj.id > 5) {
    modalCard.id = "customModalCard"
  }

  modalCard.append(exitButton)
  modalCard.append(coffeeName)
  modalCard.append(coffeePrice)
  menuContainer.append(modalCard)
  createModalForm(modalCard)
  modalCard.append(coffeeImage)
}

//--------------------------------------------

function createModalForm(modalCard) {
  if (modalCard.id !== "customModalCard") {
    const modalForm = document.createElement("form")
    modalForm.innerHTML = `
            <label>Size</label>
            <select id="sizeSelector" name="size">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select> <br>

            <label>Flavors</label>
            <input name="flavor" placeholder = "What's your flavor" ></input> <br>
            <input id = "submit" type="submit" value="Add to cart" />
            `
    modalForm.addEventListener("submit", addToCart)
    modalCard.append(modalForm)
  } else {
    const addToCartButton = document.createElement("button")
    addToCartButton.textContent = "Add to Cart"
    modalCard.append(addToCartButton)
    addToCartButton.addEventListener("click", addToCart)
  }
}

function addToCart(e) {
  const cartItem = document.createElement("span")
  let itemPrice = document.createElement("span")
  itemPrice.className = "itemPrice"
  let totalPrice = document.querySelector(".totalPrice")
  let itemPriceNum = itemPrice.textContent
  let totalPriceNum = parseFloat(totalPrice.textContent)

  if (e["type"] === "submit") {
    e.preventDefault()

    const { size, flavor } = e.target
    let coffeeChoiceObj = {
      size: size.value,
      flavor: flavor.value,
      price: e.target.parentNode.childNodes[2].textContent,
    }

    cartItem.innerHTML = `1x ${coffeeChoiceObj.size} ${
      coffeeChoiceObj.flavor
    } ${
      e.target.parentNode.querySelector("p").textContent
    } $ <span class = "singlePrice">${coffeeChoiceObj.price}</span>`
    totalPriceNum += parseFloat(coffeeChoiceObj.price)
    totalPrice.textContent = totalPriceNum
  } else if (e["type"] === "click") {
    const customName = e.target.parentNode.childNodes[1].textContent

    itemPrice.textContent = e.target.parentNode.childNodes[2].textContent
    cartItem.innerHTML = `1x  ${customName} $ <span class = "singlePrice">${itemPrice.textContent} </span>`

    totalPriceNum += parseFloat(itemPrice.textContent)
    totalPrice.textContent = totalPriceNum
  }

  const deleteButton = document.createElement("button")

  e.target.parentNode.style.display = "none"

  deleteButton.innerHTML = `<ion-icon name="close-outline"></ion-icon>`
  deleteButton.addEventListener("click", (e) => {
    let singlePrice = e.target.parentNode.parentNode.childNodes[1]
    let singlePriceFloat = parseFloat(singlePrice.textContent).toFixed(2)

    totalPrice.textContent = totalPriceNum - singlePriceFloat

    cartItem.remove()
  })

  cartItem.append(deleteButton)
  document.querySelector(".cartItems").append(cartItem)
}
//when an item is added, grab the price and add it to the total cart price

customDrinkForm.addEventListener("submit", addToMenu)

function addToMenu(e) {
  e.preventDefault()

  let newDrinkObj = {
    drink: e.target.customDrink.value,
    price: "6.00",
    size: e.target.size.value,
    flavor: e.target.flavor.value,
    image:
      "https://i.insider.com/5bb3d1c701145545560b0e12?width=751&format=jpeg",
  }
  // --------POST REQUEST TO ADD NEW DRINKS TO MENU--------
  fetch(allCoffeesUrl, {
    method: "POST",
    body: JSON.stringify(newDrinkObj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json())

  displayDrinks(newDrinkObj)
}

//-----------price calculator-------------

function calculatePrice(Obj) {}
//Fetch Coffees✅
//render Images into menu container with names✅
//add click event to coffee cards that:✅
//render image, name, ✅
//exit button ✅

//render form to drink display ✅
//a form with editable size, flavor ✅
//also default values for coffee selected, size, flavor ✅
//price✅
//an add to cart button✅

//add to cart button will:✅
//add list item to cart container with:✅
//price that will update on bottom bar as drinks are added ✅
//name of drink✅
//delete button ✅

//--------//

//create a drink form with:✅
//default values for all inputs✅
//base drink✅
//flavor input✅
//size dropdown✅
//name input-will replace drink name when posted to db.json✅

//----TOMORROW----//
//POST new custom drink✅
//Delete custom drink✅
//calculate price✅
//fix modalCard for new custom drink✅

//STRETCH
//populate nav bar with filter option for coffee/tea
//add comment section (reviews for shop)
//add star rating?
//change CSS featues based on selected flavor
//reflect price when flavors and size are changed
// key functions for closing modal and/or entering form (enter keyboard to submit form)
//add amount dropdown to order form
//only one modal can be up at a time

//CLEANUP
//line break in cart
//function breakup
//"your total is" after cartItem
