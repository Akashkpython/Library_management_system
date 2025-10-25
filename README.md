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

## Developer

**Akash Share** - Developer


*Thank you visit again.*