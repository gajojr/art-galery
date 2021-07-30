require('dotenv').config({ path: '../.env' });
const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        // check if user with this username already exists
        if (usernameQuery && usernameQuery.rows && usernameQuery.rows.length) {
            console.log('usao u username check');
            removeProfileImage(filePath);
            return res.json({ error: 'user with this username already exists' });
        }

        const emailQuery = await dbClient.query(
            `
                SELECT * FROM Users 
                WHERE email = '${body.email}';
            `
        );

        // check if user with this email already exists
        if (emailQuery && emailQuery.rows && emailQuery.rows.length) {
            console.log('usao u email check');
            removeProfileImage(filePath);
            return res.json({ error: 'user with this email already exists!' });
        }

        const user = await dbClient.query(
            `
                INSERT INTO Users(name, lastname, password, username, date_of_making, app_role, email, administration_role, document_location)
                VALUES ('${body.firstName}', '${body.lastName}', '${hashedPassword}', '${body.username}', CURRENT_DATE, '${body.appRole}', '${body.email}', 'user', '${filePath}')
                RETURNING id;
            `
        );

        console.log(user.rows[0].id);

        const id = user.rows[0].id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: 600
        });

        res.json({ message: 'registered successfully', auth: true, token, username: body.username, role: body.administration_role });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;