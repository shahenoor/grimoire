import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const signup = async (req, res) => {
    try {
      const { email, password, first_name, last_name } = req.body;
  
      const existingUser = await userModel.getUserByEmail(req, email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await userModel.createUser(req, {
        email,
        password: hashedPassword,
        first_name,
        last_name,
      });
  
      const token = jwt.sign({ id: newUser.id }, JWT_SECRET , {
        expiresIn: '1h',
      });
  
      res.status(201).json({ token, user: newUser });
    } catch (error) {
      console.error('Error during signup', error);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  };
  
  // Login Controller
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await userModel.getUserByEmail(req, email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ token, user });
    } catch (error) {
      console.error('Error during login', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export const getUserById = async (req,res) => {
    try{
        const { userId } = req.params; 
        const user = await userModel.getUserById(req, userId);
        if(!user){
            return res.status(404).json({ error: 'User does not exist'});
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching the user', error);
    }
};

export const createUser = async (req, res) => {
    try {
        const newUser = await userModel.createUser(req, res, req.body)
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating new user", error);
        res.status(400).send("Error creating new user");
    }
};

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params; 
        if (!userId) {
            return res.status(404).send('User Id not found');
        }
        const updateUser = await userModel.updateUser(req, res, req.body, userId)
        res.status(200).json(updateUser);
    } catch (error) {
        console.error("Error updating the user information", error);
        res.status(400).send("Error updating the user information");
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params; 
        const deleteUser = await userModel.deleteUser(req, res, userId)
        res.status(200).json(deleteUser);
    } catch (error) {
        console.error("Error deleting the user", error);
        res.status(400).send("Error deleting the user");
    }
};