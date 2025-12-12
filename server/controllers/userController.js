const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registratie van een gebruiker
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Gebruiker geregistreerd' });
  } catch (error) {
    res.status(500).json({ error: 'Er ging iets mis bij registratie' });
  }
};

// Login van een gebruiker
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Gebruiker niet gevonden' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ error: 'Wachtwoord is onjuist' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token });
};

module.exports = { registerUser, loginUser };
