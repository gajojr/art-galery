const express = require('express');
const router = express.Router();

const { dbClient } = require('../db/connection');

router.get('/', async(req, res) => {
    try {
        console.log(req.query.category);
        console.log(req.query.filterBy);

        const category = req.query.category;
        const filterBy = req.query.filterBy;

        const postsQuery = await dbClient.query(
            `
                SELECT * FROM posts
                ORDER BY date_of_making DESC
                LIMIT 10
            `
        );

        if (category !== 'All') {
            postsQuery.rows = postsQuery.rows.filter(row => row.category === category);
        }

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