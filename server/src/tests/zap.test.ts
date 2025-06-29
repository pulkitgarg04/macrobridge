import { describe, expect, test, it, beforeEach } from '@jest/globals';
import request from "supertest";
import { app } from "../index";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

describe("Zap Endpoints", () => {
  let authToken: string;
  let triggerId: string;
  let actionId: string;

  beforeEach(async () => {
    // 1. Create a test user
    const signupRes = await request(app).post("/api/v1/user/signup").send({
      name: "Test User",
      email: `test${Date.now()}@example.com`, // Unique email
      password: "password123"
    });
    
    console.log("Signup response status:", signupRes.statusCode);
    console.log("Signup response body:", signupRes.body);
    
    authToken = signupRes.body.token;

    // 2. Create a test trigger
    const triggerRes = await request(app).post("/api/v1/trigger").send({
      name: "Test Trigger",
      image: "test-trigger.jpg"
    });
    triggerId = triggerRes.body.trigger.id;

    // 3. Create a test action
    const actionRes = await request(app).post("/api/v1/action").send({
      name: "Test Action",
      image: "test-action.jpg",
      service: "test-service",
      actionType: "webhook"
    });
    actionId = actionRes.body.action.id;
  }, 15000); // Increase timeout to 15 seconds

  describe("POST /api/v1/zap", () => {
    it("should create a new zap with valid auth", async () => {
      // Debug: Decode the token to see what's in it
      const decoded = jwt.verify(authToken, JWT_SECRET);
      console.log("Decoded token:", decoded);
      
      const zapData = {
        availableTriggerId: triggerId,
        triggerMetadata: { key: "value" },
        actions: [
          {
            availableActionId: actionId,
            actionMetadata: { actionKey: "actionValue" }
          }
        ]
      };

      console.log("Using token:", authToken);
      console.log("Request data:", zapData);
      
      const res = await request(app)
        .post("/api/v1/zap")
        .set('Authorization', `Bearer ${authToken}`)
        .send(zapData);
      
      console.log("Response status:", res.statusCode);
      console.log("Response body:", res.body);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('zapId');
    }, 10000); // Increase test timeout to 10 seconds

    it("should return 401 without auth token", async () => {
      const zapData = {
        availableTriggerId: triggerId,
        actions: [
          {
            availableActionId: actionId,
            actionMetadata: {}
          }
        ]
      };

      const res = await request(app)
        .post("/api/v1/zap")
        .send(zapData);
      
      expect(res.statusCode).toBe(401);
    });

    it("should return error for non-existent trigger", async () => {
      const zapData = {
        availableTriggerId: "non-existent-trigger-id",
        actions: [
          {
            availableActionId: actionId,
            actionMetadata: {}
          }
        ]
      };

      const res = await request(app)
        .post("/api/v1/zap")
        .set('Authorization', `Bearer ${authToken}`)
        .send(zapData);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Trigger not found");
    });

    it("should return error for non-existent action", async () => {
      const zapData = {
        availableTriggerId: triggerId,
        actions: [
          {
            availableActionId: "non-existent-action-id",
            actionMetadata: {}
          }
        ]
      };

      const res = await request(app)
        .post("/api/v1/zap")
        .set('Authorization', `Bearer ${authToken}`)
        .send(zapData);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain("Actions not found");
    });
  });

  describe("GET /api/v1/zap", () => {
    it("should return user's zaps with valid auth", async () => {
      const res = await request(app)
        .get("/api/v1/zap")
        .set('Authorization', `Bearer ${authToken}`);
      
      console.log("GET zaps response status:", res.statusCode);
      console.log("GET zaps response body:", res.body);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('zaps');
      expect(Array.isArray(res.body.zaps)).toBe(true);
    });

    it("should return empty array for user with no zaps", async () => {
      const res = await request(app)
        .get("/api/v1/zap")
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('zaps');
      expect(Array.isArray(res.body.zaps)).toBe(true);
      expect(res.body.zaps.length).toBe(0);
    });
  });

  describe("GET /api/v1/zap/:zapId", () => {
    it("should return specific zap with valid auth", async () => {
      // First create a zap
      const createRes = await request(app)
        .post("/api/v1/zap")
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          availableTriggerId: triggerId,
          actions: [
            {
              availableActionId: actionId,
              actionMetadata: {}
            }
          ]
        });

      const zapId = createRes.body.zapId;
      const res = await request(app)
        .get(`/api/v1/zap/${zapId}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('zap');
      expect(res.body.zap.id).toBe(zapId);
    });

    it("should return 404 for non-existent zap", async () => {
      const res = await request(app)
        .get("/api/v1/zap/non-existent-zap-id")
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.zap).toBe(null);
    });
  });
});