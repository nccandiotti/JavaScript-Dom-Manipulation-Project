// ----------- Grab Variables -------------
const menuContainer = document.querySelector("#menuContainer")
const drinkDisplay = document.querySelector("#drinkDisplay")
const cart = document.querySelector("#cart")
const customDrink = document.querySelector("#customDrink")
const url = "http://localhost:3000/coffee"
const customDrinkForm = document.querySelector("#customDrinkForm")

// --------------- fetch request -----------
fetchDrinks()
function fetchDrinks() {
  return fetch(url)
    .then((response) => response.json())
    .then(drinkArray => {
        drinkArray.forEach(drinkObj => displayDrinks(drinkObj))
     })
    
}

function displayDrinks(drinkObj){
    // console.log(drinkObj)
    const drinkCard = document.createElement("div")
    drinkCard.className = "drinkCard"
    drinkCard.innerHTML = `
        <h2>${drinkObj.drink}</h2>
        <img src =${drinkObj.image} > 
        `
    drinkCard.addEventListener("click", ()=>createModalCard(drinkObj))
    menuContainer.append(drinkCard)
}

function createModalCard(drinkObj){
    const modalCard = document.createElement("div")
      modalCard.className = "modalCard"
      modalCard.style.display = "block"

      const coffeeName = document.createElement("p")
      const coffeePrice = document.createElement("p")
      const coffeeImage = document.createElement("img")
      const exitButton = document.createElement("button")


      coffeeName.textContent = drinkObj.drink
      coffeePrice.textContent = drinkObj.price
      coffeeImage.style.maxHeight = "200px"
      coffeeImage.src = drinkObj.image
      


      exitButton.className = "close-modal"
      exitButton.textContent = "x"
      exitButton.addEventListener("click", () => {
        modalCard.style.display = "none"
      })
    modalCard.append(exitButton)
    modalCard.append(coffeeName)
    modalCard.append(coffeeImage)
    modalCard.append(coffeePrice)
    menuContainer.append(modalCard)
    createModalForm(modalCard)


}


function createModalForm(modalCard){
    const modalForm = document.createElement("form")
      modalForm.innerHTML = `
            <label>Size</label>
            <select id="sizeSelector" name="size">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select> <br>

            <label>Flavors</label>
            <input name="flavor" placeholder = "What's your flavor" ></input>
            <input id = "submit" type="submit" value="Add to cart" />
            `
        modalForm.addEventListener('submit', addToCart) 
        modalCard.append(modalForm) 
          
}

function addToCart(e){
    e.preventDefault()
    let coffeeChoiceObj = {
        size: e.target.size.value,
        flavor: e.target.flavor.value,
      }

    const deleteButton = document.createElement("button")
    const cartItem = document.createElement("span")
    e.target.parentNode.style.display = "none"

    deleteButton.innerHTML = `<ion-icon name="close-outline"></ion-icon>`
    deleteButton.addEventListener("click", (e) => {
      cartItem.remove()
    })


    cartItem.textContent = `1x ${coffeeChoiceObj.size} ${coffeeChoiceObj.flavor} ${e.target.parentNode.querySelector('p').textContent}`
    cartItem.append(deleteButton)
    cart.append(cartItem) 
}


customDrinkForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const deleteButton = document.createElement("button")
  const cartItem = document.createElement("span")
  modalCard.style.display = "none"

  deleteButton.innerHTML = `<ion-icon name="close-outline"></ion-icon>`
  deleteButton.addEventListener("click", (e) => {
    cartItem.remove()
  })
})