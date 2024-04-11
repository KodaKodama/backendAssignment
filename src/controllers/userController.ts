import { Request, Response } from "express";
const User = require('../models/userModel');
const {validateName, validateEmail, validatePassword} = require('../utils/validators');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { AuthenticatedRequest } from '../middlewares/auth';

export const userRegister = async(req: Request, res: Response) => {
    try {
        const { name, email, password, isSeller } = req.body;
        console.log(name, email)
        const userExists = await User.findOne({ email });

        if(userExists){
          return res.status(401).json({message: "user already exists"});
        }
        if(!validateName(name)){
          return res.status(401).json({message: "name should be more than 5 characters"});
        }
        if(!validateEmail(email)){
          return res.status(401).json({message: "enter a valid email address"});
        }
        if(!validatePassword(password)){
          return res.status(401).json({message: "enter a strong password"});
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isSeller
        });

        // Save the user document to the database
        const createdUser = await newUser.save();

        return res.status(200).send(`Welcome ${createdUser.name}, thanks for signing up`);
    } catch (error: any) {
        // Handle duplicate key error
        if (error.code === 11000 && error.keyPattern.email === 1) {
            return res.status(409).json({ message: "Email address is already in use" });
        }

        console.error('Error occurred during registration:', error);
        return res.status(500).send('An error occurred during registration');
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
        // Debugging: Log the email address received in the request
      const userExists = await User.findOne({ email });
      if (!userExists) {
        return res.status(401).json({ message: "User not found" });
      }
  
      const passwordMatched = bcrypt.compareSync(password, userExists.password);
      if (!passwordMatched) {
        return res.status(401).json({ message: "Incorrect password for email" });
      }
  
      const payload = { user: { id: userExists.id } };
      const token = await jwt.sign(payload, "secret message", {
        expiresIn: 450000,
      });
  
      res.cookie("t", token, { expires: new Date(Date.now() + 10000) });
      console.log("Success");
      return res.status(200).json({ token });
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  };
  
export const userLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('t');
        res.status(200).json({ message: "Logout successful" });
      } catch (e) {
        // Handle any potential errors here
        console.error(e);
        return res.status(500).json({
          message: "Internal Server Error"
        });
      }
};

export const editUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
      // Check if the user object exists on the request
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    // Extract the user ID from the request object
      const id = req.user.id;
      const {name, email, password} = req.body;

      if(!validateName(name)){
        return res.status(401).json({message: "name should be more than 5 characters"});
      }

      if(!validateEmail(email)){
        return res.status(401).json({message: "enter a valid email address"});
      }

      if(!validatePassword(password)){
        return res.status(401).json({message: "enter a strong password"});
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User updated successfully' });
    } catch (error: any) {
        if (error.code === 11000 && error.keyPattern.email === 1) {
            // Duplicate key error for email field
            return res.status(409).json({ error: 'Email address is already in use' });
        }
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

