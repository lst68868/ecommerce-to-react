document.addEventListener('DOMContentLoaded', () => {
    // Fetch products from the server
    axios
      .get('/products')
      .then(response => response.data)
      .then(products => displayProducts(products))
      .catch(error => console.error(error));
  
    // Display products on the page
    function displayProducts(products) {
      const productsContainer = document.querySelector('.products-container');
      productsContainer.innerHTML = ''; // Clear the container before rendering
  
      products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
  
        const image = document.createElement('img');
        image.src = product.image;
        card.appendChild(image);
  
        const name = document.createElement('h3');
        name.textContent = product.title;
        card.appendChild(name);
  
        const price = document.createElement('p');
        price.textContent = `Price: $${product.price}`;
        card.appendChild(price);
  
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.addEventListener('click', () => addToCart(product._id));
        card.appendChild(addToCartButton);
  
        productsContainer.appendChild(card);
      });
    }
  
    // Add a product to the cart
    function addToCart(productId) {
      const item = { productId, quantity: 1 };
  
      axios
        .post('/cart', item)
        .then(response => response.data)
        .then(cartItem => {
          alert('Product added to cart');
          console.log(cartItem);
          fetchCartItems(); // Fetch updated cart items after adding to the cart
        })
        .catch(error => console.error(error));
    }
  
    // Fetch the cart items from the server
    function fetchCartItems() {
      axios
        .get('/cart')
        .then(response => response.data)
        .then(cartItems => displayCartItems(cartItems))
        .catch(error => console.error(error));
    }
  
    // Display cart items on the page
    function displayCartItems(cartItems) {
      const cartItemsContainer = document.getElementById('cart-items');
      cartItemsContainer.innerHTML = ''; // Clear the container before rendering
  
      cartItems.forEach(cartItem => {
        const item = document.createElement('div');
        item.classList.add('cart-item');
  
        const name = document.createElement('span');
        name.textContent = cartItem.product.title;
        item.appendChild(name);
  
        const quantity = document.createElement('span');
        quantity.textContent = `Quantity: ${cartItem.quantity}`;
        item.appendChild(quantity);
  
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeCartItem(cartItem._id));
        item.appendChild(removeButton);
  
        cartItemsContainer.appendChild(item);
      });
    }
  
    // Remove a cart item
    function removeCartItem(itemId) {
      axios
        .delete(`/cart/${itemId}`)
        .then(response => response.data)
        .then(deletedItem => {
          alert('Product removed from cart');
          console.log(deletedItem);
          fetchCartItems(); // Fetch updated cart items after removing from the cart
        })
        .catch(error => console.error(error));
    }
  
    // Checkout
    const checkoutButton = document.getElementById('checkout-btn');
    checkoutButton.addEventListener('click', () => {
      checkout();
    });
  
    function checkout() {
      alert('Checkout');
    }
  
    // Initial fetch of cart items
    fetchCartItems();
  });
  