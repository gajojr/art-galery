const express = require('express');
const router = express.Router();
const path = require('path');

const { dbClient } = require('../db/connection');
const verifyJWT = require('../utils/verifyJWT');
const { removeImage } = require('../utils/removeImage');

router.get('/', async(req, res) => {
    try {
        const username = req.query.username;

        // if there are no likes for given post it won't display
        const postsQuery = await dbClient.query(
            `
                SELECT 
                posts.id AS id, 
                posts.user_id AS user_id, 
                posts.description AS description, 
                posts.date_of_making AS date_of_making, 
                posts.document_location AS document_location,
                COUNT(likes.id) AS num_of_likes
                FROM posts
                JOIN users 
                    ON users.id = posts.user_id 
                JOIN likes
                    ON posts.id = likes.post_id
                WHERE users.username = '${username}'
                GROUP BY posts.id;
            `
        );

        res.send(postsQuery.rows);
    } catch (err) {
        console.log(err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;

        const documentLocation = await dbClient.query(
            `
                SELECT document_location 
                FROM Posts
                WHERE id = '${id}' 
            `
        );

        const avatarURL = documentLocation.rows[0].document_location;

        res.send(avatarURL);
    } catch (err) {
        console.log(err);
        res.json({ message: 'error occurred' });
    }
});

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