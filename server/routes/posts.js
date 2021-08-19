const express = require('express');
const router = express.Router();

const { dbClient } = require('../db/connection');

router.get('/', async(req, res) => {
    try {
        const postsQuery = await dbClient.query(
            `
                SELECT * FROM posts
                ORDER BY date_of_making DESC
                LIMIT 10
            `
        );

        // wait for all the Promises, then collect the result
        const posts = await Promise.all(postsQuery.rows.map(async post => {
            const numOfLikes = await dbClient.query(
                `
                    SELECT COUNT(*) 
                    FROM likes 
                    WHERE id = '${post.id}'
                `
            );

            return {...post, num_of_likes: numOfLikes.rows[0].count };
        }));

        res.send(posts);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;