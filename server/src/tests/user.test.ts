import { describe, expect, test, it, beforeEach } from '@jest/globals';
import request from "supertest";
import { app } from "../index";

describe("User Endpoints", () => {
  describe("POST /api/v1/user/signup", () => {
    it("should create a new user successfully", async () => {
      const res = await request(app).post("/api/v1/user/signup").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.name).toBe("Test User");
      expect(res.body.user.email).toBe("test@example.com");
    });

    it("should return error for invalid email format", async () => {
      const res = await request(app).post("/api/v1/user/signup").send({
        name: "Test User",
        email: "invalid-email",
        password: "password123"
      });
      
      expect(res.statusCode).toBe(411);
      expect(res.body.message).toBe("Incorrect inputs");
    });

    it("should return error for duplicate email", async () => {
      await request(app).post("/api/v1/user/signup").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });

      const res = await request(app).post("/api/v1/user/signup").send({
        name: "Another User",
        email: "test@example.com",
        password: "password456"
      });
      
      expect(res.statusCode).toBe(409);
      expect(res.body.error).toBe("Email already in use");
    });

    it("should return error for missing required fields", async () => {
      const res = await request(app).post("/api/v1/user/signup").send({
        name: "Test User"
        // Missing email and password
      });
      
      expect(res.statusCode).toBe(411);
      expect(res.body.message).toBe("Incorrect inputs");
    });
  });

  describe("POST /api/v1/user/login", () => {
    beforeEach(async () => {
      // Create a test user
      await request(app).post("/api/v1/user/signup").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });
    });

    it("should login successfully with correct credentials", async () => {
      const res = await request(app).post("/api/v1/user/login").send({
        email: "test@example.com",
        password: "password123"
      });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.email).toBe("test@example.com");
    });

    it("should return error for incorrect password", async () => {
      const res = await request(app).post("/api/v1/user/login").send({
        email: "test@example.com",
        password: "wrongpassword"
      });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe("Invalid email or password");
    });

    it("should return error for non-existent email", async () => {
      const res = await request(app).post("/api/v1/user/login").send({
        email: "nonexistent@example.com",
        password: "password123"
      });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe("Invalid email or password");
    });

    it("should return error for invalid email format", async () => {
      const res = await request(app).post("/api/v1/user/login").send({
        email: "invalid-email",
        password: "password123"
      });
      
      expect(res.statusCode).toBe(411);
      expect(res.body.message).toBe("Incorrect inputs");
    });
  });
}); 