import { describe, expect, it } from '@jest/globals';
import request from "supertest";
import { app } from "../index";

describe("Action Endpoints", () => {
  describe("GET /api/v1/action/available", () => {
    it("should return available actions", async () => {
      const res = await request(app).get("/api/v1/action/available");
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('availableActions');
      expect(Array.isArray(res.body.availableActions)).toBe(true);
    });
  });

  describe("GET /api/v1/action/service/:service", () => {
    it("should return actions by service", async () => {
      await request(app).post("/api/v1/action").send({
        name: "Test Action",
        image: "test-image.jpg",
        service: "test-service",
        actionType: "webhook"
      });

      const res = await request(app).get("/api/v1/action/service/test-service");
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('actions');
      expect(Array.isArray(res.body.actions)).toBe(true);
    });
  });

  describe("GET /api/v1/action/type/:actionType", () => {
    it("should return actions by type", async () => {
      await request(app).post("/api/v1/action").send({
        name: "Test Action",
        image: "test-image.jpg",
        service: "test-service",
        actionType: "webhook"
      });

      const res = await request(app).get("/api/v1/action/type/webhook");
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('actions');
      expect(Array.isArray(res.body.actions)).toBe(true);
    });
  });

  describe("POST /api/v1/action", () => {
    it("should create a new action", async () => {
      const actionData = {
        name: "Test Action",
        image: "test-image.jpg",
        service: "test-service",
        actionType: "webhook"
      };

      const res = await request(app).post("/api/v1/action").send(actionData);
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('action');
      expect(res.body.action.name).toBe(actionData.name);
      expect(res.body.action.service).toBe(actionData.service);
      expect(res.body.action.actionType).toBe(actionData.actionType);
    });

    it("should return error for missing required fields", async () => {
      const res = await request(app).post("/api/v1/action").send({
        name: "Test Action"
      });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Name, image, service, and actionType are required");
    });
  });

  describe("GET /api/v1/action/:id", () => {
    it("should return action by id", async () => {
      const createRes = await request(app).post("/api/v1/action").send({
        name: "Test Action",
        image: "test-image.jpg",
        service: "test-service",
        actionType: "webhook"
      });

      const actionId = createRes.body.action.id;
      const res = await request(app).get(`/api/v1/action/${actionId}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('action');
      expect(res.body.action.id).toBe(actionId);
      expect(res.body.action.name).toBe("Test Action");
    });
  });

  describe("PUT /api/v1/action/:id", () => {
    it("should update action successfully", async () => {
      const createRes = await request(app).post("/api/v1/action").send({
        name: "Test Action",
        image: "test-image.jpg",
        service: "test-service",
        actionType: "webhook"
      });

      const actionId = createRes.body.action.id;
      const updateData = {
        name: "Updated Action",
        service: "updated-service"
      };

      const res = await request(app).put(`/api/v1/action/${actionId}`).send(updateData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('action');
      expect(res.body.action.name).toBe(updateData.name);
      expect(res.body.action.service).toBe(updateData.service);
    });
  });

  describe("DELETE /api/v1/action/:id", () => {
    it("should delete action successfully", async () => {
      const createRes = await request(app).post("/api/v1/action").send({
        name: "Test Action",
        image: "test-image.jpg",
        service: "test-service",
        actionType: "webhook"
      });

      const actionId = createRes.body.action.id;
      const res = await request(app).delete(`/api/v1/action/${actionId}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Action deleted successfully");
    });
  });
});