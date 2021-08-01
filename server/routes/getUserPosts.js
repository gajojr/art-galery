const express = require('express');
const router = express.Router();

const { dbClient } = require('../db/connection');

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

module.exports = router;