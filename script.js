// Function to load cart items from localStorage
function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to save cart items to localStorage
function saveCart(cartItems) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartItems = loadCart();
    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `<tr><td colspan="5">Your cart is empty</td></tr>`;
    } else {
        cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" 
                        onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeItem(${index})">Remove</button></td>
            `;

            cartItemsContainer.appendChild(row);
        });
    }

    // Update total price
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// Function to update item quantity
function updateQuantity(index, quantity) {
    let cartItems = loadCart();
    
    if (quantity < 1) {
        alert("Quantity must be at least 1.");
        return;
    }

    cartItems[index].quantity = parseInt(quantity);
    saveCart(cartItems);
    updateCart();
}

// Function to remove an item from the cart
function removeItem(index) {
    let cartItems = loadCart();
    cartItems.splice(index, 1);
    saveCart(cartItems);
    updateCart();
}

// Function to simulate checkout
function checkout() {
    if (loadCart().length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Proceeding to checkout...");
    localStorage.removeItem("cart"); // Clear cart after checkout
    updateCart();
}

// Initialize the cart when the page loads
document.addEventListener("DOMContentLoaded", updateCart);
