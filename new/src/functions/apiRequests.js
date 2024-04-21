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

module.exports = {
    saveDataToFile
};