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
    .then(drinkArray => {
        drinkArray.forEach(drinkObj => displayDrinks(drinkObj))
     })
    
}

function displayDrinks(drinkObj){
    const drinkCard = document.createElement("div")
    drinkCard.className = "drinkCard"
    drinkCard.innerHTML = `
        <h2>${drinkObj.drink}</h2>
        <img src =${drinkObj.image}> 
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
    // if(modal belongs to a new coffee){
    //     set size option value to size selected
    // }

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


customDrinkForm.addEventListener("submit", addToMenu)

function addToMenu(e){
  e.preventDefault()
  
  let newDrinkObj = {
    drink: e.target.customDrink.value,
    image: "https://i.insider.com/5bb3d1c701145545560b0e12?width=751&format=jpeg"
  }
//   modalForm.style.display="none"
console.log(e.target)
  displayDrinks(newDrinkObj) 











// const deleteButton = document.createElement("button")
//   const cartItem = document.createElement("span")
//   const customDrinkImage=document.createElement('img')
//   customDrinkImage.src=''
//   drinkCard.innerHTML = `
//         <h2>${drinkObj.drink}</h2>
//         <img src =${drinkObj.image}> 
//         `
//   const customDrinkObj={
//       name: e.target.customDrink.value,
//       image: customDrinkImage,
//   }
//   console.log(customDrinkObj)
//   displayDrinks(customDrinkObj)
//   drinkCard.append(customDrinkObj)
//   menuContainer.append(drinkCard)
  
}

// function render

//-----------event listeners-------------

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
//price that will update on bottom bar as drinks are added
//name of drink✅
//delete button ✅

//--------//

//create a drink form with:
//default values for all inputs
//base drink
//flavor input
//size dropdown
//name input-will replace drink name when posted to db.json

//----TOMORROW----//
//POST new custom drink
//Delete custom drink
//calculate price
//fix modalCard for new custom drink

//STRETCH
//populate nav bar with filter option for coffee/tea
//add comment section (reviews for shop)
//add star rating?
//change CSS featues based on selected flavor
//reflect price when flavors and size are changed
// key functions for closing modal and/or entering form (enter keyboard to submit form)
//add amount dropdown to order form

//CLEANUP
//line break in cart
//function breakup
//"your total is" after cartItem
