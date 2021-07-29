const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt');
const { dbClient } = require('../db/connection');
const { removeProfileImage } = require('../utils/removeProfileImage');

router.post('/', async(req, res) => {
    try {
        const body = await req.body;
        // file path is not in body
        const filePath = req.file.path;

        console.log(body);

        // hash the password for security
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const usernameQuery = await dbClient.query(
            `
                SELECT * FROM Users 
                WHERE username = '${body.username}';
            `
        );

        if (usernameQuery && usernameQuery.rows && usernameQuery.rows.length) {
            console.log('usao u username check');
            removeProfileImage(filePath);
            res.json({ error: 'user with this username already exists' });
        }

        const emailQuery = await dbClient.query(
            `
                SELECT * FROM Users 
                WHERE email = '${body.email}';
            `
        );

        if (emailQuery && emailQuery.rows && emailQuery.rows.length) {
            console.log('usao u email check');
            removeProfileImage(filePath);
            res.json({ error: 'user with this email already exists!' });
        }

        await dbClient.query(
            `
                INSERT INTO Users(name, lastname, password, username, date_of_making, app_role, email, administration_role, document_location)
                VALUES ('${body.firstName}', '${body.lastName}', '${hashedPassword}', '${body.username}', CURRENT_DATE, '${body.appRole}', '${body.email}', 'user', '${filePath}');
            `
        );

        res.status(200).json({ message: 'registered successfully' });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;