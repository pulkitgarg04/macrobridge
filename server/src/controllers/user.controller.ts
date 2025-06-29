import { RequestHandler } from "express";
import prisma from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupSchema, loginSchema } from "../types";
import { JWT_SECRET } from "../config";

export const signupHandler: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const parsedData = signupSchema.safeParse(body);

    if (!parsedData.success) {
      res.status(411).json({
        message: "Incorrect inputs",
      });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });
    if (existingUser) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: parsedData.data.name,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
      message: "User Signed Up Successfully!",
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginHandler: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const parsedData = loginSchema.safeParse(body);

    if (!parsedData.success) {
      res.status(411).json({
        message: "Incorrect inputs",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
      message: "Login successful!",
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
