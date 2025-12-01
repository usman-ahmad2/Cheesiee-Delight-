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
if (lines && mobileMenu) {
    lines.addEventListener('click', () => {
        mobileMenu.classList.toggle('mobile-menu-active');
    });
}
if (cartIcon && cartTab) {
    cartIcon.addEventListener('click', () => {
        cartTab.classList.toggle('active');
    });
}

if (closeBtn && cartTab) {
    closeBtn.addEventListener('click', () => {
        cartTab.classList.remove('active');
    });
}
if (addButtons.length > 0) {
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
}
function addToCart(item) {
    if (!cart.find(i => i.id === item.id)) {
        cart.push(item);
    }
    updateCart();
}
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}
function updateCart() {
    if (!cartList || !cartValue || !cartTotal) return;

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
const checkoutBtn = document.querySelector(".check-btn");
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Order Confirmed!");

        cart = [];
        localStorage.removeItem("cart");

        if (cartList) cartList.innerHTML = "";
        if (cartTotal) cartTotal.textContent = "Rs. 0";
        if (cartValue) cartValue.textContent = "0";
        if (cartTab) cartTab.classList.remove("active");
    });
}
function validateMessage() {
    const message = document.getElementById("message");
    if (!message) return true;

    const text = message.value.trim();

    if (text.length < 20) {
        alert("Message must be at least 20 characters long.");
        return false;
    }

    return true;
}
