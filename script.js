// Sample cart items (could be dynamically fetched from a database)
const cartItems = [
    { name: "Gift Box", price: 19.99, quantity: 2 },
    { name: "Teddy Bear", price: 12.49, quantity: 1 },
    { name: "Chocolate Basket", price: 25.99, quantity: 1 }
  ];
  
  // Function to update the cart display
  function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
  
    let totalPrice = 0;
  
    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
  
      const row = document.createElement('tr');
  
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
  
    // Update total price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
  }
  
  // Function to update item quantity
  function updateQuantity(index, quantity) {
    if (quantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }
    cartItems[index].quantity = parseInt(quantity);
    updateCart();
  }
  
  // Function to remove an item from the cart
  function removeItem(index) {
    cartItems.splice(index, 1);
    updateCart();
  }
  
  // Function to simulate checkout
  function checkout() {
    alert("Proceeding to checkout...");
  }
  
  // Initialize the cart when the page loads
  updateCart();
  