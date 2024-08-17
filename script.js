const defaultItems = [
    { name: 'Biriyani', price: 150, imgSrc: 'images/biriyani.jpg' },
    { name: 'Idly', price: 50, imgSrc: 'images/idly.jpg' },
    { name: 'Chapathi', price: 60, imgSrc: 'images/chapathi.jpg' } // Update with the correct URL or path if available
];

let cart = [];
let total = 0;
let serialNumber = 1;

function addToCart(itemName, price) {
    const existingItem = cart.find(cartItem => cartItem.item === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subtotal = existingItem.price * existingItem.quantity;
    } else {
        cart.push({ item: itemName, price: price, quantity: 1, subtotal: price });
    }
    total += price;
    renderBillingTable();
}

function renderBillingTable() {
    const billingItems = document.getElementById('billing-items');
    const totalAmountElement = document.getElementById('total-amount');
    const givenAmountElement = document.getElementById('given-amount');
    const balanceAmountElement = document.getElementById('balance-amount');

    billingItems.innerHTML = '';
    total = 0;
    serialNumber = 1;

    cart.forEach(cartItem => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
            <td>${serialNumber++}</td>
            <td>${cartItem.item}</td>
            <td>Rs. ${cartItem.price.toFixed(2)}</td>
            <td>${cartItem.quantity}</td>
            <td>Rs. ${cartItem.subtotal.toFixed(2)}</td>
        `;
        billingItems.appendChild(listItem);
        total += cartItem.subtotal;
    });

    totalAmountElement.textContent = total.toFixed(2);
    calculateBalance();
}

function calculateBalance() {
    const givenAmount = parseFloat(document.getElementById('given-amount').value) || 0;
    const balanceAmount = givenAmount - total;
    document.getElementById('balance-amount').textContent = balanceAmount.toFixed(2);
}

function clearCart() {
    cart = [];
    serialNumber = 1;
    total = 0;
    renderBillingTable();
}

function processPayment() {
    alert(`Payment of Rs. ${total.toFixed(2)} successful!`);
    clearCart(); // Optionally clear the cart after payment
}

function searchItems() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredItems = defaultItems.filter(item => item.name.toLowerCase().includes(searchTerm));
    displayItems(filteredItems);
}

function displayItems(items) {
    const menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = '';

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <p>${item.name}</p>
            <p class="price">Rs. ${item.price.toFixed(2)}</p>
        `;
        itemElement.onclick = () => addToCart(item.name, item.price);
        menuItems.appendChild(itemElement);
    });
}

// Display default items on page load
window.onload = () => displayItems(defaultItems);
