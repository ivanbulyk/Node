module.exports = app => {
    const goods = require("../controllers/goods.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Good
    router.post("/", goods.create);
  
    // Retrieve all Goods
    router.get("/", goods.findAll);
  
    // Retrieve all in stock Goods
    router.get("/in_stock", goods.findAllinStock);
  
    // Retrieve a single Good with id
    router.get("/:id", goods.findOne);
  
    // Update a Good with id
    router.put("/:id", goods.update);
  
    // Delete a Good with id
    router.delete("/:id", goods.delete);
  
    // Delete all Goods
    router.delete("/", goods.deleteAll);
  
    app.use('/api/goods', router);
  };