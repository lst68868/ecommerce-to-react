// Function to make a GET request and display the response
async function makeGetRequest(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // Clear the previous results
      document.getElementById('result').innerHTML = '';
  
      if (Array.isArray(data)) {
        // Iterate over each product and create HTML elements to display them
        data.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.className = 'product';
  
          const titleElem = document.createElement('h3');
          titleElem.textContent = product.title;
  
          const priceElem = document.createElement('p');
          priceElem.textContent = `Price: $${product.price}`;
  
          productDiv.appendChild(titleElem);
          productDiv.appendChild(priceElem);
  
          document.getElementById('result').appendChild(productDiv);
        });
      } else {
        // Single product response
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
  
        const titleElem = document.createElement('h3');
        titleElem.textContent = data.title;
  
        const priceElem = document.createElement('p');
        priceElem.textContent = `Price: $${data.price}`;
  
        productDiv.appendChild(titleElem);
        productDiv.appendChild(priceElem);
  
        document.getElementById('result').appendChild(productDiv);
      }
    } catch (error) {
      console.error('Failed to make the GET request:', error);
    }
  }
  
  // Function to clear the results
  function clearResults() {
    document.getElementById('result').innerHTML = '';
  }
  
  // Event listener for the "Get Products" button
  document.getElementById('getProducts').addEventListener('click', () => {
    makeGetRequest('http://localhost:3002/products');
  });
  
  // Event listener for the "Get Product" button
  document.getElementById('getProduct').addEventListener('click', () => {
    // Prompt the user to enter the product ID
    const productId = prompt('Enter the product ID:');
    if (productId) {
      makeGetRequest(`http://localhost:3002/products/${productId}`);
    }
  });
  
  // Event listener for the "Clear All Products" button
  document.getElementById('clearAll').addEventListener('click', clearResults);
  
  // Event listener for the "Clear Product" button
  document.getElementById('clearProduct').addEventListener('click', clearResults);
  