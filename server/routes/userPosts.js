const express = require('express');
const router = express.Router();

const { dbClient } = require('../db/connection');
const verifyJWT = require('../utils/verifyJWT');
const { removeImage } = require('../utils/removeImage');

router.get('/', async(req, res) => {
    try {
        const username = req.query.username;

        const posts = await dbClient.query(
            `
                SELECT posts.id AS id, posts.user_id AS user_id, posts.description as description, posts.date_of_making as date_of_making, posts.document_location as document_location FROM posts
                JOIN users 
                    ON users.id = posts.user_id
                WHERE username = '${username}'; 
            `
        );

        res.send(posts.rows);
    } catch (err) {
        console.log(err);
    }
});

// router.get('/:id', async(req, res) => {
//     try {
//         console.log(req.query.id);

// const id = req.query.id;

// const documentLocation = await dbClient.query(
//     `
//         SELECT document_location 
//         FROM Posts
//         WHERE id = '${id}' 
//     `
// );

// const avatarURL = documentLocation.rows[0].document_location;

// res.sendFile(avatarURL, { root: path.join(__dirname, '..') });
//     } catch (err) {
//         console.log(err);
//     }
// });

router.delete('/:id', verifyJWT, async(req, res) => {
    try {
        const id = req.params.id;

        const docLocation = await dbClient.query(
            `
                DELETE FROM posts
                WHERE id = '${id}'
                RETURNING document_location
            `
        );

        removeImage(docLocation.rows[0].document_location);

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;