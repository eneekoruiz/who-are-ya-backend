import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
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

    res.status(201).json({ message: 'User registered successfully', role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.user = {
      id: user._id,
      role: user.role,
      email: user.email
    };

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
};

// En src/controllers/auth.controller.js
export const getSession = (req, res) => {
  if (req.session.user) {
    res.json({
      authenticated: true,
      user: req.session.user
    });
  } else {
    res.json({
      authenticated: false,
      message: 'No hay sesión activa'
    });
  }
};
