import express from 'express';
import session from 'express-session';

import playersRoutes from './routes/players.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import webRoutes from './routes/web.routes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { url } from 'inspector';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/players', playersRoutes);
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', webRoutes);

app.use(express.static('public')); 

// Health 
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
