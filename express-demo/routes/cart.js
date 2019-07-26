const express = require("express");
const router = express.Router();

router.get("/", async (request, response) => {
  const result = [
    { id: 1, value: 1, product: "Nivea Shampoo 250 ml", price: 3.78 },
    { id: 2, value: 2, product: "Jack Daniels Whiskey .75", price: 24.3 },
    { id: 3, value: 2, product: "Noodles 1lb", price: 2.08 },
    { id: 4, value: 1, product: "Chicken Kyiv", price: 12.9 }
  ];
  response.send(JSON.stringify(result, null, " "));
});

module.exports = router;
