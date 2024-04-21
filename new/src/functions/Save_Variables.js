const fs = require('fs');
const { sleep } = require('./functions');

// SALVATAGGIO AUTOMATICO DELLE VARIABILI

async function autoSave(timeAutoSave, variablesToSave) {
    while (true) {
        // Converti l'oggetto in una stringa JSON
        const dataToSave = JSON.stringify(variablesToSave, null, 2);
          
        // Scrivi la stringa JSON in un file
        fs.writeFileSync('../data/variables.json', dataToSave, 'utf-8', (err) => {
            if (err) {
                console.error('Si è verificato un errore durante il salvataggio delle variabili:', err);
            } else {
                console.log('Variabili salvate con successo.');
            }
        });
    await sleep(timeAutoSave);
    };
};

// SALVATAGGIO MANUALE DELLE VARIABILI

async function manualSave(variablesToSave) {  
    // Converti l'oggetto in una stringa JSON
    const dataToSave = JSON.stringify(variablesToSave, null, 2);
          
    // Scrivi la stringa JSON in un file
    fs.writeFileSync('../data/variables.json', dataToSave, 'utf-8', (err) => {
        if (err) {
            console.error('Si è verificato un errore durante il salvataggio delle variabili:', err);
        } else {
            console.log('Variabili salvate con successo.');
        }
    });
};

module.exports = {
    autoSave,
    manualSave
};