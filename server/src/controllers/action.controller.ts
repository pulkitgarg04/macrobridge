import { RequestHandler } from "express";
import prisma from "../db";

export const getAvailableAction: RequestHandler = async (req, res) => {
  try {
    const availableActions = await prisma.availableAction.findMany({});
    res.status(200).json({ availableActions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createAction: RequestHandler = async (req, res) => {
  try {
    const { name, image, service, actionType } = req.body;

    if (!name || !image || !service || !actionType) {
      res.status(400).json({ 
        error: "Name, image, service, and actionType are required" 
      });
      return;
    }

    const action = await prisma.availableAction.create({
      data: {
        name,
        image,
        service,
        actionType,
      },
    });

    res.status(201).json({ action });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAction: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, service, actionType } = req.body;

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
        service: service || existingAction.service,
        actionType: actionType || existingAction.actionType,
      },
    });

    res.status(200).json({ action });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getActionsByService: RequestHandler = async (req, res) => {
  try {
    const { service } = req.params;
    const actions = await prisma.availableAction.findMany({
      where: { service },
    });

    res.status(200).json({ actions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getActionsByType: RequestHandler = async (req, res) => {
  try {
    const { actionType } = req.params;
    const actions = await prisma.availableAction.findMany({
      where: { actionType },
    });

    res.status(200).json({ actions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};