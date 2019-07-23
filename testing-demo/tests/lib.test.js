const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

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

describe("registerUser", () => {
  it("should throw exception if user name is falsy", () => {
    const args = [null, undefined, NaN, 0, "", false];
    args.forEach(arg => {
      expect(() => {
        lib.registerUser(arg);
      }).toThrow();
    });
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Bal");
    expect(result).toMatch(/Bal/);
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return supported currencies", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1 });
    expect(result).toHaveProperty("id", 1);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer have more than 10 points", () => {
    db.getCustomerSync = customerId => {
      return { id: customerId, points: 100 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to customer", () => {
    // db.getCustomerSync = customerId => {
    //   return { email: "a" };
    // };
    // let mailSent = false;
    // mail.send = (email, message) => {
    //   mailSent = true;
    // };
    // lib.notifyCustomer({ customerId: 1 });
    // expect(mailSent).toBe(true);
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    //First call and first argument
    expect(mail.send.mock.calls[0][0]).toBe("a");
  });
});
