const fs = require('fs').promises;

// mkdirp - make a directory and all parent directories
const mkdirp = path => fs.mkdir(path, { recursive: true });

// writeJSON - write an object to a file
const writeJSON = (path, object) => {
  const json = JSON.stringify(object);
  return fs.writeFile(path, json);
};

// readJSON - read an object from a file
const readJSON = path => fs.readFile(path)
  .then(contents => JSON.parse(contents));

// readDirectoryJSON - read all files in a directory as objects
const readDirectoryJSON = async(path) => {
  const fileArray = await fs.readdir(path);
  return Promise.all(fileArray.map(fileName => readJSON(`${path}/${fileName}`)));
};

// updateJSON - update a files JSON
const updateJSON = async(path, object) => {
// read file, parse file, update object, (re)write file
  const fileObject = await readJSON(path);
  const updatedObject = { ...fileObject, ...object };
  // for(let key in object)
  //   fileObject[key] = object[key];
  // writeJSON(path, fileObject);
  writeJSON(path, updatedObject);
};

// deleteFile - delete a file
const deleteFile = path => fs.unlink(path);

module.exports = {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile,
};
