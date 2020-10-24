const db = require("../models");
const Goods = db.goods;

// Create and Save a new Good
exports.create = (req, res) => {
    // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Good
  const good = new Goods({
    title: req.body.title,
    price: req.body.price,
    in_stock: req.body.in_stock ? req.body.in_stock : false,
    category: req.body.category,
    supplier: req.body.supplier,
    quantity: req.body.quantity,

  });

  // Save Good in the database
  good
    .save(good)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Good."
      });
    });
  
};

// Retrieve all Goods from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Goods.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving goods."
      });
    });
  
};

// Find a single Good with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Goods.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Good with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Good with id=" + id });
    });
  
};

// Update a Good by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Goods.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Good with id=${id}. Maybe Good was not found!`
            });
          } else res.send({ message: "Good was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Good with id=" + id
          });
        });
  
};

// Delete a Good with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

  Goods.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Good with id=${id}. Maybe Good was not found!`
        });
      } else {
        res.send({
          message: "Good was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Good with id=" + id
      });
    });
  
};

// Delete all Goods from the database.
exports.deleteAll = (req, res) => {
    Goods.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Goods were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Goods."
      });
    });
  
};

// Find all in stock Good
exports.findAllinStock = (req, res) => {
    Goods.find({ in_stock: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving goods."
      });
    });
  
};