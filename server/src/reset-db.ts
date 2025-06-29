import prisma from "./db";

async function resetDatabase() {
  try {
    console.log("Resetting database...");
    
    await prisma.action.deleteMany();
    console.log("Deleted actions");
    
    await prisma.trigger.deleteMany();
    console.log("Deleted triggers");
    
    await prisma.zap.deleteMany();
    console.log("Deleted zaps");
    
    await prisma.availableAction.deleteMany();
    console.log("Deleted available actions");
    
    await prisma.availableTrigger.deleteMany();
    console.log("Deleted available triggers");
    
    await prisma.user.deleteMany();
    console.log("Deleted users");
    
    console.log("Database reset complete!");
  } catch (error) {
    console.error("Error resetting database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase(); 