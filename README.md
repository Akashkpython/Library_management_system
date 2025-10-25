# Library Management System

![Project Status](https://img.shields.io/badge/status-in%20progress-yellow)

## Project Overview

This is a comprehensive Library Management System developed as part of the academic curriculum. The system automates library operations including book issue/return, member management, and record maintenance to ensure efficiency, accuracy, and digital access.

**Note: This project is still under development and processing. Features may be incomplete or subject to change.**

## Features Implemented

### 🔍 Search Module
- Search by title, author, ISBN, and subject
- Filter by availability and category

### 📗 Book Management
- Add, update, delete books
- Manage book details including ISBN, publisher, pages, etc.
- Track availability and quantity

### 🔐 Authentication & Authorization
- Separate login for Admin, Librarian, and Student roles
- JWT-based secure access
- Role-based permissions

### 📘 Book Issue & Return
- Track borrowing and returning
- Calculate overdue fines (₹10 per day)
- Renew loan functionality

### 👥 Member Management
- Register and manage library members
- Maintain profiles and activity history
- Role-based access control

### 📊 Reports & Notifications
- Generate usage statistics
- Track overdue loans with fines
- Identify popular books
- System notifications for users

## Technology Stack

### Backend
- **Node.js** with Express framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Dotenv** for environment management

### Frontend
- **React.js** with functional components
- **Tailwind CSS** for styling
- **React Router** for navigation

## System Architecture

```
CLIENT (React) ↔ REST API (Express) ↔ DATABASE (MongoDB)
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Akashkpython/Library_management_system.git
   ```

2. Install backend dependencies:
   ```bash
   cd Library_management_system
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/lms
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

2. Update the `MONGO_URI` if you're using a different MongoDB connection string.

## Running the Application

1. Start the backend server:
   ```bash
   # From the root directory
   node server.js
   ```

2. Start the frontend development server:
   ```bash
   # From the frontend directory
   cd frontend
   npm start
   ```

3. Access the application:
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:3000

## Project Structure

```
Library_management_system/
├── config/              # Database configuration
├── controllers/         # Business logic
├── frontend/            # React frontend application
├── middlewares/         # Authentication and error handling
├── models/              # MongoDB schemas
├── routes/              # API endpoints
├── utils/               # Utility functions
├── .env                 # Environment variables
├── server.js            # Entry point
└── package.json         # Project dependencies
```

## Development Scripts

- `npm start` - Start the backend server
- `npm run dev` - Start the backend server with nodemon (hot reloading)
- `cd frontend && npm start` - Start the frontend development server

## Current Development Status

⚠️ **This project is still under active development**

### Completed Features
- [x] User authentication and role-based access control
- [x] Book management (CRUD operations)
- [x] Loan management (borrow/return/renew)
- [x] Search functionality
- [x] Member management
- [x] Reports and statistics
- [x] Fine calculation for overdue books

### In Progress Features
- [ ] Payment integration
- [ ] Advanced reporting features
- [ ] Email notifications
- [ ] Mobile responsiveness improvements
- [ ] Unit tests coverage

## Contributing

This project is primarily for educational purposes. Contributions are welcome for learning and improvement.

## License

This project is developed for academic purposes and does not have a specific license.

## Developer

**Akash Share** - Developer

---
*This README will be updated as the project progresses through development.*