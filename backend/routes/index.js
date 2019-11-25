const express = require('express');
const bodyParser = require('body-parser');
const Message = require('./messages')

const pgClient = require("./connection")

const router = express.Router();
router.use(bodyParser.json());

// Handles GET requests to /messages
router.get('/messages', async (req, res) => {
    console.log(`received request: ${req.method} ${req.url}`)

    // Query for messages in descending order
    try {
        const msg = await Message.retrieve(pgClient);
        res.status(200).json(msg);
    } catch (error) {
        res.status(500).json(error.error);
    }
});

// Handles POST requests to /messages
router.post('/messages', async (req, res) => {
    try {
        await Message.create({ name: req.body.name, body: req.body.body, sticker: req.body.sticker }, pgClient);
        res.status(200).json("successfully inserted message into database");
    } catch (err) {
        if (err.routine == "ExecConstraints") {
            console.error('validation error: ' + err);
            res.status(400).json(err);
        } else {
            console.error('could not save: ' + err);
            res.status(500).json(err);
        }
    }
});

// Handles GET requests to /stickers
router.get('/stickers', (req, res) => {
    // TODO: get collection of stickers from storage bucket
});
module.exports = router;
