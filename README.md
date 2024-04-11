# backendAssignment
## Introduction

## Project Overview
# Purpose
The purpose of this project is to create a backend API for managing users and products. It includes functionalities such as user registration, login, logout, product creation, and fetching all products.

# Features
- User Management:

   - User Registration: Allows users to register by providing necessary information.
   - User Login: Enables registered users to authenticate and access their account.
   - User Logout: Provides functionality for users to log out securely.

- Product Management:

   - Product Creation: Allows authenticated users to create new products with details like name, price, description, and image.
   - Get All Products: Retrieves all products from the database.

## Technologies Used

- TypeScript
- Express.js
- MongoDB
- jsonwebtoken

## Getting Started

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone git@github.com:KodaKodama/backendAssignment.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd backendAssignment
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up MongoDB Atlas:**
   - Create a MongoDB Atlas account if you don't have one already.
   - Set up a cluster and database.
   - Obtain your connection string.
5. Create a .env file in the project root and add the following:
   ```bash
   CONNECTION_STRING=your-mongodb-connection-string
   ```
   Replace your-mongodb-connection-string with your MongoDB Atlas connection string.

## Build Setup

Compile TypeScript files to JavaScript using the TypeScript compiler.

```bash
npm run build
```

## Usage

Start the server on port 1335.

```bash
npm start
```

Access the server at [http://localhost:1335](http://localhost:1335).

## API Endpoints

### User Endpoints

#### Register User

- **Endpoint**: `/user/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
```json
{
 "name": "User Name",
 "email": "user@example.com",
 "password": "Password@123"
}
```
Response: Returns a success message upon successful registration.

#### Login user

- **Endpoint**: `/user/login`
- **Method**: `POST`
- **Description**: Login a new user.
- **Request Body**:
```json
{
 "email": "user@example.com",
 "password": "Password@123"
}
```
Response: Returns a JWT token upon successful login.

#### Logout user

- **Endpoint**: `/user/logout`
- **Method**: `GET`
- **Description**: Logout user.

#### Edit user

- **Endpoint**: `/user/edit`
- **Method**: `PUT`
- **Description**: Updates the profile information for an existing user.
- **Request Body**:
```json
{
  "name": "New Name",
  "email": "newemail@example.com",
  "password": "newPassword@123"
}
```
Response: Returns a success message upon successful update.

### Product Endpoints

#### Create Product

- **Endpoint**: `/product/create`
- **Method**: `POST`
- **Description**: create a product for seller.
- **Request Body**:
```json
{
  "name": "Product Name",
  "price": 999,
  "description": "Product description",
  "image": "product-image.jpg"
}
```
Response: Returns a success message upon successful product creation.


#### Get all Products

- **Endpoint**: `/product/get/all`
- **Method**: `GET`
- **Description**: Retrieves all products from the database.
- **Response**: Returns an array of product objects..

## License

This project is licensed under the [MIT License](LICENSE).