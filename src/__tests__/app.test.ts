import request from "supertest";
import app from "../app";
// Mocking the upload function from multer
jest.mock("multer", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    single: () => (req: any, res: any, next: any) => {
      console.log("req", req);
      next();
    },
  })),
}));

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

// describe("POST /api/archives", () => {
//   it("should return status 201 and a success message", async () => {
//     const response = await request(app).post("/api/archives").attach("file", "./resources/test.txt");
//     console.log(response.error); // Log error for debugging
//     console.log("response", response);
//     expect(response.status).toBe(201);
//     expect(response.type).toBe("application/json");
//     expect(response.body).toEqual({
//       status: "success",
//       message: "File uploaded successfully",
//     });
//   });
// });
