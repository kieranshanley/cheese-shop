const db = require("../models");
const Cheese = db.cheese;

// Cheese creation
exports.create = (req, res) => {
    // Validate name
    if (!req.body.name) {
      res.status(400).send({ message: "Name can not be empty!" });
      return;
    }

    // Validate description
    if (!req.body.description) {
      res.status(400).send({ message: "Description can not be empty!" });
      return;
    }

    // Validate colour
    if (!req.body.colour) {
      res.status(400).send({ message: "Colour can not be empty!" });
      return;
    }

    // Validate price
    if (!req.body.pricePerKg) {
      res.status(400).send({ message: "Price is a required parameter!" });
      return;
    }
  
    // Create a Cheese
    const cheese = new Cheese({
      name: req.body.name,
      description: req.body.description,
      pricePerKg: req.body.pricePerKg,
      colour: req.body.colour
    });
  
    // Save cheese in the database
    cheese
      .save(cheese)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the cheese."
        });
      });
  };
  
  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Cheese.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Cheeses."
        });
      });
  };
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Cheese.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Cheese with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Cheese with id=" + id });
      });
  };
  
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Cheese.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Cheese with id=${id}. Maybe Cheese was not found!`
          });
        } else res.send({ message: "Cheese was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Cheese with id=" + id
        });
      });
  };
  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Cheese.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Cheese with id=${id}. Maybe Cheese was not found!`
          });
        } else {
          res.send({
            message: "Cheese was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Cheese with id=" + id
        });
      });
  };
  
  exports.deleteAll = (req, res) => {
    Cheese.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Cheeses were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Cheeses."
        });
      });
  };