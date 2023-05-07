import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModelRepository } from "../repository/user.repository";
import { logRequest } from '../middleware/logger.middleware';

const authController = Router();

// POST /auth/register
authController.post("/register", logRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username:string , password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModelRepository.findOne({ where: { username: string } });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await UserModelRepository.create({id:Number, username:string , password:hashedPassword });

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || "");

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /auth/login
authController.post("/login", logRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await UserModelRepository.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET || "");

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /auth/logout
authController.post("/logout", logRequest, (req: Request, res: Response, next: NextFunction) => {
  // Destroy the session and clear the cookie
  req.cookies?.Destroy((error: any) => {
    if (error) {
      next(error);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.clearCookie("sessionId").status(200).end();
    }
  });
});

export default authController;

