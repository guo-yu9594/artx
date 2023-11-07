import fs from "fs";

export function saveFileToServer(file: any) {
  const filePath = `./${file.originalname}`;

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });
  });
}