// Adding event listeners to buttons
document.getElementById('loadProducts').addEventListener('click', loadProducts);
document.getElementById('clearProducts').addEventListener('click', clearProducts);
document.getElementById('loadCart').addEventListener('click', loadCart);
document.getElementById('addToCartForm').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from submitting normally

    // get values from the form inputs
    const productId = document.getElementById('productId').value;
    const quantity = document.getElementById('quantity').value;

    addToCart(productId, quantity);
});

// Function to load products from server
async function loadProducts() {
    try {
        // Fetch products from server
        const response = await fetch('https://ecommerce-to-react.herokuapp.com/products');
        const products = await response.json();

        // Clear existing products
        const productsDiv = document.getElementById('products');
        productsDiv.innerHTML = '';

        // Add each product to the page
        for (let product of products) {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.textContent = `${product.title} - $${product.price}`;

            // Create and add a button to add the product to the cart
            const addButton = document.createElement('button');
            addButton.textContent = 'Add to cart';
            addButton.addEventListener('click', () => addToCart(product._id, 1));  // Here, we assume a quantity of 1. Adjust as necessary.

            productDiv.appendChild(addButton);
            productsDiv.appendChild(productDiv);
        }
    } catch (err) {
        // Log error if fetch fails
        console.error('Failed to load products:', err);
    }
}

// Function to clear products from the page
function clearProducts() {
    document.getElementById('products').innerHTML = '';
}

// Function to load cart from server
async function loadCart() {
    try {
        // Fetch cart items from server
        const response = await fetch('https://ecommerce-to-react.herokuapp.com/cart');
        const cartItems = await response.json();

        // Clear existing cart items
        const cartDiv = document.getElementById('cart');
        cartDiv.innerHTML = '';

        // Check if the cart is empty
        if (cartItems.length === 0) {
            const emptyCartDiv = document.createElement('div');
            emptyCartDiv.textContent = "Your cart is empty";
            cartDiv.appendChild(emptyCartDiv);
        } else {
            // Add each cart item to the page
            for (let item of cartItems) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.textContent = `${item.product.title} - $${item.product.price} x ${item.quantity}`;
                cartDiv.appendChild(itemDiv);
            }
        }
    } catch (err) {
        // Log error if fetch fails
        console.error('Failed to load cart:', err);
    }
}

// Function to add a product to the cart
async function addToCart(productId, quantity) {
    try {
        const response = await fetch('https://ecommerce-to-react.herokuapp.com/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity })
        });
        const addedCartItem = await response.json();
        console.log(addedCartItem);
        // Reload the cart to reflect the new item
        loadCart();
    } catch (err) {
        // Log error if fetch fails
        console.error('Failed to add to cart:', err);
    }
}
