const fs = require('fs');

const removeProfileImage = filePath => {
    if (fs.existsSync(filePath)) {
        fs.unlink(`${filePath}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }
}

module.exports = {
    removeProfileImage
}