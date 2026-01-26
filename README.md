# 🚀 Freelance Job Finder – Full Stack Development (FSD) Project

A **Full Stack MERN web application** that connects **Clients** and **Freelancers** on a single platform.  
Clients can post freelance jobs, and freelancers can browse and apply for those jobs securely.

This project demonstrates **end-to-end full stack development**, clean architecture, authentication, and real-world problem solving — making it **highly suitable for placements and interviews**.

---

## 📌 Project Overview

The **Freelance Job Finder** platform simplifies the process of hiring freelancers and finding freelance work.

- Role-based user system (Client & Freelancer)
- Secure authentication and authorization
- Job posting and application workflow
- Clean frontend–backend separation
- Cloud-based database using MongoDB Atlas

---

## 👥 User Roles & Responsibilities

### 🧑‍💼 Client
- Register and login securely
- Post freelance job requirements
- View jobs posted by them
- View applications submitted by freelancers
- Manage job listings

### 🧑‍🔧 Freelancer
- Register and login securely
- Browse available jobs
- Apply for freelance jobs
- View application status
- Manage applied jobs

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Context API
- Axios
- HTML5, CSS3, JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- RESTful APIs
- JWT Authentication

### Database
- MongoDB Atlas
- Mongoose ODM

### Tools
- Git & GitHub
- VS Code
- Postman
- Nodemon

---

## 🗂️ Project Folder Structure

```text
FSD_Project/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md


---

## 🔐 Authentication & Security

- JWT-based authentication  
- Password hashing for secure storage  
- Protected routes using middleware  
- Role-based access control (Client / Freelancer)  
- Environment variables used for sensitive information  

---

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Vasundharadevi-1604/FSD_Project.git
cd FSD_Project

### 2️⃣ Backend Setup
```bash
cd backend
npm install

#### Create .env file in backend
Create a .env file inside the backend folder using .env.example as reference.

#### Start Backend Server
npm run dev
Backend runs at:
http://localhost:5000

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install

#### Start Frontend Application
npm start
Frontend runs at:
http://localhost:3000

