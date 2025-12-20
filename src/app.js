import express from 'express';
import session from 'express-session';

import playersRoutes from './routes/players.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'whoareya-secret', 
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static('public')); 

// Routes
app.use('/api/players', playersRoutes);
app.use('/api/auth', authRoutes);

// Health 
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
