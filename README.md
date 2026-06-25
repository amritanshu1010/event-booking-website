# 🎉 EventHub – Event Booking & Management Platform

A modern full-stack Event Booking & Management Platform built using the **MERN Stack**. EventHub allows administrators to create and manage events while users can discover events, view details, and book tickets online.

---

## 🚀 Features

### 👨‍💼 Admin
- Create new events
- Manage event details
- Dashboard for event management
- Store events in MongoDB Atlas

### 👤 User
- Browse available events
- View detailed event information
- Book tickets
- View booked events
- Modern responsive UI

### 🗄 Database
- MongoDB Atlas integration
- Event collection
- Booking collection

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- JavaScript
- CSS3
- Axios

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

## Tools
- VS Code
- Git & GitHub
- Postman

---

# 📂 Project Structure

```
EVENT BOOKING WEBSITE
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   ├── assets
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── screenshot
├── Project_Report.docx
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/eventhub.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on

```
http://localhost:5173
```

Backend will run on

```
http://localhost:5000
```

---

# 📡 API Endpoints

## Events

| Method | Endpoint |
|---------|----------|
| GET | `/api/events` |
| POST | `/api/events` |

---

## Bookings

| Method | Endpoint |
|---------|----------|
| GET | `/api/bookings` |
| POST | `/api/bookings` |

---

# 🗄 Database Schema

## Events

```
title
description
category
location
date
time
image
price
rating
organizer
```

## Bookings

```
eventId
title
location
tickets
price
createdAt
```

---

# 🔄 Project Workflow

```
Admin
   │
Create Event
   │
MongoDB Atlas
   │
Frontend Fetches Events
   │
User Opens Event Details
   │
Books Ticket
   │
Booking Saved in MongoDB
   │
My Bookings Page
```

---

# 📸 Screenshots

Add screenshots inside the `screenshot` folder.

Example:

- Home Page
- Event Details
- Admin Dashboard
- Create Event
- My Bookings
- MongoDB Collections

---

# 🌟 Future Enhancements

- 💳 Payment Gateway Integration
- 📧 Email Notifications
- 🎫 QR Code Tickets
- ⭐ Reviews & Ratings
- 🔍 Advanced Search
- 📱 Mobile Application
- 📊 Analytics Dashboard

---

# 👨‍💻 Developer

**Amritanshu Pandey**

B.Tech (2nd Semester)

Major Project

---

# 📄 License

This project is developed for educational purposes as a college major project.

---

## ⭐ If you like this project, don't forget to give it a Star!