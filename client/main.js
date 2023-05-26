// Adding event listeners to buttons
document.getElementById('loadProducts').addEventListener('click', loadProducts);
document.getElementById('clearProducts').addEventListener('click', clearProducts);
document.getElementById('loadCart').addEventListener('click', loadCart);
document.getElementById('addToCartForm').addEventListener('submit', addToCart);

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

        // Add each cart item to the page
        for (let item of cartItems) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.textContent = `${item.product.title} - $${item.product.price} x ${item.quantity} - Item ID: ${item.id}`;
            cartDiv.appendChild(itemDiv);
        }
    } catch (err) {
        // Log error if fetch fails
        console.error('Failed to load cart:', err);
    }
}

async function addToCart(event) {
    event.preventDefault();

    // Get user inputs
    const productId = document.getElementById('productId').value;
    const quantity = document.getElementById('quantity').value;

    // Post to /cart endpoint
    try {
        const response = await fetch('https://ecommerce-to-react.herokuapp.com/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity
            })
        });
        const result = await response.json();

        // Log result
        console.log(result);

        // Reload cart
        loadCart();
    } catch (err) {
        console.error('Failed to add to cart:', err);
    }
}
