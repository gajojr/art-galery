require('dotenv').config({ path: '../.env' });
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { dbClient } = require('../db/connection');

router.post('/', async(req, res) => {
    try {
        const { username, password } = await req.body;

        const usernameQuery = await dbClient.query(
            `
                SELECT username FROM Users 
                WHERE username = '${username}';
            `
        );

        if (!usernameQuery.rows.length) {
            console.log('usao u username check');
            res.json({ error: 'user with this username doesn\'t exist' });
        }

        const passwordAndRoleQuery = await dbClient.query(
            `
                SELECT password, administration_role, app_role FROM Users
                WHERE username = '${username}';
            `
        )

        const passwordFromDb = passwordAndRoleQuery.rows[0].password;

        const comparePassword = await bcrypt.compare(password, passwordFromDb);

        if (comparePassword) {
            const id = usernameQuery.rows[0].id;
            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: 900
            });

            res.json({ auth: true, token, username, role: passwordAndRoleQuery.rows[0].administration_role, appRole: passwordAndRoleQuery.rows[0].app_role });
        } else {
            res.json({ error: 'username and password don\'t match!' });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;