import { describe, expect, test, it, beforeEach } from '@jest/globals';
import request from "supertest";
import { app } from "../index";

describe("Trigger Endpoints", () => {
  describe("GET /api/v1/trigger/available", () => {
    it("should return available triggers", async () => {
      const res = await request(app).get("/api/v1/trigger/available");
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('availableTriggers');
      expect(Array.isArray(res.body.availableTriggers)).toBe(true);
    });
  });

  describe("POST /api/v1/trigger", () => {
    it("should create a new trigger", async () => {
      const triggerData = {
        name: "Test Trigger",
        image: "test-image.jpg"
      };

      const res = await request(app).post("/api/v1/trigger").send(triggerData);
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('trigger');
      expect(res.body.trigger.name).toBe(triggerData.name);
      expect(res.body.trigger.image).toBe(triggerData.image);
    });

    it("should return error for missing required fields", async () => {
      const res = await request(app).post("/api/v1/trigger").send({
        name: "Test Trigger"
      });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Name and image are required");
    });
  });

  describe("GET /api/v1/trigger/:id", () => {
    it("should return trigger by id", async () => {
      const createRes = await request(app).post("/api/v1/trigger").send({
        name: "Test Trigger",
        image: "test-image.jpg"
      });

      const triggerId = createRes.body.trigger.id;
      const res = await request(app).get(`/api/v1/trigger/${triggerId}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('trigger');
      expect(res.body.trigger.id).toBe(triggerId);
      expect(res.body.trigger.name).toBe("Test Trigger");
    });

    it("should return 404 for non-existent trigger", async () => {
      const res = await request(app).get("/api/v1/trigger/999999");
      
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Trigger not found");
    });
  });

  describe("PUT /api/v1/trigger/:id", () => {
    it("should update trigger successfully", async () => {
      const createRes = await request(app).post("/api/v1/trigger").send({
        name: "Test Trigger",
        image: "test-image.jpg"
      });

      const triggerId = createRes.body.trigger.id;
      const updateData = {
        name: "Updated Trigger",
        image: "updated-image.jpg"
      };

      const res = await request(app).put(`/api/v1/trigger/${triggerId}`).send(updateData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('trigger');
      expect(res.body.trigger.name).toBe(updateData.name);
      expect(res.body.trigger.image).toBe(updateData.image);
    });
  });

  describe("DELETE /api/v1/trigger/:id", () => {
    it("should delete trigger successfully", async () => {
      const createRes = await request(app).post("/api/v1/trigger").send({
        name: "Test Trigger",
        image: "test-image.jpg"
      });

      const triggerId = createRes.body.trigger.id;
      const res = await request(app).delete(`/api/v1/trigger/${triggerId}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Trigger deleted successfully");
    });
  });
});