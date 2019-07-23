const systemUnderTest = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw an exception if input not a number", () => {
    const args = [false, "a", {}, null, undefined, []];
    args.forEach(arg => {
      expect(() => {
        systemUnderTest.fizzBuzz(arg);
      }).toThrow();
    });
  });
  it("should return FizzBuzz if divisible by 3 and 5", () => {
    const result = systemUnderTest.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  it("should return Fizz if divisible by 3 and not 5", () => {
    const result = systemUnderTest.fizzBuzz(6);
    expect(result).toBe("Fizz");
  });
  it("should return Buzz if divisible by 5 and not 3", () => {
    const result = systemUnderTest.fizzBuzz(10);
    expect(result).toBe("Buzz");
  });
  it("should return same number if not divisible by 5 and not by 3", () => {
    const result = systemUnderTest.fizzBuzz(2);
    expect(result).toBe(2);
  });
});
