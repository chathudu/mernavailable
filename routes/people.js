const Person = require('../models/Player');
const express = require('express');
const router = express.Router();

exports.getPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching people', error });
  }
};

// Get list of people
router.get('/', peopleController.getPeople);

module.exports = router;
