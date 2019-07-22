const lib = require("../lib");

describe("absolute", () => {
  it("should return same number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it("should return positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it("should return zero number if input is zero", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
