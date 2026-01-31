# Backend Module Documentation

This document provides a comprehensive overview of the backend module for the RideConnect application. It covers the server setup, database connection, available routes, data models, and controllers.

## 1. Project Setup & Configuration

The backend is built using **Node.js** with the **Express** framework. It uses **MongoDB** as the database, connected via **Mongoose**.

### Key Dependencies
- **express**: Web framework for Node.js.
- **mongoose**: ODM library for MongoDB.
- **dotenv**: Loads environment variables from a `.env` file.
- **express-session**: Manages user sessions.
- **connect-mongo**: MongoDB session store for `express-session`.
- **cookie-parser**: Parse Cookie header and populate `req.cookies`.
- **bcrypt**: Library for hashing passwords.
- **crypto**: Built-in module for cryptographic functionality (used for OTP generation).
- **validator**: String validation and sanitization.

### Server Initialization (`index.js`)
The main entry point is `index.js`. It performs the following setup:
1.  **Environment Variables**: Loads configuration (like `MONGO_URL`, `SECRET`) using `dotenv`.
2.  **Database Connection**: Connects to MongoDB using `mongoose.connect()`.
3.  **Session Management**: Configures `express-session` to store sessions in MongoDB (`connect-mongo`) under the collection `session`.
    -   Session cookie is set to `httpOnly`, `strict` sameSite policy, and expires in 24 hours.
4.  **Middleware**:
    -   `express.json()`: Parses incoming JSON payloads.
5.  **Routing**: mounts all API routes under the `/api/` prefix.
6.  **Server Start**: Listens on port **8080**.

---

## 2. API Routes

All routes are prefixed with `/api/` and are defined in `Router/routes.js`.

| Method | Endpoint | Description | Controller Function |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/register` | User registration | `userRegister` |
| **POST** | `/api/login` | User login (OTP based) | `userLogin` |
| **POST** | `/api/captain/register` | Captain registration | `CaptainRegister` |
| **POST** | `/api/captain/login` | Captain login (OTP based) | `CaptainLogin` |
| **POST** | `/api/captain/vehicle/reg` | Captain vehicle registration | `CaptainVehicleRegistration` |
| **POST** | `/api/admin/register` | Admin registration | `adminReg` |
| **POST** | `/api/admin/login` | Admin login | `adminLogin` |

---

## 3. Controllers

Controllers handle the logic for each route.

### User Controller (`Controller/UserController/UserLoginSignup.js`)
-   **`userRegister`**:
    -   Validates phone and email (using `validator`).
    -   Checks if the user already exists.
    -   Generates a 4-digit OTP.
    -   Creates a new User document with the OTP.
-   **`userLogin`**:
    -   Checks if the user exists.
    -   **OTP Generation**: If no OTP is provided in the request, generates a new 4-digit OTP, saves it to the user document, and sends it back (simulated sending).
    -   **OTP Verification**: If an OTP is provided, it compares it with the stored OTP.
    -   On success: Clears the OTP field, creates a session (`req.session.userId`), and logs the user in.

### Captain Controller
**Authentication (`Controller/CaptainController/CaptainRegister.js`)**
-   **`CaptainRegister`**:
    -   Validates the phone number.
    -   Checks for existing captain.
    -   Generates a 4-digit OTP and saves the new Captain.
-   **`CaptainLogin`**:
    -   Similar to User Login.
    -   Checks existence.
    -   Generates/Sends OTP if not provided.
    -   Verifies OTP if provided.
    -   Sets session `req.session.captainId`.

**Vehicle (`Controller/CaptainController/CaptainVehicle.js`)**
-   **`CaptainVehicleRegistration`**:
    -   Validates all required fields: `vehicleNumber`, `vehicleType`, `insuranceNumber`, `insuranceExpiryDate`, `insuranceImage`, `rcBook`, `rcBookImage`.
    -   Checks if the vehicle number already exists.
    -   Saves the new Vehicle details.

### Admin Controller (`Controller/adminController/adminController.js`)
-   **`adminReg`**:
    -   Validates name, email, password.
    -   Checks if admin already exists.
    -   Hashes the password using `bcrypt` (salt rounds: 10).
    -   Saves the new Admin.
-   **`adminLogin`**:
    -   Finds admin by email.
    -   Compares provided password with stored hash using `bcrypt.compare`.
    -   Sets session `req.session.adminId`.

---

## 4. Database Models

Mongoose schemas define the structure of the data.

### User Model (`models/UserModel/User.js`)
-   **Collection**: `users` (implied by Mongoose default)
-   **Schema**:
    -   `phone`: Number, unique, required.
    -   `email`: String, unique, required.
    -   `Otp`: String.

### Captain Model (`models/CaptainModel/CaptainRegister.js`)
-   **Collection**: `captainregisters` (implied)
-   **Schema**:
    -   `phone`: Number, unique, required.
    -   `Otp`: String.

### Captain Vehicle Model (`models/CaptainModel/CaptainVehicleReg.js`)
-   **Collection**: `vehicledetails` (explicitly named "vehicleDetail" in model)
-   **Schema**:
    -   `vehicleNumber`: String, unique, required.
    -   `vehicleType`: String, required.
    -   `insuranceNumber`: String, unique, required.
    -   `insuranceExpiryDate`: Date, required.
    -   `insuranceImage`: String.
    -   `rcBook`: String, required.
    -   `rcBookImage`: String.

### Admin Model (`models/admin/AdminModel.js`)
-   **Collection**: `admins` (explicitly named "admin" in model)
-   **Schema**:
    -   `name`: String, required.
    -   `email`: String, unique, required.
    -   `password`: String, required (hashed).
