import { describe, expect, test, it } from '@jest/globals';
import request from "supertest";
import { app } from "../index";

describe("General Endpoints", () => {
  describe("GET /", () => {
    it("should return welcome message", async () => {
      const res = await request(app).get("/");
      
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Hi There! Welcome to Marcobridge");
    });
  });

  describe("404 handling", () => {
    it("should return 404 for non-existent routes", async () => {
      const res = await request(app).get("/non-existent-route");
      
      expect(res.statusCode).toBe(404);
    });
  });
}); 