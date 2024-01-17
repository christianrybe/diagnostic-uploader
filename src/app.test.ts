import request from "supertest";
import app from "./app";

describe("GET /health", () => {
  it("should return status 200 and a JSON response", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      status: "healthy",
      uptime: expect.any(Number),
      timestamp: expect.any(String),
    });
  });
});

describe("POST /api/archives", () => {
  it("should return status 201 and a success message", async () => {
    const response = await request(app).post("/api/archives").attach("file", "path/to/file");
    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      status: "success",
      message: "File uploaded successfully",
    });
  });
});
