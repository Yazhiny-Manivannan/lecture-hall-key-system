---

#  Lecture Hall Key Management System

---

##  Project Title

Lecture Hall Key Management System

---

## Problem Description

In many universities, lecture hall keys are still managed manually using logbooks. This leads to delays, missing records, lack of accountability, and confusion about who has taken or returned keys.

There is no centralized digital system to track key usage efficiently.

---

## Proposed Solution

This project provides a **RESTful API-based backend system** to manage lecture hall keys digitally.

It allows secure authentication, role-based access control, and real-time tracking of key status using Node.js, Express.js, and MongoDB.

The system improves efficiency, transparency, and accountability.

---

## Features

* User Authentication using JWT
* Role-Based Access Control (Admin & Staff)
* Create lecture hall keys (Admin only)
* View all keys
* View single key details
* Update key status (borrowed / available)
* Delete key records (Admin only)
* Track key usage history
* MongoDB database integration

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (Authentication)
* bcryptjs
* Postman (API Testing)
* Git & GitHub

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
  "email": "admin@gmail.com",
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
  "email": "admin@gmail.com",
  "password": "123456"
}
```

---

### Key Management

---

#### Create Key (Admin Only)

```http
POST /api/keys/create
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
GET /api/keys/getallkeys
```

---

#### Get Single Key

```http
GET /api/keys/getsinglekey/:id
```

---

#### Update Key

```http
PUT /api/keys/update/:id
```

```json
{
  "status": "borrowed"
}
```

---

#### Delete Key

```http
DELETE /api/keys/delete/:id
```

---

## Setup Instructions

---

### 1. Clone the repository

```bash
git clone https://github.com/Yazhiny-Manivannan/lecture-hall-key-system.git
```

---

### 2. Navigate to project folder

```bash
cd lecture-hall-key-system
```

---

### 3. Install dependencies

```bash
npm install
```

---

### 4. Create `.env` file

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## How to Run the Project

---

### Start server

```bash
npm start
```

Server will run at:

```txt
http://localhost:5000
```

---

##Testing

Use Postman to test:

1. Register user
2. Login user and get JWT token
3. Add token in Authorization (Bearer Token)
4. Test all key APIs

---

