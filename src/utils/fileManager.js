const fs = require('fs');

function loadFile(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = { loadFile, saveFile };
