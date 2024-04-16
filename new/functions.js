const axios = require('axios');
const fs = require('fs');

function saveDataToFile(filePath) {
  return new Promise((resolve, reject) => {
    const url = 'https://api.hypixel.net/skyblock/bazaar';
    axios.get(url, { auth: { username: 'user', password: 'pass' }, responseType: 'stream' })
      .then((response) => {
        const fileStream = fs.createWriteStream(filePath);
        response.data.pipe(fileStream);
        fileStream.on('finish', () => {
          resolve();
        });
        fileStream.on('error', (error) => {
          console.error('Si è verificato un errore durante il salvataggio dei dati:', error);
          reject(error);
        });
      })
      .catch((error) => {
        console.error('Si è verificato un errore durante il recupero dei dati:', error);
        reject(error);
      });
  });
}

function searchNameInFile(filePath, name) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        console.error('Si è verificato un errore durante la lettura del file:', error);
        reject(error);
        return;
      }

      const lines = data.split('\n');

      let count = 0;
      for (const line of lines) {
        const words = line.match(/\b\w+\b/g);
        let foundIndex = -1;

        for (let i = 0; i < words.length; i++) {
          if (words[i].toLowerCase() === name.toLowerCase()) {
            foundIndex = i;
            count++;
            if (count >= 2) { // Dopo quante volte che trova nameToSearch si deve fermare es: 2
              const context = words.slice(foundIndex + 1, foundIndex + 19); // Quante parole dopo nameToSearch si deve salvare es: 1/19
              resolve(context);
              return;
            }
          }
        }
      }

      if (count < 2) {
        console.log('Il nome cercato non è stato trovato almeno due volte nel file.');
        resolve([]);
      }
    });
  });
}

function findValue(variable, value) {
  for (const sublist of variable) {
    const index = sublist.indexOf(value);
    if (index !== -1 && index < sublist.length - 1) {
      const nextValue = sublist[index + 1]; // Dopo quante parole rispetto a valueToFind deve cercare es: 1
      return nextValue;
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  saveDataToFile,
  searchNameInFile,
  findValue,
  sleep
};