const fs = require('fs');

const removeProfileImage = filePath => {
    fs.unlink(`./profile_pictures/${filePath}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    })
}

module.exports = {
    removeProfileImage
}