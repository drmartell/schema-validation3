const uuid = require('uuid');
const {
  mkdirp,
  writeJSON,
  readDirectoryJSON,
} = require('../lib/file-system.js');

module.exports = class Model {
  constructor(modelName, schema) {
    this.modelName = modelName;
    this.schema = schema;
  }
  init() {
    return mkdirp(`./${this.modelName}`);
  }

  create(obj) {
    const id = uuid();
    const validatedObj = this.schema.validate(obj);
    return writeJSON(`${this.modelName}/${id}`, validatedObj);
  }

  find() {
    return readDirectoryJSON(`./${this.modelName}`);
  }
};
