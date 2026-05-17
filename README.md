---

# Lecture Hall Key Management System

---

## Project Title

Lecture Hall Key Management System

---

## Problem Description

In many universities, lecture hall keys are still managed manually using logbooks. This leads to delays, missing records, lack of accountability, and confusion about who has taken or returned keys.

There is no centralized digital system to track key usage efficiently.

---

## Proposed Solution

This project provides a **full-stack web-based system** to manage lecture hall keys digitally.

It includes:

* Secure authentication using JWT
* Role-based access control (Admin & Staff)
* Real-time key tracking
* RESTful API backend (Node.js + Express)
* Interactive frontend (React)

This improves efficiency, transparency, and accountability in key management.

---

## Features

### Authentication

* User registration and login
* JWT-based secure authentication
* Role-based access (Admin / Staff)

### Key Management

* Create lecture hall keys (Admin only)
* View all keys
* View single key details
* Update key status (available / in_use / lost)
* Delete key records (Admin only)

### Tracking System

* Track who opened a key
* Store opened and returned time
* Maintain key history logs

### Frontend Features

* Modern login UI
* Dashboard for key management
* Role-based UI rendering
* API integration using Axios

---

## Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* CORS
* Postman (Testing)

### Frontend

* React.js
* Vite
* Axios
* React Router DOM

### Tools

* Postman (API Testing)
* Git & GitHub (version control)
* VS Code (frontend and backend development)

---

## API Endpoints (with Examples)

---

### Authentication

#### Register User

```http
POST /api/auth/register
```

```json
{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin"
}
```

---

#### Login User

```http
POST /api/auth/login
```

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

---

### Key Management

#### Create Key (Admin Only)

```http
POST /api/keys
```

```json
{
  "lectureHall": "LH-01",
  "keyNumber": "KEY-1001",
  "building": "Main Campus"
}
```

---

#### Get All Keys

```http
GET /api/keys
```

---

#### Get Single Key

```http
GET /api/keys/:id
```

---

#### Update Key

```http
PUT /api/keys/:id
```

```json
{
  "status": "in_use"
}
```

---

#### Delete Key

```http
DELETE /api/keys/:id
```

---

## Setup Instructions

---

### Clone Repository

```bash
git clone https://github.com/Yazhiny-Manivannan/lecture-hall-key-system.git
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## How to Run the Project

---

### Start Backend

```bash
cd backend
npm start
```

Server runs at:

```
http://localhost:5000
```

---

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Summary

This is a **full-stack Lecture Hall Key Management System** designed to replace manual logbook tracking with a secure digital solution.

It ensures:

* Security 
* Transparency 
* Efficiency 

---

