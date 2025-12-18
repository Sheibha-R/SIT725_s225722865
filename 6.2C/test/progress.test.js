const { expect } = require("chai");
const { calculateProgress } = require("../src/progress");

describe("calculateProgress()", () => {
  it("Edge: returns 0% and 0 hours for empty array", () => {
    const out = calculateProgress([]);
    expect(out.totalCertificates).to.equal(0);
    expect(out.completedCertificates).to.equal(0);
    expect(out.progressPercent).to.equal(0);
    expect(out.completedHours).to.equal(0.0);
  });

  it("Valid: calculates correct percent and completed hours", () => {
    const out = calculateProgress([
      { hours: 2, completed: true },
      { hours: 1.5, completed: false },
      { hours: 3, completed: true }
    ]);
    expect(out.totalCertificates).to.equal(3);
    expect(out.completedCertificates).to.equal(2);
    expect(out.progressPercent).to.equal(67);  // rounded
    expect(out.completedHours).to.equal(5.0);  // 2 + 3
  });

  it("Invalid/error: throws if input is not an array", () => {
    expect(() => calculateProgress("not an array")).to.throw("certificates must be an array");
  });
});
