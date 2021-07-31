require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer')
const verifyJWT = require('./utils/verifyJWT');

const PORT = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/profile_pictures' });

const registerPage = require('./routes/registerUser');
const loginPage = require('./routes/loginUser');
const userAuth = require('./routes/authUser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// routes that generate jwt auth token
app.use('/register', upload.single('avatar'), registerPage);
app.use('/log-in', loginPage);

// routes that need auth token
app.use('/isUserAuth', verifyJWT, userAuth);

app.listen(PORT);