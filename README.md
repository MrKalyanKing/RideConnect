# RideConnect - Backend Module Documentation

This document provides a comprehensive overview of the backend module for the RideConnect application. It covers the server setup, database connection, available routes, data models, controllers, and real-time communication features.

## Table of Contents

1.  [Project Setup & Configuration](#1-project-setup--configuration)
    -   [Key Dependencies](#key-dependencies)
    -   [Server Initialization](#server-initialization-indexjs)
2.  [API Routes](#2-api-routes)
3.  [Controllers](#3-controllers)
    -   [User Controller](#user-controller-controllerusercontrolleruserloginsignupjs)
    -   [Captain Controller](#captain-controller)
    -   [Admin Controller](#admin-controller-controlleradmincontrolleradmincontrollerjs)
4.  [Database Models](#4-database-models)
    -   [User Model](#user-model-modelsusermodeluserjs)
    -   [Captain Model](#captain-model-modelscaptainmodelcaptainregisterjs)
    -   [Captain Vehicle Model](#captain-vehicle-model-modelscaptainmodelcaptainvehicleregjs)
    -   [Admin Model](#admin-model-modelsadminadminmodeljs)
5.  [Real-Time Communication (Socket.io)](#5-real-time-communication-socketio)

---

## 1. Project Setup & Configuration

The backend is built using **Node.js** with the **Express** framework. It uses **MongoDB** as the database, connected via **Mongoose**.

### Key Dependencies
-   **express**: Web framework for Node.js.
-   **mongoose**: ODM library for MongoDB.
-   **dotenv**: Loads environment variables from a `.env` file.
-   **express-session**: Manages user sessions.
-   **connect-mongo**: MongoDB session store for `express-session`.
-   **cookie-parser**: Parse Cookie header and populate `req.cookies`.
-   **bcrypt**: Library for hashing passwords.
-   **crypto**: Built-in module for cryptographic functionality (used for OTP generation).
-   **validator**: String validation and sanitization.
-   **socket.io**: Enables real-time, bidirectional communication.
-   **@imagekit/nodejs**: Used for image uploads.

### Server Initialization (`index.js` & `server.js`)
The main entry point is `server.js` which initializes the HTTP server and Socket.io.
1.  **Environment Variables**: Loads configuration (like `MONGO_URL`, `SECRET`) using `dotenv`.
2.  **Database Connection**: Connects to MongoDB using `mongoose.connect()`.
3.  **Session Management**: Configures `express-session` to store sessions in MongoDB (`connect-mongo`) under the collection `session`.
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
| **POST** | `/api/captain/vehicle/reg` | Captain vehicle registration (w/ Image Upload) | `CaptainVehicleRegistration` |
| **POST** | `/api/admin/register` | Admin registration | `adminReg` |
| **POST** | `/api/admin/login` | Admin login | `adminLogin` |
| **GET** | `/api/admin/vehicle/pending` | Get all pending vehicles | `getPendingVehicles` |

---

## 3. Controllers

Controllers handle the logic for each route.

### User Controller (`Controller/UserController/UserLoginSignup.js`)
-   **`userRegister`**:
    -   Validates phone and email.
    -   Checks if the user already exists.
    -   Generates a 4-digit OTP and creates a new User document.
-   **`userLogin`**:
    -   Checks if the user exists.
    -   **OTP Logic**: Generates/Verifies OTP.
    -   On success: Creates a session (`req.session.userId`).

### Captain Controller
**Authentication (`Controller/CaptainController/CaptainRegister.js`)**
-   **`CaptainRegister`**: Validates phone, checks existence, generates OTP, saves new Captain.
-   **`CaptainLogin`**: Similar to User Login (OTP based), sets `req.session.captainId`.

**Vehicle (`Controller/CaptainController/CaptainVehicle.js`)**
-   **`CaptainVehicleRegistration`**:
    -   Handles multi-part form data authentication for image uploads (`rcBookImage`, `insuranceImage`).
    -   Uploads images to ImageKit.
    -   Validates required fields (`vehicleNumber`, `vehicleType`, etc.).
    -   Saves the new Vehicle details.
    -   **Socket Event**: Emits `new_vehicle_submitted` upon successful registration.

### Admin Controller (`Controller/adminController/adminController.js`)
-   **`adminReg`**: Hashes password using `bcrypt` and creates a new Admin.
-   **`adminLogin`**: Verifies password and sets `req.session.adminId`.

---

## 4. Database Models

Mongoose schemas define the structure of the data.

### User Model (`models/UserModel/User.js`)
-   `phone`: Number, unique, required.
-   `email`: String, unique, required.
-   `Otp`: String.

### Captain Model (`models/CaptainModel/CaptainRegister.js`)
-   `phone`: Number, unique, required.
-   `Otp`: String.

### Captain Vehicle Model (`models/CaptainModel/CaptainVehicleReg.js`)
-   **Collection**: `vehicledetails`
-   `vehicleNumber`: String, unique, required.
-   `vehicleType`: String, required.
-   `insuranceNumber`: String, unique, required.
-   `insuranceExpiryDate`: Date, required.
-   `insuranceImage`: String (URL).
-   `rcBook`: String, required.
-   `rcBookImage`: String (URL).
-   `status`: String (Default: 'pending', 'approved', 'rejected').

### Admin Model (`models/admin/AdminModel.js`)
-   **Collection**: `admins`
-   `name`: String, required.
-   `email`: String, unique, required.
-   `password`: String, required (hashed).

---

## 5. Real-Time Communication (Socket.io)

The backend uses `socket.io` to facilitate real-time updates between the Captain's vehicle submission and the Admin dashboard.

**Initialization**: Defined in `socket.io.js`, initialized in `server.js`.

### Events

| Event Name | Type | Description | Payload / Arguments |
| :--- | :--- | :--- | :--- |
| `connection` | **On** | Triggered when a client connects. | `socket` object |
| `new_vehicle_submitted` | **Emit** | Broadcasted when a captain submits a new vehicle. | `newVehicle` object |
| `admin_approve_vehicle` | **On** | Listener for Admin verifying a vehicle. | `{ vehicleId: "..." }` |
| `approve_success` | **Emit** | Sent back to Admin upon successful approval. | `{ message: "...", newVehicle: {...} }` |
| `admin_rejected_vehicle` | **On** | Listener for Admin rejecting a vehicle. | `{ vehicleId: "..." }` |
| `rejected_success` | **Emit** | Sent back to Admin upon rejection. | `{ message: "...", newVehicle: {...} }` |
| `error_message` | **Emit** | Sent on any socket processing error. | `{ message: "...", error?: "..." }` |


added the otp
