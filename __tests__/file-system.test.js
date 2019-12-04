const {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile,
} = require('../lib/file-system.js');

const fs = require('fs').promises;

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
  }
})
);

describe('File System Functions', () => {
  describe('makedirp', () => {
    it('calls mkdir with the specified path', async() => {
      return await mkdirp('some-path')
        .then(() => expect(fs.mkdir).toHaveBeenCalledWith('some-path', { recursive: true }));
    });
  });
  describe('writeJSON', () => {
    it('calls writeFile with the specified path and stringified object', async() => {
      return await writeJSON('some-path', {})
        .then(() => expect(fs.writeFile).toHaveBeenCalledWith('some-path', '{}'));
    });
  });
});
