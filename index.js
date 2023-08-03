import { data } from './data.js';
const salesPage = document.getElementById('sales-page');
const orderPage = document.getElementById('order-page');
const cardDetailsPage = document.getElementById('card-details-page');
const opaque = document.querySelector('.opaque');
let orderDetails = {}
let totalPrice = 0


document.addEventListener('click', function(e){
    // if the user click on the add-to-cart button
    if (e.target.className === 'add-to-cart'){
        // checks if the button has been clicked before
        if (e.target.dataset.clicks === undefined){
            e.target.dataset.clicks = 0
        } 
        e.target.dataset.clicks++; // adds one to the clicks
        let id = e.target.dataset.id; // gets the id of the item

        let cart = data.filter(getObject)[0]

        function getObject(food){
            return food.id === parseInt(id)}

        orderPage.style = 'display: block';
        renderSales(cart, e.target.dataset.clicks);
    }
    // Remove from cart
    if (e.target.className === 'remove-from-cart'){
        let id = e.target.dataset.id;
        const idRemoveButton = document.querySelector(`button[class="add-to-cart"][data-id="${id}"]`);

        idRemoveButton.dataset.clicks--;
        e.target.dataset.clicks = idRemoveButton.dataset.clicks;
        
        let cart = data.filter(getObject)[0]

        function getObject(food){
            return food.id === parseInt(id)}

        // orderPage.style = 'display: block';
        removeSales(cart, e.target.dataset.clicks);
    }
    // Complete order
    if (e.target.className === 'order-button'){
        console.log('order completed')
        cardDetailsPage.style.display = 'block';
        opaque.style.opacity = '0.7';
    }
}
)

function renderSales(cart, clicks){
    // orderPage.innerHTML = ''
    totalPrice += cart.price
    if (clicks > 1){
        orderDetails[cart.id] = `
        <div class="order-item">
            <div class="name-and-button">
                <div class="order-details">
                    <h2 class="order-name">${cart.name}</h2>
                    <p>x${clicks}</p>
                </div>
                <button class="remove-from-cart" data-id="${cart.id}" data-clicks="0">remove</button>
            </div>
            <p class="order-price">$${cart.price*clicks}</p>
        </div>
        `;
    }

    else {orderDetails[cart.id] = `
            <div class="order-item">
                <div class="name-and-button">
                    <div class="order-details">
                        <h2 class="order-name">${cart.name}</h2>
                    </div>
                    <button class="remove-from-cart" data-id="${cart.id}" data-clicks="0">remove</button>
                </div>
                <p class="order-price">$${cart.price*clicks}</p>
            </div>
            `;}
    displayOrder();
}
 
function displayOrder(){
    orderPage.innerHTML = `
                            <h1 class="order-title">Your order</h1>
                            ${Object.values(orderDetails).join('')}
                            <div class="total">
                                <h2 class="order-name">Total Price</h2>
                                <p>$${totalPrice}</p>
                            </div>
                            <button class="order-button">Complete Order</button>`
                                
}

function removeSales(cart, clicks){
    totalPrice -= cart.price
    // console.log(clicks)
    if (clicks < 1){
        orderDetails[cart.id] = ''
    }
    
    else if (clicks == 1){
        orderDetails[cart.id] = `
                                <div class="order-item">
                                    <div class="name-and-button">
                                        <div class="order-details">
                                            <h2 class="order-name">${cart.name}</h2>
                                        </div>
                                        <button class="remove-from-cart" data-id="${cart.id}" data-clicks="0">remove</button>
                                    </div>
                                    <p class="order-price">$${cart.price*clicks}</p>
                                </div>
                                `
    }
    else {
        orderDetails[cart.id] = `
                                <div class="order-item">
                                    <div class="name-and-button">
                                        <div class="order-details">
                                            <h2 class="order-name">${cart.name}</h2>
                                            <p>x${clicks}</p>
                                        </div>
                                        <button class="remove-from-cart" data-id="${cart.id}" data-clicks="0">remove</button>
                                    </div>
                                    <p class="order-price">$${cart.price*clicks}</p>
                                </div>
        `
    }
    if (totalPrice === 0){
        orderPage.style = 'display: none';
    }
    else {
        displayOrder();
    }
}

function renderItems(){
    for (let food of data){
        salesPage.innerHTML +=    `
                <div class="food-item">
                    <div class='food-descr'>
                        <p class='food-emoji'>${food.emoji}</p>
                        <div class="food-name">
                            <h1>${food.name}</h1>
                            <p>${food.ingredients}</p>
                            <h2>$${food.price}</h2>
                        </div>
                    </div>
                    <button class="add-to-cart" data-id="${food.id}">
                        +
                    </button>
                </div>
                `
    }
}

renderItems();