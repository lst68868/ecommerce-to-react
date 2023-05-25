##E-Commerce API Server

This is an API server for an e-commerce application that provides routes for managing products and the user's shopping cart. The server is built with Node.js, Express, and MongoDB using Mongoose as the ODM (Object Data Modeling) library.

Prerequisites
Make sure you have the following software installed on your system:

Node.js (v12 or higher)
MongoDB
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/ecommerce-api-server.git
Navigate to the project directory:

bash
Copy code
cd ecommerce-api-server
Install the dependencies:

bash
Copy code
npm install
Create a .env file in the project root and provide the necessary environment variables:

plaintext
Copy code
PORT=3000
DATABASE_URI=mongodb://localhost:27017/ecommerce
PORT: The port number on which the server will run. Default is 3000.
DATABASE_URI: The MongoDB connection URI for your database.
Usage
Start the server:

bash
Copy code
npm start
The server will start running on the specified port.

Seeding the Database:

To seed the database with sample product data, you can make a GET request to the /seed endpoint:

plaintext
Copy code
GET http://localhost:3000/seed
This will fetch product data from the FakeStoreAPI and store it in the database.

Accessing Product Routes:

To retrieve all products:

plaintext
Copy code
GET http://localhost:3000/products
To retrieve a specific product by ID:

plaintext
Copy code
GET http://localhost:3000/products/{id}
To update a product by ID:

plaintext
Copy code
PUT http://localhost:3000/products/{id}
Include the updated product data in the request body.

To delete a product by ID:

plaintext
Copy code
DELETE http://localhost:3000/products/{id}
Cart Routes:

To add a product to the cart:

plaintext
Copy code
POST http://localhost:3000/cart
Include the productId and quantity in the request body.

To view the cart:

plaintext
Copy code
GET http://localhost:3000/cart
To adjust the quantity of a cart item:

plaintext
Copy code
PUT http://localhost:3000/cart/{itemId}
Include the updated quantity in the request body.

To remove a product from the cart:

plaintext
Copy code
DELETE http://localhost:3000/cart/{itemId}
Contributing
Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please create a new issue or submit a pull request.

License
This project is licensed under the MIT License.