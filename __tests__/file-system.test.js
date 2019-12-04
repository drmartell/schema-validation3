const {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile,
} = require('../lib/file-system.js');

const fs = require('fs').promises;

jest.mock('fs', () => {
  return {
    promises: {
      mkdir: jest.fn(() => Promise.resolve()),
      writeFile: jest.fn(() => Promise.resolve()),
      readFile: jest.fn(() => Promise.resolve(JSON.stringify({
        height: 17,
        color: 'blue',
      }))),
      readDirectoryJSON: jest.fn(() => Promise.resolve()),
      updateJSON: jest.fn(() => Promise.resolve()),
      deleteFile: jest.fn(() => Promise.resolve()),
    }
  };
}
);

describe('File System Functions', () => {
  describe('makedirp', () => {
    it('calls mkdir with the specified path', () => {
      return mkdirp('some-path')
        .then(() => expect(fs.mkdir).toHaveBeenCalledWith('some-path', { recursive: true }));
    });
  });
  describe('writeJSON', () => {
    it('calls writeFile with the specified path and stringified object', () => {
      return writeJSON('some-path', {})
        .then(() => expect(fs.writeFile).toHaveBeenCalledWith('some-path', '{}'));
    });
  });
  describe('readJSON', () => {
    it('calls readFile with the specified path', () => {
      return readJSON('some-path')
        .then(() => expect(fs.readFile).toHaveBeenCalledWith('some-path'));
    });
    it('parses JSON returned from readFile', () => {
      return readJSON('some-path')
        .then(result => expect(result).toEqual({
          height: 17,
          color: 'blue',
        }));
    });
  });
});
