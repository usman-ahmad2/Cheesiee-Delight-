const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector('.cart-value');
const addButtons = document.querySelectorAll('.add-btn');
const lines = document.querySelector('.lines');
const mobileMenu = document.querySelector('.mobile-menu');

let cart = [];
cartIcon.addEventListener('click', () => cartTab.classList.toggle('active'));
closeBtn.addEventListener('click', () => cartTab.classList.remove('active'));
lines.addEventListener('click', ()=>mobileMenu.classList.toggle('mobile-menu-active'));
// ADD ITEMS TO CART
addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.menu-card');
        const item = {
            id: card.dataset.id,
            name: card.dataset.name,
            price: Number(card.dataset.price),
            img: card.dataset.img
        };
        addToCart(item);
    });
});

function addToCart(item) {
    // prevent duplicates
    if (!cart.find(i => i.id === item.id)) {
        cart.push(item);
    }
    updateCart();
}

// REMOVE ITEM
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// UPDATE CART UI
function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.img}" alt="">
            <div class="info">
                <h4>${item.name}</h4>
                <p>Rs. ${item.price}</p>
            </div>
            <button class="remove-btn" onclick="removeItem('${item.id}')">X</button>
        `;
        cartList.appendChild(div);
    });

    cartTotal.textContent = `Rs. ${total}`;
    cartValue.textContent = cart.length;
}
// CHECKOUT FUNCTION
// CHECKOUT FUNCTION
document.querySelector(".check-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order Confirmed!");

    // Clear cart array
    cart = [];

    // Also clear localStorage (if you use it)
    localStorage.removeItem("cart");

    // Clear cart HTML
    document.querySelector(".cart-list").innerHTML = "";

    // Reset total
    document.querySelector(".cart-total").textContent = "Rs. 0";

    // Reset cart number badge
    updateCartNumber();

    // Close cart tab
    document.querySelector(".cart-tab").classList.remove("active");
});
function validateMessage() {
    const message = document.getElementById("message").value.trim();

    if (message.length < 20) {
        alert("Message must be at least 20 characters long.");
        return false; // Stop form submission
    }

    return true; // Allow submission
}