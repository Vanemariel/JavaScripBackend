const fs = require('fs');

async function loadFile(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveFile(path, data) {
  try {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
} catch (error) {
  console.error(`Error guardando ${path}:`, err.message);
    throw err;
}

  /*fs.writeFileSync(path, JSON.stringify(data, null, 2));*/
}

module.exports = { loadFile, saveFile };
