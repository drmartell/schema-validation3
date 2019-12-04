const fs = require('fs').promises;

// mkdirp - make a directory and all parent directories
const mkdirp = path => fs.mkdir(path, { recursive: true });

// writeJSON - write an object to a file
const writeJSON = (path, object) => {
  const json = JSON.stringify(object);
  return fs.writeFile(path, json);
};

// readJSON - read an object from a file
const readJSON = path => {
  return fs.readFile(path)
    .then(contents => JSON.parse(contents));
};

// readDirectoryJSON - read all files in a directory as objects
const readDirectoryJSON = async(path) => {
  const fileArray = await fs.readdir(path);
  return Promise.all(fileArray.map(readJSON));
};

// updateJSON - update a files JSON
const updateJSON = () => {};
// write file

// deleteFile - delete a file
const deleteFile = () => {};

module.exports = {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile,
};
