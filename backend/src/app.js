const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
