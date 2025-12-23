import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// FORMULARIOS
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// REGISTER (web)
router.post('/register', async (req, res) => {
  console.log('REGISTER BODY:', req.body);

  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      return res.render('register', { error: 'Missing fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('register', { error: 'Email already in use' });
    }

    const usersCount = await User.countDocuments();
    const role = usersCount === 0 ? 'admin' : 'user';

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    res.redirect('/login');
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.render('register', { error: 'Error registering user' });
  }
});

// LOGIN (web)
router.post('/login', async (req, res) => {
  console.log('LOGIN BODY:', req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { error: 'Missing email or password' });
    }

    const user = await User.findOne({ email });
    console.log('FOUND USER:', user);

    if (!user) {
      return res.render('login', { error: 'Invalid credentials (no user)' });
    }

    console.log('HASHED PASSWORD:', user.password);

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('PASSWORD MATCH:', validPassword);

    if (!validPassword) {
      return res.render('login', { error: 'Invalid credentials (bad password)' });
    }

    req.session.user = {
      id: user._id,
      role: user.role,
      email: user.email
    };

    console.log('SESSION SET:', req.session.user);

    res.redirect('/admin');
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.render('login', { error: 'Login error' });
  }
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// ADMIN
router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.send('<h1>Admin panel</h1><a href="/logout">Logout</a>');
});

export default router;