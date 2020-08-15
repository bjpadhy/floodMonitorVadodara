//Import Router from express
const express = require('express');
const router = express.Router();
const {vishwamitriLevel, ajwaLevel} = require('../models/levels');

router.get('/:level', async (request, response) => {
    try {
        if (request.params.level === "vishwamitri") {
            const data = await vishwamitriLevel.find();
            response.status(200).json(data);
        }
        else {
            const data = await ajwaLevel.find();
            response.status(200).json(data);
        }
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;