# E-Commerce Website

This project is a Next.js application for an e-commerce platform. It includes user authentication, private routing, and product listing with sorting and filtering functionality.

## Features

1. **User Authentication**:
    - Login page with form validations for email, password, and mobile number.
    - Password must have at least 8 characters, one special character, and one number.
    - Email must be in a valid format.
    - Mobile number must be exactly 10 digits.
    - Authorization via `/login` API to retrieve a token.

2. **Navbar**:
    - Displays the logged-in user's name.
    - Logout functionality to clear the session.

3. **Private Routing**:
    - Protects the `/productlist` page using the `/validateToken` API.

4. **Product Listing**:
    - Fetches products from the `/products` API.
    - Includes sorting and filtering based on price, size, and color.
    - Filters run concurrently to display products matching all selected criteria.

---

## API Documentation

### 1. Login API
- **Endpoint**: `https://coding-assignment-server.vercel.app/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
        "email": "example@gmail.com",
        "password": "P@ssw0rd",
        "mobile": "7354440855"
  }
  ```
- **Response**:
  ```json
  {
        "message": "login successful",
        "email": "example@gmail.com",
        "mobile": "7354440855",
        "userName": "Creddinv",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
  ```

---

### 2. Product List API
- **Endpoint**: `https://coding-assignment-server.vercel.app/products`
- **Method**: GET
- **Headers**:
  ```json
  {
        "authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
        "data": [
             {
                  "name": "URB_N Men Printed Regular Fit Shirt",
                  "price": 999,
                  "sizes": ["S", "M", "XL"],
                  "color": ["red", "blue", "green"],
                  "brand": ["zara", "levi's", "US-polo"]
             },
             {
                  "name": "URB_N Men Printed Regular Fit Shirt",
                  "price": 599,
                  "sizes": ["S", "M", "XL"],
                  "color": ["red", "blue", "green"],
                  "brand": ["zara", "levi's", "US-polo"]
             },
             {
                  "name": "URB_N Men Printed Regular Fit Shirt",
                  "price": 499,
                  "sizes": ["S", "M", "XL"],
                  "color": ["red", "blue", "green"],
                  "brand": ["zara", "levi's", "US-polo"]
             }
        ]
  }
  ```

---

### 3. Token Validation API
- **Endpoint**: `https://coding-assignment-server.vercel.app/validateToken`
- **Method**: GET
- **Headers**:
  ```json
  {
        "authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
        "isValid": true,
        "message": "valid token"
  }
  ```

---

## How to Run the Project

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.
4. Access the application at `http://localhost:3000`.

---

## Folder Structure

- `/pages`: Contains all the application pages.
- `/components`: Reusable components like Navbar.
- `/utils`: Helper functions for API calls and validations.

---

## Future Enhancements

- Add user registration functionality.
- Implement pagination for the product list.
- Enhance UI/UX with additional styling and animations.

---  