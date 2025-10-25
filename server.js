require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const adminRoutes = require('./routes/admin');
const paymentRoutes = require('./routes/payments');
const loanRoutes = require('./routes/loans');
const notificationRoutes = require('./routes/notifications');
const memberRoutes = require('./routes/members');
const reportRoutes = require('./routes/reports');


const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/reports', reportRoutes);

// Health check
app.get('/', (req, res) => res.send('LMS backend running'));

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
