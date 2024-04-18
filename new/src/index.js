const { Client, GatewayIntentBits, Interaction, ModalSubmitInteraction } = require("discord.js");
const { token } = require('../config.json');
const { saveDataToFile, searchNameInFile, findValue, sleep } = require('./functions/functions');
const { altFindValue, altSearchNameInFile } = require('./functions/altFunction')
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Dichiarazione variabili
// GENERALI
let stopCommand_1 = false;
let stopCommand_2 = false;
let stopCommand_3 = false;
let selectedInstance = '1';
let timeAutoSave = 900000;
// INSTANCE 1
let itemBuyCollector_1 = 'N/D';
let priceBuyCollector_1 = 1;
let timeBuyCollector_1 = 10000;
let itemSellCollector_1 = 'N/D';
let priceSellCollector_1 = 1;
let timeSellCollector_1 = 10000;
let toggleDM_1 = 'false';
let UserId_1 = '718011250839257099';
let buyProgramStatus_1 = 'inactive';
let sellProgramStatus_1 = 'inactive';
// INSTANCE 2
let itemBuyCollector_2 = 'N/D';
let priceBuyCollector_2 = 1;
let timeBuyCollector_2 = 10000;
let itemSellCollector_2 = 'N/D';
let priceSellCollector_2 = 1;
let timeSellCollector_2 = 10000;
let toggleDM_2 = 'false';
let UserId_2 = '718011250839257099';
let buyProgramStatus_2 = 'inactive';
let sellProgramStatus_2 = 'inactive';
// INSTANCE 3
let itemBuyCollector_3 = 'N/D';
let priceBuyCollector_3 = 1;
let timeBuyCollector_3 = 10000;
let itemSellCollector_3 = 'N/D';
let priceSellCollector_3 = 1;
let timeSellCollector_3 = 10000;
let toggleDM_3 = 'false';
let UserId_3 = '718011250839257099';
let buyProgramStatus_3 = 'inactive';
let sellProgramStatus_3 = 'inactive';

client.once('ready', () => {
    console.log('Il bot è online!');

    // LETTURA VARIABILI

    // Verifica se il file variables.json esiste
    if (fs.existsSync('variables.json')) {
        // Leggi i dati dal file
        fs.readFile('variables.json', 'utf-8', (err, data) => {
            if (err) {
                console.error('Si è verificato un errore durante la lettura delle variabili:', err);
              } else {
                try {
                  const savedVariables = JSON.parse(data);

                  // Assegna i valori alle variabili
                  // GENERALI
                  stopCommand_1 = savedVariables.stopCommand_1;
                  stopCommand_2 = savedVariables.stopCommand_2;
                  stopCommand_3 = savedVariables.stopCommand_3;
                  selectedInstance = savedVariables.selectedInstance;
                  timeAutoSave = savedVariables.timeAutoSave;
                  // INSTANCE 1
                  itemBuyCollector_1 = savedVariables.itemBuyCollector_1;
                  priceBuyCollector_1 = savedVariables.priceBuyCollector_1;
                  timeBuyCollector_1 = savedVariables.timeBuyCollector_1;
                  itemSellCollector_1 = savedVariables.itemSellCollector_1;
                  priceSellCollector_1 = savedVariables.priceSellCollector_1;
                  timeSellCollector_1 = savedVariables.timeSellCollector_1;
                  toggleDM_1 = savedVariables.toggleDM_1;
                  UserId_1 = savedVariables.UserId_1;
                  buyProgramStatus_1 = savedVariables.buyProgramStatus_1;
                  sellProgramStatus_1 = savedVariables.sellProgramStatus_1;
                  // INSTANCE 2
                  itemBuyCollector_2 = savedVariables.itemBuyCollector_2;
                  priceBuyCollector_2 = savedVariables.priceBuyCollector_2;
                  timeBuyCollector_2 = savedVariables.timeBuyCollector_2;
                  itemSellCollector_2 = savedVariables.itemSellCollector_2;
                  priceSellCollector_2 = savedVariables.priceSellCollector_2;
                  timeSellCollector_2 = savedVariables.timeSellCollector_2;
                  toggleDM_2 = savedVariables.toggleDM_2;
                  UserId_2 = savedVariables.UserId_2;
                  buyProgramStatus_2 = savedVariables.buyProgramStatus_2;
                  sellProgramStatus_2 = savedVariables.sellProgramStatus_2;
                  // INSTANCE 3
                  itemBuyCollector_3 = savedVariables.itemBuyCollector_3;
                  priceBuyCollector_3 = savedVariables.priceBuyCollector_3;
                  timeBuyCollector_3 = savedVariables.timeBuyCollector_3;
                  itemSellCollector_3 = savedVariables.itemSellCollector_3;
                  priceSellCollector_3 = savedVariables.priceSellCollector_3;
                  timeSellCollector_3 = savedVariables.timeSellCollector_3;
                  toggleDM_3 = savedVariables.toggleDM_3;
                  UserId_3 = savedVariables.UserId_3;
                  buyProgramStatus_3 = savedVariables.buyProgramStatus_3;
                  sellProgramStatus_3 = savedVariables.sellProgramStatus_3;
        
                  console.log('Variabili recuperate con successo.');
                } catch (error) {
                  console.error('Si è verificato un errore durante il parsing dei dati JSON:', error);
                }
            }
        });
    } else {
      console.log('Il file variables.json non esiste. Le variabili non sono state recuperate.');
    };
    
    // ASPETTA 1 SECONDO PER FAR RECUPERARE LE VARIABILI
    setTimeout(() => {
        // RESUME DEI PROGRAMMI ATTIVI PRIMA DEL CRASH / SPEGNIMENTO

        if (buyProgramStatus_1 === 'active') {
            stopCommand_1 = false;
            altMain_1_buy();
        } if (sellProgramStatus_1 === 'active') {
            stopCommand_1 = false;
            main_1_sell();
        } if (buyProgramStatus_2 === 'active') {
            stopCommand_2 = false;
            altMain_2_buy();
        } if (sellProgramStatus_2 === 'active') {
            stopCommand_2 = false;
            main_2_sell();
        } if (buyProgramStatus_3 === 'active') {
            stopCommand_3 = false;
            altMain_3_buy();
        } if (sellProgramStatus_3 === 'active') {
            stopCommand_3 = false;
            main_3_sell();
        }
    }, 1000);
});

// SALVATAGGIO VARIABILI AUTOMATICO



// SALVATAGGIO VARIABILI MANUALE



// COMANDI

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    autoSave() // Inizio salvataggio automatico delle variabili

    const { commandName } = interaction;
    const options = interaction.options;
    const channel_CMD = await client.channels.fetch('1228448453672046722');

    if (commandName === 'start-program-sell') {
        await interaction.reply(`Programma per vendere avviato nell\'instance: ${selectedInstance}`);

        if (selectedInstance === '1') {
            stopCommand_1 = false;
            main_1_sell(interaction).catch((error) => {
                console.error('Si è verificato un errore durante l\'esecuzione:', error);
                sellProgramStatus_1 = 'active';
            });
        } else if (selectedInstance === '2') {
            stopCommand_2 = false;
            main_2_sell(interaction).catch((error) => {
                console.error('Si è verificato un errore durante l\'esecuzione:', error);
                sellProgramStatus_2 = 'active';
            });
        } else if (selectedInstance === '3') {
            stopCommand_3 = false;
            main_3_sell(interaction).catch((error) => {
                console.error('Si è verificato un errore durante l\'esecuzione:', error);
                sellProgramStatus_3 = 'active';
            });
        }

    } else if (commandName === 'start-program-buy') {
        await interaction.reply(`Programma per comprare avviato nell\'instance: ${selectedInstance}`);

        if (selectedInstance === '1') {
            stopCommand_1 = false;
            altMain_1_buy(interaction).catch((error) => {
                console.error('Si è verificato un errore durante l\'esecuzione:', error);
                buyProgramStatus_1 = 'active';
            });
        } else if (selectedInstance === '2') {
            stopCommand_2 = false;
            altMain_2_buy(interaction).catch((error) => {
                console.error('Si è verificato un errore durante l\'esecuzione:', error);
                buyProgramStatus_2 = 'active';
            });
        } else if (selectedInstance === '3') {
            stopCommand_3 = false;
            altMain_3_buy(interaction).catch((error) => {
                console.error('Si è verificato un errore durante l\'esecuzione:', error);
                buyProgramStatus_3 = 'active';
            });
        }
        
    } else if (commandName === 'set-program-sell') {
        itemSell = options.getString('item');
        priceSell = options.getString('price');
        timeSell = options.getString('time');
        await interaction.reply(`Nuovo item impostato: ${itemSell}`);
        channel_CMD.send(`Nuovo prezzo impostato: ${priceSell}`);
        channel_CMD.send(`Nuovo tempo impostato: ${timeSell}`);
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${selectedInstance}`)

        if (selectedInstance === '1') {
            itemSellCollector_1 = itemSell
            priceSellCollector_1 = priceSell
            timeSellCollector_1 = timeSell
        } else if (selectedInstance === '2') {
            itemSellCollector_2 = itemSell
            priceSellCollector_2 = priceSell
            timeSellCollector_2 = timeSell
        } else if (selectedInstance === '3') {
            itemSellCollector_3 = itemSell
            priceSellCollector_3 = priceSell
            timeSellCollector_3 = timeSell
        }

    } else if (commandName === 'set-program-buy') {
        itemBuy = options.getString('item');
        priceBuy = options.getString('price');
        timeBuy = options.getString('time');
        await interaction.reply(`Nuovo item impostato: ${itemBuy}`);
        channel_CMD.send(`Nuovo prezzo impostato: ${priceBuy}`);
        channel_CMD.send(`Nuovo tempo impostato: ${timeBuy}`);
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${selectedInstance}`)

        if (selectedInstance === '1') {
            itemBuyCollector_1 = itemBuy
            priceBuyCollector_1 = priceBuy
            timeBuyCollector_1 = timeBuy
        } else if (selectedInstance === '2') {
            itemBuyCollector_2 = itemBuy
            priceBuyCollector_2 = priceBuy
            timeBuyCollector_2 = timeBuy
        } else if (selectedInstance === '3') {
            itemBuyCollector_3 = itemBuy
            priceBuyCollector_3 = priceBuy
            timeBuyCollector_3 = timeBuy
        }

    } else if (commandName === 'help') {
        await interaction.reply('Se non sai come far partire il bot segui i seguenti step:');
        channel_CMD.send('1-Imposta il bot con le informazioni dell\'item da tracciare usando /set-program-sell o /set-program-buy');
        channel_CMD.send('2-Se non conosci gli ID degli item della skyblock vai su: https://api.hypixel.net/skyblock/bazaar per trovare l\'item corretto');
        channel_CMD.send('3-Imposta il prezzo e ogni quanto deve essere tracciato, ricordati che il tempo é in ms');
        channel_CMD.send('4-Utilizza i comandi /start-program-sell o /start-program-buy per far partire il bot');
        channel_CMD.send('5-Per fermare i programmi in esecuzione fai /stop-programs');
        channel_CMD.send('6-Utilizza /toggle-dm per abilitare o disabilitare i dm con true o false')
        channel_CMD.send('7-Per impostare il destinatario dei DM usa /set-dm ed inserisci l\'ID del destinatario')
        channel_CMD.send('8-Usa /info per sapere informazioni sulle impostazioni attuali del bot')
        channel_CMD.send('9-Usa /select, seguito dal numero dell\'instance per selezionare una instance')

    } else if (commandName === 'info') {
        await interaction.reply(`---------- INFORMAZIONI GENERALI ----------`)

        channel_CMD.send(`Instance selezionata: ${selectedInstance}`)

        channel_CMD.send(`La variabile stopCommand_1 é impostata su: ${stopCommand_1}`)
        channel_CMD.send(`La variabile stopCommand_2 é impostata su: ${stopCommand_2}`)
        channel_CMD.send(`La variabile stopCommand_3 é impostata su: ${stopCommand_3}`)

        channel_CMD.send(`Il tempo della funzione autoSave é impostato su: ${timeAutoSave}`)

        await sleep(1000)

        channel_CMD.send(`---------- INFORMAZIONI INSTANCE #1 ----------`)

        channel_CMD.send(`L\'item del programma buy é impostato su: ${itemBuyCollector_1}`)
        channel_CMD.send(`Il prezzo del programma buy é impostato su: ${priceBuyCollector_1}`)
        channel_CMD.send(`Il tempo del programma buy é impostato su: ${timeBuyCollector_1} ms`)

        channel_CMD.send(`L\'item del programma sell é impostato su: ${itemSellCollector_1}`)
        channel_CMD.send(`Il prezzo del programma sell é impostato su: ${priceSellCollector_1}`)
        channel_CMD.send(`Il tempo del programma sell é impostato su: ${timeSellCollector_1} ms`)

        channel_CMD.send(`I messaggi DM sono impostati su: ${toggleDM_1}`)
        channel_CMD.send(`Il destinatario dei messaggi DM é impostato su: ${UserId_1}`)

        channel_CMD.send(`Lo stato del programma buy é impostato su: ${buyProgramStatus_1}`)
        channel_CMD.send(`Lo stato del programma sell é impostato su: ${sellProgramStatus_1}`)

        await sleep(1000)

        channel_CMD.send(`---------- INFORMAZIONI INSTANCE #2 ----------`)

        channel_CMD.send(`L\'item del programma buy é impostato su: ${itemBuyCollector_2}`)
        channel_CMD.send(`Il prezzo del programma buy é impostato su: ${priceBuyCollector_2}`)
        channel_CMD.send(`Il tempo del programma buy é impostato su: ${timeBuyCollector_2} ms`)

        channel_CMD.send(`L\'item del programma sell é impostato su: ${itemSellCollector_2}`)
        channel_CMD.send(`Il prezzo del programma sell é impostato su: ${priceSellCollector_2}`)
        channel_CMD.send(`Il tempo del programma sell é impostato su: ${timeSellCollector_2} ms`)

        channel_CMD.send(`I messaggi DM sono impostati su: ${toggleDM_2}`)
        channel_CMD.send(`Il destinatario dei messaggi DM é impostato su: ${UserId_2}`)

        channel_CMD.send(`Lo stato del programma buy é impostato su: ${buyProgramStatus_2}`)
        channel_CMD.send(`Lo stato del programma sell é impostato su: ${sellProgramStatus_2}`)

        await sleep(1000)

        channel_CMD.send(`---------- INFORMAZIONI INSTANCE #3 ----------`)

        channel_CMD.send(`L\'item del programma buy é impostato su: ${itemBuyCollector_3}`)
        channel_CMD.send(`Il prezzo del programma buy é impostato su: ${priceBuyCollector_3}`)
        channel_CMD.send(`Il tempo del programma buy é impostato su: ${timeBuyCollector_3} ms`)

        channel_CMD.send(`L\'item del programma sell é impostato su: ${itemSellCollector_3}`)
        channel_CMD.send(`Il prezzo del programma sell é impostato su: ${priceSellCollector_3}`)
        channel_CMD.send(`Il tempo del programma sell é impostato su: ${timeSellCollector_3} ms`)

        channel_CMD.send(`I messaggi DM sono impostati su: ${toggleDM_3}`)
        channel_CMD.send(`Il destinatario dei messaggi DM é impostato su: ${UserId_3}`)

        channel_CMD.send(`Lo stato del programma buy é impostato su: ${buyProgramStatus_3}`)
        channel_CMD.send(`Lo stato del programma sell é impostato su: ${sellProgramStatus_3}`)

    } else if (commandName === 'toggle-dm') {
        getToggleDM = options.getString('boolean-value')
        await interaction.reply(`I messaggi DM sono impostati su: ${getToggleDM}`)
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${selectedInstance}`)

        if (selectedInstance === '1') {
            toggleDM_1 = getToggleDM
        } else if (selectedInstance === '2') {
            toggleDM_2 = getToggleDM
        } else if (selectedInstance === '3') {
            toggleDM_3 = getToggleDM
        }

    } else if (commandName === 'set-dm') {
        getUserId = options.getString('id')
        await interaction.reply(`I messaggi DM verranno inviati a: ${getUserId}`)
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${selectedInstance}`)

        if (selectedInstance === '1') {
            UserId_1 = getUserId
        } else if (selectedInstance === '2') {
            UserId_2 = getUserId
        } else if (selectedInstance === '3') {
            UserId_3 = getUserId
        }

    } else if (commandName === 'select') {
        selectedInstance = options.getString('instance')
        await interaction.reply(`Hai selezionato l\'instance numero: ${selectedInstance}`)

    } else if (commandName === 'save-now') {
        manualSave()
        await interaction.reply(`Le impostazioni sono state salvate correttamente!`)

    } else if (commandName === 'auto-save') {
        timeSaveVariables = options.getString('time')
        timeAutoSave = timeSaveVariables
        await interaction.reply(`Le impostazioni verranno salvate ogni ${timeAutoSave} ms!`)

    } else if (commandName === 'stop-programs') {
        await interaction.reply(`Tutti i programmi dell\'instance numero: ${selectedInstance} sono stati fermati!`);
        
        if (selectedInstance === '1') {
            stopCommand_1 = true;
            buyProgramStatus_1 = 'inactive';
            sellProgramStatus_1 = 'inactive';
        } else if (selectedInstance === '2') {
            stopCommand_2 = true;
            buyProgramStatus_2 = 'inactive';
            sellProgramStatus_2 = 'inactive';
        } else if (selectedInstance === '3') {
            stopCommand_3 = true;
            buyProgramStatus_3 = 'inactive';
            sellProgramStatus_3 = 'inactive';
        }
    };
});

client.login(token);

// INSTANCE #1

// SELL

async function main_1_sell() {
    while (!stopCommand_1) {
        sellProgramStatus_1 = 'active';

        const outputFilePath = 'output.txt';
        await saveDataToFile(outputFilePath);

        const filePath = 'output.txt';
        const nameToSearch = itemSellCollector_1; // Oggetto da cercare

        const context = await searchNameInFile(filePath, nameToSearch);

        const valueToFind = 'pricePerUnit'; // Valore che viene cercato in function.js da cambiare solo se si cambia cosa si vuole cercare
        const value = parseInt(findValue([context], valueToFind), 10);

        const formattedValue = value.toLocaleString();

        // Invia il messaggio formattato su Discord
        const channel = client.channels.cache.get('1228448453672046722'); // Sostituisci 'ID_DEL_CANALE' con l'ID del canale di destinazione

        let User = await client.users.fetch(UserId_1);
        
        const maxValue = priceSellCollector_1; // Valore da superare per fare in modo che il bot pinga tutti
        const formattedMaxValue = maxValue.toLocaleString(); // Valore maxValue formattato con i punti

        if (value > maxValue) {
            channel.send(`${nameToSearch} - VENDI TUTTO ORA!!! @everyone - SellPrice: ${formattedValue} - Set to: ${formattedMaxValue}`); // Output se prezzo conveniente
            if (toggleDM_1 === 'true') {
                User.send(`${nameToSearch} - VENDI TUTTO ORA!!! @everyone - SellPrice: ${formattedValue} - Set to: ${formattedMaxValue}`) // Messaggio nei DM
                  .catch(error => {
                    console.error('Errore durante l\'invio del messaggio nei DM:', error); // Errore durante l'invio del messaggio nei DM
            })}
        } else {
            channel.send(`${nameToSearch} - Non vendere - SellPrice: ${formattedValue} - Set to: ${formattedMaxValue}`); // Output se prezzo NON conveniente
        }

        await sleep(timeSellCollector_1); // Ritardo tra le esecuzioni
    };
};

// BUY

async function altMain_1_buy() {
    while (!stopCommand_1) {
        buyProgramStatus_1 = 'active';

        const outputFilePath = 'output.txt';
        await saveDataToFile(outputFilePath);

        const filePath = 'output.txt';
        const nameToSearch = itemBuyCollector_1; // Oggetto da cercare

        const context = await altSearchNameInFile(filePath, nameToSearch);

        const valueToFind = 'pricePerUnit'; // Valore che viene cercato in altFunction.js da cambiare solo se si cambia cosa si vuole cercare
        const value = parseInt(altFindValue([context], valueToFind), 10);

        const formattedValue = value.toLocaleString();

        // Invia il messaggio formattato su Discord
        const channel = client.channels.cache.get('1228448453672046722'); // Sostituisci 'ID_DEL_CANALE' con l'ID del canale di destinazione

        let User = await client.users.fetch(UserId_1);
        
        const maxValue = priceBuyCollector_1; // Valore da superare per fare in mode che il bot pinga tutti
        const formattedMaxValue = maxValue.toLocaleString(); // Valore maxValue formattato con i punti

        if (value < maxValue) {
            channel.send(`${nameToSearch} - COMPRA ORA!!! @everyone - SellPrice: ${formattedValue} - Set to: ${formattedMaxValue}`); // Output se prezzo conveniente
            if (toggleDM_1 === 'true') {
                User.send(`${nameToSearch} - COMPRA ORA!!! @everyone - SellPrice: ${formattedValue} - Set to: ${formattedMaxValue}`) // Messaggio nei DM
                  .catch(error => {
                    console.error('Errore durante l\'invio del messaggio nei DM:', error); // Errore durante l'invio del messaggio nei DM
            })}
        } else {
            channel.send(`${nameToSearch} - Non comprare - SellPrice: ${formattedValue} - Set to: ${formattedMaxValue}`); // Output se prezzo NON conveniente
        }

        await sleep(timeBuyCollector_1); // Ritardo tra le esecuzioni
    };
};