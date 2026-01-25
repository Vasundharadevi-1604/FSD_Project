
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Register user
export const registerUser = async (req, res) => {
  const { name, email, password, role} = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword ,role});
    res.status(201).json({ _id: user._id, name: user.name, email: user.email ,role:user.role});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({
        message: 'Login Successful',
        user: { 
          _id: user._id, 
          name: user.name, 
          email: user.email, 
          role: user.role 
        },
          token});
    } else {
      res.status(401).json({message:'Invalid email or password'});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
