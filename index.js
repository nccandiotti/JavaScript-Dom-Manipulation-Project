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
  drinkArray.forEach((drinkObj) => {
    const drinkCard = document.createElement("div")
    drinkCard.className = "drinkCard"
    drinkCard.innerHTML = `
        <h2>${drinkObj.drink}</h2>
        <img src =${drinkObj.image} > 
        `
        drinkCard.addEventListener('click', ()=>{
            const modalCard=document.createElement('div')
            modalCard.className="modalCard"

            const coffeeName=document.createElement('p')
            const coffeePrice=document.createElement('p')
            const coffeeImage=document.createElement('img')
            const exitButton=document.createElement('button')
            exitButton.className="close-modal"
            exitButton.textContent="x"
            exitButton.addEventListener('click', ()=>{
                modalCard.style.display="none"
            })

            const modalForm = document.createElement("form")
      console.log(modalForm)
      modalForm.innerHTML = `
            <label>Size</label>
            <select id="sizeSelector" name="size">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select> <br>

            <label>Flavors</label>
            <input placeholder = "What's your flavor" ></input>
            `

            coffeeName.textContent=drinkObj.drink
            coffeePrice.textContent=drinkObj.price
            coffeeImage.style.maxHeight="200px";
            coffeeImage.src=drinkObj.image
            modalCard.style.display="block"
            
            modalCard.append(exitButton)
            modalCard.append(coffeeName)
            modalCard.append(coffeeImage)
            modalCard.append(coffeePrice)
            modalCard.append(modalForm)
            menuContainer.append(modalCard)
    })
    menuContainer.append(drinkCard)
  })
}

// function render 


//-----------event listeners-------------




//Fetch Coffees✅
//render Images into menu container with names✅
//add click event to coffee cards that:✅
//render image, name, ✅
//exit button ✅

//----TOMORROW----//

//render form to drink display
//a form with editable size, flavor
//also default values for coffee selected, size, flavor
//price
//an add to cart button

//add to cart button will:
//add list item to cart container with:
//price that will update on bottom bar as drinks are added
//name of drink
//delete button

//--------//

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
