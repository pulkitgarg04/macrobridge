import { RequestHandler } from "express";
import prisma from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupSchema, loginSchema, AuthenticatedRequest } from "../types";
import { JWT_SECRET } from "../config";

export const signupHandler: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const parsedData = signupSchema.safeParse(body);

    if (!parsedData.success) {
      res.status(411).json({
        message: "Invalid data",
        errors: parsedData.error.errors,
      });
      return;
    }
    const { email, name, password } = parsedData.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("Authorization", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
      message: "User Signed Up Successfully!",
    });
    return;
  } catch (err: any) {
    res.status(400).json({ error: err.message });
    return;
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

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({
        message: "Field missing",
      });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("Authorization", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
      message: "Login successful!",
    });
    return;
  } catch (err: any) {
    res.status(400).json({ error: err.message });
    return;
  }
};

export const getUserInfo: RequestHandler = async (req, res) => {
  const id = (req as any).id;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    res.json({ user });
    return;
  } catch (error) {
    console.error("Fetch User Error: ", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
