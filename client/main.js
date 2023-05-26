document.getElementById('loadProducts').addEventListener('click', loadProducts);
document.getElementById('clearProducts').addEventListener('click', clearProducts);
document.getElementById('loadCart').addEventListener('click', loadCart);

async function loadProducts() {
    try {
        const response = await fetch('https://ecommerce-to-react.herokuapp.com/products');
        const products = await response.json();

        const productsDiv = document.getElementById('products');
        productsDiv.innerHTML = '';

        for (let product of products) {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.textContent = `${product.title} - $${product.price}`;
            productsDiv.appendChild(productDiv);
        }
    } catch (err) {
        console.error('Failed to load products:', err);
    }
}

function clearProducts() {
    document.getElementById('products').innerHTML = '';
}

async function loadCart() {
    try {
        const response = await fetch('https://ecommerce-to-react.herokuapp.com/cart');
        const cartItems = await response.json();

        const cartDiv = document.getElementById('cart');
        cartDiv.innerHTML = 'No items yet';

        for (let item of cartItems) {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.textContent = `Product ID: ${item.product.id}, Quantity: ${item.quantity}`;
            cartDiv.appendChild(cartItemDiv);
        }
    } catch (err) {
        console.error('Failed to load cart:', err);
    }
}
