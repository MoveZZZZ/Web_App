# 🛡️ Web_App – Secure Web Application

This repository contains a **full-stack secure web application** developed with **ASP.NET Core (C#)** on the backend and **React (JavaScript + TailwindCSS)** on the frontend.  

The project was created as part of the *BSIAW – Security of Information Systems and Web Applications* coursework and follows **OWASP Application Security Verification Standard (ASVS) Level 1**.  
It demonstrates **secure coding practices**, **modern web development principles**, and a **practical implementation of a two-tier user system (Users and Admins)**.  

---

## 🎯 Project Goals
The main objective of this project is to:
- Design and implement a **functional and secure web application**.  
- Demonstrate **OWASP-based security controls** in a real-world system.  
- Provide **user management and e-commerce-like features**.  
- Explore **integration of 2FA, secure sessions, and audit logging**.  
- Show how to combine **ASP.NET Core backend** with a **React frontend** into a cohesive solution.  

---

## ✨ Features

### 🔐 Security
- ✅ Secure authentication with **hashed passwords**  
- ✅ **Two-Factor Authentication (2FA)** with verification codes  
- ✅ Session and cookie management with security flags  
- ✅ Input validation and sanitization  
- ✅ Protection against:  
  - SQL Injection  
  - Cross-Site Scripting (XSS)  
  - Cross-Site Request Forgery (CSRF)  
- ✅ Role-based access control (RBAC) for **Users** and **Admins**  
- ✅ Logging of key security events  

### 👨‍💻 User Features
- Register and manage profile  
- Login with 2FA verification  
- Place and track orders  
- View order history  

### 🛠️ Admin Features
- Admin dashboard with **user and order management**  
- Add and manage products (towary)  
- Process orders and archive them  
- Monitor audit logs for suspicious activity  

### 🎨 User Interface
- Built with **React + TailwindCSS**  
- Responsive and mobile-friendly design  
- Reusable UI components (Navbar, Footer, Modal, Spinner, etc.)  
- Error and success message system  

---

## 📂 Project Structure
```
Web_App-master/
│── Web_App.sln                 # .NET Solution
│── Web_App/Program.cs          # Backend entrypoint
│── Web_App/Web_App.csproj      # Project definition
│── Web_App/appsettings.json    # Configurations
│── Web_App/OWASP_L1_PROGRESS.txt # Security checklist
│
├── Web_App/ClientApp/          # React frontend
│   ├── public/                 # Static assets (favicon, manifest)
│   ├── src/
│   │   ├── assets/             # Images, gifs, icons
│   │   ├── components/         # UI components (Navbar, Footer, Modals, etc.)
│   │   ├── context/            # React context
│   │   ├── pages/              # Core pages:
│   │   │   ├── HomePage.jsx
│   │   │   ├── AuthorizationPages/ (Login, 2FA, Reset password)
│   │   │   ├── AdminPage/ (Orders, Products, Archive)
│   │   └── App.js / index.js   # Entrypoints
│   └── package.json            # Frontend dependencies
│
└── README.md                   # Documentation
```

---

## 🏗️ Architecture Overview

The application is designed as a **three-tier system**:  

1. **Frontend Layer (React + TailwindCSS)**  
   - Provides interactive UI  
   - Handles client-side validation  
   - Sends API requests to backend  

2. **Backend Layer (ASP.NET Core)**  
   - Provides REST APIs  
   - Handles authentication, authorization, and business logic  
   - Logs actions and security events  

3. **Database Layer (SQL-based)**  
   - Stores users, roles, orders, and logs  
   - Secured with parameterized queries  
   - Supports audit trails  

---

## ⚙️ Requirements
- **.NET 6.0+**  
- **Node.js 16+**  
- **SQL Server / PostgreSQL** (configurable in `appsettings.json`)  
- Browser: Chrome / Firefox / Edge  

---

## 🚀 Installation Guide

### 1. Backend (ASP.NET Core)
```bash
cd Web_App
dotnet restore
dotnet build
dotnet run
```

### 2. Frontend (React)
```bash
cd Web_App/ClientApp
npm install
npm start
```

- Backend will run at: `http://localhost:5000`  
- Frontend will run at: `http://localhost:3000`  

---

## 🔬 Usage Scenarios

### User Journey
1. User registers with email + password  
2. Logs in and enters **2FA code**  
3. Can browse products and place orders  
4. Orders are saved in the database  
5. User can view order status/history  

### Admin Journey
1. Logs in as Admin  
2. Accesses **Admin Dashboard**  
3. Manages products, users, and orders  
4. Processes pending orders and archives them  
5. Reviews **security logs**  

---

## 📊 OWASP Controls Implemented

From the included `OWASP_L1_PROGRESS.txt`, the following controls were implemented:

- **Authentication and Password Management**  
  - Hashed passwords, secure sessions, 2FA  

- **Input Validation**  
  - Sanitization of user input  
  - Validation of forms  

- **Session Management**  
  - Expiration after inactivity  
  - Secure cookies  

- **Access Control**  
  - RBAC (Admin/User separation)  
  - Protected routes in React  

- **Cryptographic Practices**  
  - Strong password hashing  
  - Secure token generation  

- **Error Handling & Logging**  
  - Meaningful but secure error messages  
  - Audit trail for login and order management  

---

## 🧩 Future Improvements
- 🔹 Expand 2FA to support authenticator apps  
- 🔹 Improve **logging with ELK stack** integration  
- 🔹 Add automated **security tests** in CI/CD  
---

## 🛠️ Technologies Used
- **Backend:** ASP.NET Core (C#)  
- **Frontend:** React, TailwindCSS  
- **Database:** SQL Server / PostgreSQL  
- **Authentication:** ASP.NET Identity + 2FA  
- **Security Framework:** OWASP ASVS Level 1, OWASP CRS, Suricata, iptables, proxy, secure header(local virtual server)
- **DevOps:** NGINX 

---
