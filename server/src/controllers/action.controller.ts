import { RequestHandler } from "express";
import prisma from "../db";

export const getAvailableAction: RequestHandler = async (req, res) => {
  try {
    const availableActions = await prisma.availableAction.findMany({});
    res.status(200).json({ availableActions });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const getActionById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const action = await prisma.availableAction.findUnique({
      where: { id },
    });
    if (!action) {
      res.status(404).json({ error: "Action not found" });
      return;
    }
    res.status(200).json({ action });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const createAction: RequestHandler = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      res.status(400).json({ error: "Name and image are required" });
      return;
    }
    
    const action = await prisma.availableAction.create({
      data: { name, image },
    });

    res.status(201).json({ action });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const updateAction: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    const existingAction = await prisma.availableAction.findUnique({
      where: { id },
    });
    if (!existingAction) {
      res.status(404).json({ error: "Action not found" });
      return;
    }
    const action = await prisma.availableAction.update({
      where: { id },
      data: {
        name: name || existingAction.name,
        image: image || existingAction.image,
      },
    });
    res.status(200).json({ action });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const deleteAction: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const existingAction = await prisma.availableAction.findUnique({
      where: { id },
    });
    if (!existingAction) {
      res.status(404).json({ error: "Action not found" });
      return;
    }
    await prisma.availableAction.delete({
      where: { id },
    });
    res.status(200).json({ message: "Action deleted successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};