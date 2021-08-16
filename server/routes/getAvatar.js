const express = require('express');
const router = express.Router();
// const path = require('path');
const { dbClient } = require('../db/connection');

router.get('/', async(req, res) => {
    try {
        const username = req.query.username;

        const documentLocation = await dbClient.query(
            `
                SELECT document_location 
                FROM Users
                WHERE username = '${username}' 
            `
        );

        const avatarURL = documentLocation.rows[0].document_location;

        // res.sendFile(avatarURL, { root: path.join(__dirname, '..') });
        res.send(avatarURL);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;