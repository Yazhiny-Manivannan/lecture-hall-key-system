Lecture Hall Key Request Management System

---

Project Title: 
Lecture Hall Key Request Management System

---

Problem Description: 
In many universities, lecture hall keys are still managed manually. This leads to delays, missing records, and confusion about who has taken or returned keys. There is no proper digital system to track and manage key requests efficiently.

---

Proposed Solution: 
This system provides a RESTful API-based solution that allows users to request lecture hall keys, track their status, and manage returns digitally. It improves efficiency, transparency, and record management using Node.js, Express.js, and MongoDB.

---

Features: 
- Create key request
- View all key requests
- View single request by ID
- Update request status (Approved / Returned)
- Delete key request
- Track request history

---

Technologies Used: 
- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman (API Testing)
- GitHub (Version Control)

---

API Endpoints (with Examples): 

1. Create Key Request
POST `/api/requests`

```json
{
  "studentName": "Yazhiny",
  "lectureHall": "A101",
  "status": "Pending"
}
```

---

2. Get All Requests
GET `/api/requests`

---

3. Get Request by ID
GET `/api/requests/:id`

---

4. Update Request
PUT `/api/requests/:id`

```json
{
  "status": "Returned"
}
```

---

5. Delete Request
DELETE `/api/requests/:id`

---

Setup Instructions

1. Clone the repository
git clone https://github.com/your-username/lecture-hall-key-system.git

2. Go to project folder
cd lecture-hall-key-system

3. Install dependencies
npm install

4. Create `.env` file

PORT=5000
MONGO_URI=your_mongodb_connection_string


5. Run server
node server.js

---

How to Run the Project
npm run dev


OR

node server.js

---

Testing
Use Postman to test all API endpoints.

---

