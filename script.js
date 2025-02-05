let cart = [];
let cartTotal = 0;

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", event => {
        const product = event.target.closest(".product"); // Ensure correct parent selection
        const name = product.getAttribute("data-name");
        const price = parseFloat(product.getAttribute("data-price"));

        cart.push({ name, price });
        cartTotal += price;

        updateCart();
    });
});

function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        li.innerHTML += ` <button onclick="removeFromCart(${index})">Remove Item</button>`;
        cartItemsList.appendChild(li);
    });

    document.getElementById("cart-total").textContent = cartTotal.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cartTotal -= cart[index].price;
        cart.splice(index, 1);
        updateCart();
    }
}

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase! Total: $" + cartTotal.toFixed(2));
        cart = [];
        cartTotal = 0;
        updateCart();
    }
});
