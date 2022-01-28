// ----------- Grab Variables -------------

const menuContainer = document.querySelector("#menuContainer")
const drinkDisplay = document.querySelector("#drinkDisplay")
const cart = document.querySelector("#cart")
const customDrink = document.querySelector("#customDrink")
const allCoffeesUrl = "http://localhost:3000/coffee"
const customDrinkForm = document.querySelector("#customDrinkForm")
const body = document.querySelector("body")

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
        <img src =${drinkObj.image}> <br> <br>
        <div class="trashCan"></div>`

  if (!drinkObj.id || drinkObj.id > 9) {
    const customDrinkDeleteBtn = document.createElement("button")
    customDrinkDeleteBtn.innerHTML = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"/></svg>`
    drinkCard.querySelector("div").append(customDrinkDeleteBtn)
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
  coffeeImage.className = "modalImage"

  exitButton.className = "closeModal"
  exitButton.innerHTML = `<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>`
  exitButton.addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none"
    modalCard.style.display = "none"
    modalCard.remove()
  })

  modalCard.append(exitButton)
  modalCard.append(coffeeName)
  modalCard.append(coffeePrice)
  body.append(modalCard)

  document.getElementById("overlay").style.display = "block"
  createModalForm(modalCard)
  modalCard.append(coffeeImage)

  document.addEventListener("keydown", function (e) {
    // console.log(e.key);

    if (e.key === "Escape" && modalCard.style.display === "grid") {
      modalCard.style.display = "none"
      document.getElementById("overlay").style.display = "none"
    }
  })
}

//--------------------------------------------

function createModalForm(modalCard) {
  if (modalCard.id !== "customModalCard") {
    const modalForm = document.createElement("form")
    modalForm.innerHTML = `
            <label>Size</label>
            <div class="search_categories">
            <div class="select">
          <select id="search_categories" name="modalSize">
              <option value="Small">Small</option>
              <option value="Medium">Medium     +$0.50</option>
              <option value="Large">Large     +$1.00</option>
            </select> 
            </div>
            </div>
            <br>

            <label class="modalCardFlavor">Flavors</label>
            <input class="modalCardFlavor" name="flavor" placeholder = "What's your flavor" ></input> <br>
          <label>
            <input class = "modalFormSubmit" id = "submit" type="submit" value = "Add to Cart">            
            </input>
            </label>
            `

    modalForm.addEventListener("submit", addToCart)
    modalCard.append(modalForm)
  }
}

function addToCart(e) {
  const cartItem = document.createElement("p")
  let itemPrice = document.createElement("span")
  let totalPrice = document.querySelector(".totalPrice")
  let totalPriceNum = parseFloat(totalPrice.textContent)
  itemPrice.className = "itemPrice"

  if (e["type"] === "submit") {
    e.preventDefault()

    let coffeeChoiceObj = {
      size: e.target.modalSize.value,
      flavor: e.target.flavor.value,
      price: e.target.parentNode.childNodes[2].textContent,
    }

    cartItem.innerHTML = `<br>1x ${coffeeChoiceObj.size} 
    ${coffeeChoiceObj.flavor} ${
      e.target.parentNode.querySelector("p").textContent
    }
     <span class = "singlePrice">${coffeeChoiceObj.price}</span>`

    totalPriceNum += parseFloat(coffeeChoiceObj.price)
    totalPrice.textContent = totalPriceNum.toFixed(2)

    e.target.parentNode.style.display = "none"
  } else if (e["type"] === "click") {
    const customName = e.target.parentNode.childNodes[1].textContent

    itemPrice.textContent = e.target.parentNode.childNodes[2].textContent
    cartItem.innerHTML = `1x  ${customName} $ <span class = "singlePrice">${itemPrice.textContent} </span>`

    totalPriceNum += parseFloat(itemPrice.textContent)
    totalPrice.textContent = totalPriceNum

    e.target.parentNode.style.display = "none"
  }

  const deleteButton = document.createElement("button")

  deleteButton.className = "deleteButton"
  deleteButton.textContent = "X"
  deleteButton.addEventListener("click", (e) => {
    let singlePrice = e.target.parentNode.childNodes[2].textContent
    let singlePriceNum = parseFloat(singlePrice)
    let priceBeforeDeletionNum = parseFloat(totalPrice.textContent)
    let updatedTotal = priceBeforeDeletionNum - singlePriceNum
    totalPrice.textContent = updatedTotal.toFixed(2)

    e.target.parentNode.style.display = "none"
    cartItem.remove()
  })

  document.getElementById("overlay").style.display = "none"
  cartItem.append(deleteButton)
  document.querySelector(".cartItems").append(cartItem)
}

customDrinkForm.addEventListener("submit", addToMenu)

function addToMenu(e) {
  e.preventDefault()

  let newDrinkObj = {
    drink: e.target.customDrink.value,
    price: "6.00",
    size: e.target.size.value,
    flavor: e.target.flavor.value,
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2016/04/latte-art-food-dye-mason-salisbury-6.jpg",
  }
  fetch(allCoffeesUrl, {
    method: "POST",
    body: JSON.stringify(newDrinkObj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json())

  displayDrinks(newDrinkObj)
  customDrinkForm.reset()
}
