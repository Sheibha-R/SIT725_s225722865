const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("Certificate API", () => {
  beforeEach(async () => {
    await request(app).post("/api/reset");
  });

  it("Valid: POST /api/certificates returns 201 for correct body", async () => {
    const res = await request(app).post("/api/certificates").send({
      title: "Mocha + Chai Basics",
      platform: "LinkedIn Learning",
      hours: 2,
      completed: true
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("record");
    expect(res.body.record).to.have.property("id");
    expect(res.body.record.title).to.equal("Mocha + Chai Basics");
  });

  it("Invalid/error: POST /api/certificates returns 400 for missing title", async () => {
    const res = await request(app).post("/api/certificates").send({
      platform: "LinkedIn Learning",
      hours: 2,
      completed: true
    });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error");
    expect(res.body.error).to.include("title");
  });

  it("Edge: GET /api/progress returns 0% when no certificates exist", async () => {
    const res = await request(app).get("/api/progress");
    expect(res.status).to.equal(200);
    expect(res.body.progressPercent).to.equal(0);
    expect(res.body.completedHours).to.equal(0.0);
  });

  it("Valid: GET /api/progress reflects saved records correctly", async () => {
    await request(app).post("/api/certificates").send({
      title: "Course A",
      platform: "LL",
      hours: 1,
      completed: true
    });

    await request(app).post("/api/certificates").send({
      title: "Course B",
      platform: "LL",
      hours: 2,
      completed: false
    });

    const res = await request(app).get("/api/progress");
    expect(res.status).to.equal(200);
    expect(res.body.progressPercent).to.equal(50);
    expect(res.body.completedHours).to.equal(1.0);
  });
});