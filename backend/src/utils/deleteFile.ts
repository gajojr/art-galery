import * as fs from 'fs';

const removeImage = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlink(`${filePath}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
};

export default removeImage;
