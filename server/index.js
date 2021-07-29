require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const verifyJWT = require('./utils/verifyJWT');

const PORT = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/profile_pictures' });

const registerPage = require('./routes/registerUser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());

// routes
app.use('/register', upload.single('avatar'), registerPage);

app.get('isUserAuth', verifyJWT, (req, res) => {
    res.send('You are authenticated');
});

app.post('/login', (req, res) => {
    // prvo proveri da li je ulogovan

    const id = 1; // rows[0].id
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 600
    });

    res.json({ auth: true, token, result: rows[0] });
});

app.listen(PORT);