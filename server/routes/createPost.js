const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/gallery_images' });

const { dbClient } = require('../db/connection');
const { removeImage } = require('../utils/removeImage');

router.post('/', upload.single('imageToPost'), async(req, res) => {
    try {
        const { username, description } = req.body;
        const filePath = req.file.path;

        const userIdQuery = await dbClient.query(
            `
                SELECT id FROM users
                WHERE username = '${username}'
            `
        );

        await dbClient.query(
            `
                INSERT INTO posts(user_id, description, date_of_making, document_location)
                VALUES ('${userIdQuery.rows[0].id}', '${description}', CURRENT_DATE, '${filePath}');
            `
        );

        res.sendStatus(201);
    } catch (err) {
        console.log(err);

        removeImage(req.file.path);
        res.json({ message: 'error occured' });
    }
});

module.exports = router;