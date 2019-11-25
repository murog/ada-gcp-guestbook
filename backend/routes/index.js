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
        // TODO: CloudSQL query
        // const msg = {
        //     name: "Crisco",
        //     body: "Northern pikas are most active and mostly feed soon after dawn and as dusk approaches.",
        //     stickerUrl: "https://i.pinimg.com/originals/63/b3/49/63b349f74f7f2e498e1ca74c66b829fa.jpg",
        //     timestamp: "11-19-2019"
        // };
        const msg = await Message.retrieve(pgClient);
        res.status(200).json(msg);
    } catch (error) {
        
        res.status(500).json(error.error);
    }
});

// Handles POST requests to /messages
router.post('/messages', (req, res) => {
    try {
        Message.create({ name: req.body.name, body: req.body.body, sticker: req.body.sticker }, pgClient);
        res.status(200).send();
    } catch (err) {
        // TODO: validation error might look different in postgres
        if (err.name == "ValidationError") {
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
