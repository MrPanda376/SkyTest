const fs = require('fs');
const { sleep } = require('./functions/functions');

// SALVATAGGIO AUTOMATICO DELLE VARIABILI

async function autoSave(timeAutoSave) {
    while (true) {
        // Salva tutte le variabili in un oggetto
        const variablesToSave = {
            // GENERALI
            stopCommand_1,
            stopCommand_2,
            stopCommand_3,
            selectedInstance,
            timeAutoSave,
            // INSTANCE 1
            itemBuyCollector_1,
            priceBuyCollector_1,
            timeBuyCollector_1,
            itemSellCollector_1,
            priceSellCollector_1,
            timeSellCollector_1,
            toggleDM_1,
            UserId_1,
            buyProgramStatus_1,
            sellProgramStatus_1,
            // INSTANCE 2
            itemBuyCollector_2,
            priceBuyCollector_2,
            timeBuyCollector_2,
            itemSellCollector_2,
            priceSellCollector_2,
            timeSellCollector_2,
            toggleDM_2,
            UserId_2,
            buyProgramStatus_2,
            sellProgramStatus_2,
            // INSTANCE 3
            itemBuyCollector_3,
            priceBuyCollector_3,
            timeBuyCollector_3,
            itemSellCollector_3,
            priceSellCollector_3,
            timeSellCollector_3,
            toggleDM_3,
            UserId_3,
            buyProgramStatus_3,
            sellProgramStatus_3,
        };
          
        // Converti l'oggetto in una stringa JSON
        const dataToSave = JSON.stringify(variablesToSave, null, 2);
          
        // Scrivi la stringa JSON in un file
        fs.writeFileSync('variables.json', dataToSave, 'utf-8', (err) => {
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

async function manualSave() {
    // Salva tutte le variabili in un oggetto
    const variablesToSave = {
        // GENERALI
        stopCommand_1,
        stopCommand_2,
        stopCommand_3,
        selectedInstance,
        timeAutoSave,
        // INSTANCE 1
        itemBuyCollector_1,
        priceBuyCollector_1,
        timeBuyCollector_1,
        itemSellCollector_1,
        priceSellCollector_1,
        timeSellCollector_1,
        toggleDM_1,
        UserId_1,
        buyProgramStatus_1,
        sellProgramStatus_1,
        // INSTANCE 2
        itemBuyCollector_2,
        priceBuyCollector_2,
        timeBuyCollector_2,
        itemSellCollector_2,
        priceSellCollector_2,
        timeSellCollector_2,
        toggleDM_2,
        UserId_2,
        buyProgramStatus_2,
        sellProgramStatus_2,
        // INSTANCE 3
        itemBuyCollector_3,
        priceBuyCollector_3,
        timeBuyCollector_3,
        itemSellCollector_3,
        priceSellCollector_3,
        timeSellCollector_3,
        toggleDM_3,
        UserId_3,
        buyProgramStatus_3,
        sellProgramStatus_3,
    };
          
    // Converti l'oggetto in una stringa JSON
    const dataToSave = JSON.stringify(variablesToSave, null, 2);
          
    // Scrivi la stringa JSON in un file
    fs.writeFileSync('variables.json', dataToSave, 'utf-8', (err) => {
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