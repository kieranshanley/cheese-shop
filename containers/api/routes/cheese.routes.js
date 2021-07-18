module.exports = app => {
    const cheeseApi = require("../controllers/cheeseApi.controller.js");
  
    var router = require("express").Router();
  
    // Create a new cheeseApi
    router.post("/", cheeseApi.create);
  
    // Retrieve all cheeseApi
    router.get("/", cheeseApi.findAll);
  
    // Retrieve a single cheeseApi with id
    router.get("/:id", cheeseApi.findOne);
  
    // Update a cheeseApi with id
    router.put("/:id", cheeseApi.update);
  
    // Delete a cheeseApi with id
    router.delete("/:id", cheeseApi.delete);
  
    // Delete all the cheeseApi
    router.delete("/", cheeseApi.deleteAll);
  
    app.use('/api/cheeseApi', router);
  };