require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const verifyJWT = require('./utils/verifyJWT');

const PORT = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/profile_pictures' });

const registerPage = require('./routes/registerUser');
const loginPage = require('./routes/loginUser');
const getAvatar = require('./routes/getAvatar');
const userPosts = require('./routes/userPosts');
const posts = require('./routes/posts');
const createPost = require('./routes/createPost');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// routes that generate jwt auth token
app.use('/register', upload.single('avatar'), registerPage);
app.use('/log-in', loginPage);
app.use('/posts', posts);

// routes that need auth token
app.use('/get-avatar', verifyJWT, getAvatar);
app.use('/create-post', verifyJWT, createPost);
app.use('/user-posts', userPosts);

app.listen(PORT);