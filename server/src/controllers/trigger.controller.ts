import { RequestHandler } from "express";
import prisma from "../db";

export const getAvailableTrigger: RequestHandler = async (req, res) => {
  try {
    const availableTriggers = await prisma.availableTrigger.findMany({});
    res.status(200).json({ availableTriggers });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const getTriggerById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const trigger = await prisma.availableTrigger.findUnique({
      where: { id },
    });

    if (!trigger) {
      res.status(404).json({ error: "Trigger not found" });
      return;
    }

    res.status(200).json({ trigger });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const createTrigger: RequestHandler = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      res.status(400).json({ error: "Name and image are required" });
      return;
    }

    const trigger = await prisma.availableTrigger.create({
      data: {
        name,
        image,
      },
    });

    res.status(201).json({ trigger });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const updateTrigger: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const existingTrigger = await prisma.availableTrigger.findUnique({
      where: { id },
    });

    if (!existingTrigger) {
      res.status(404).json({ error: "Trigger not found" });
      return;
    }

    const trigger = await prisma.availableTrigger.update({
      where: { id },
      data: {
        name: name || existingTrigger.name,
        image: image || existingTrigger.image,
      },
    });

    res.status(200).json({ trigger });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const deleteTrigger: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTrigger = await prisma.availableTrigger.findUnique({
      where: { id },
    });

    if (!existingTrigger) {
      res.status(404).json({ error: "Trigger not found" });
      return;
    }

    await prisma.availableTrigger.delete({
      where: { id },
    });

    res.status(200).json({ message: "Trigger deleted successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};