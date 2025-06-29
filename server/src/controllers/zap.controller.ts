import prisma from "../db";
import { zapCreateSchema } from "../types";
import { RequestHandler } from "express";

export const createZapHandler: RequestHandler = async (req, res) => {
  // @ts-ignore
  const userId: number = parseInt(req.id);
  
  if (isNaN(userId)) {
    res.status(401).json({ error: "Invalid user ID" });
    return;
  }

  const body = req.body;
  const parsedData = zapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "Incorrect inputs",
    });
    return;
  }

  try {
    // Validate that the trigger exists
    const trigger = await prisma.availableTrigger.findUnique({
      where: { id: parsedData.data.availableTriggerId },
    });

    if (!trigger) {
      res.status(400).json({ error: "Trigger not found" });
      return;
    }

    // Validate that all actions exist
    const actionIds = parsedData.data.actions.map(action => action.availableActionId);
    const existingActions = await prisma.availableAction.findMany({
      where: { id: { in: actionIds } },
    });

    if (existingActions.length !== actionIds.length) {
      const foundIds = existingActions.map(action => action.id);
      const missingIds = actionIds.filter(id => !foundIds.includes(id));
      res.status(400).json({ 
        error: `Actions not found: ${missingIds.join(', ')}` 
      });
      return;
    }

    const zapId = await prisma.$transaction(async (tx) => {
      const zap = await tx.zap.create({
        data: {
          userId: userId,
          triggerId: "",
          actions: {
            create: parsedData.data.actions.map((x, index) => ({
              actionId: x.availableActionId,
              sortingOrder: index,
              metadata: x.actionMetadata,
            })),
          },
        },
      });

      const triggerInstance = await tx.trigger.create({
        data: {
          triggerId: parsedData.data.availableTriggerId,
          zapId: zap.id,
        },
      });

      await tx.zap.update({
        where: {
          id: zap.id,
        },
        data: {
          triggerId: triggerInstance.id,
        },
      });

      return zap.id;
    });

    res.status(200).json({
      zapId,
    });
  } catch (error: any) {
    console.error("Error creating zap:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getZapsHandler: RequestHandler = async (req, res) => {
  // @ts-ignore
  const userId: number = parseInt(req.id);
  
  if (isNaN(userId)) {
    res.status(401).json({ error: "Invalid user ID" });
    return;
  }

  const zaps = await prisma.zap.findMany({
    where: {
      userId: userId,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  res.status(200).json({ zaps });
};

export const getZapHandler: RequestHandler = async (req, res) => {
  // @ts-ignore
  const userId: number = parseInt(req.id);
  
  if (isNaN(userId)) {
    res.status(401).json({ error: "Invalid user ID" });
    return;
  }

  const zapId = req.params.zapId;

  const zap = await prisma.zap.findFirst({
    where: {
      id: zapId,
      userId: userId,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  res.status(200).json({ zap });
};
