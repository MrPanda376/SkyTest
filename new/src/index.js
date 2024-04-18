const { Client, GatewayIntentBits, Interaction, ModalSubmitInteraction } = require("discord.js");
const { token } = require('../config.json');
const { saveDataToFile, searchNameInFile, findValue, sleep } = require('./functions/functions');
const { altFindValue, altSearchNameInFile } = require('./functions/altFunction');
const { autoSave, manualSave } = require('./functions/Save_Variables');
const fs = require('fs');
const { channel } = require("diagnostics_channel");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let global = {
    "instance": 1,
    "Total_Instances": 1,
    "timeAutoSave": 900000,
    "toggleDM": [false],
    "userID": ['718011250839257099'],
    "channel": '1228448453672046722',
    "buy": {
        "item": ['N/D'],
        "price": [1],
        "time": [10000],
        "stopCommand": [false],
        "status": ['inactive'],
        "channel": ['1228448453672046722'],
    },
    "sell": {
        "item": ['N/D'],
        "price": [1],
        "time": [10000],
        "stopCommand": [false],
        "status": ['inactive'],
        "channel": ['1228448453672046722'],
    },
};

client.once('ready', () => {
    console.log('Il bot è online!');

    // LETTURA VARIABILI

    // Verifica se il file variables.json esiste
    if (fs.existsSync('../variables.json')) {
        // Leggi i dati dal file
        fs.readFile('../variables.json', 'utf-8', (err, data) => {
            if (err) {
                console.error('Si è verificato un errore durante la lettura delle variabili:', err);
              } else {
                try {
                  global = JSON.parse(data);

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

        for (let i = 0; i < global.Total_Instances - 1; i++) {
            if (global.buy.status === 'active') {

            }
            if (global.sell.status === 'active') {

            }
        }
    }, 1000);
});

// SALVATAGGIO VARIABILI AUTOMATICO



// SALVATAGGIO VARIABILI MANUALE



// COMANDI

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    autoSave(global.timeAutoSave, global); // Inizio salvataggio automatico delle variabili

    const { commandName } = interaction;
    const options = interaction.options;
    const channel_CMD = await client.channels.fetch(global.channel);

    if (commandName === 'start-program-sell') {
        await interaction.reply(`Programma per vendere avviato nell\'instance: ${global.instance}`);

        global.stopCommand[global.instance - 1] = false;

        main_1_sell(interaction).catch((error) => {
            console.error('Si è verificato un errore durante l\'esecuzione:', error);
            global.sell.status = 'active';
        });

    } else if (commandName === 'start-program-buy') {
        await interaction.reply(`Programma per comprare avviato nell\'instance: ${global.instance}`);

        global.stopCommand[global.instance - 1] = false;
        
        altMain_1_buy(interaction).catch((error) => {
            console.error('Si è verificato un errore durante l\'esecuzione:', error);
            buyProgramStatus_1 = 'active';
        });

    } else if (commandName === 'set-program-sell') {
        global.sell.item = options.getString('item');
        global.sell.price = parseInt(options.getString('price'));
        global.sell.time = parseInt(options.getString('time'));
        await interaction.reply(`Nuovo item impostato: ${global.sell.item}`);
        channel_CMD.send(`Nuovo prezzo impostato: ${global.sell.price}`);
        channel_CMD.send(`Nuovo tempo impostato: ${global.sell.time}`);
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance}`);

    } else if (commandName === 'set-program-buy') {
        global.buy.item = options.getString('item');
        global.buy.price = parseInt(options.getString('price'));
        global.buy.time = parseInt(options.getString('time'));
        await interaction.reply(`Nuovo item impostato: ${global.buy.item}`);
        channel_CMD.send(`Nuovo prezzo impostato: ${global.buy.price}`);
        channel_CMD.send(`Nuovo tempo impostato: ${global.buy.time}`);
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance}`);

    } else if (commandName === 'help') {
        await interaction.reply('Se non sai come far partire il bot segui i seguenti step:');
        channel_CMD.send('1-Imposta il bot con le informazioni dell\'item da tracciare usando /set-program-sell o /set-program-buy');
        channel_CMD.send('2-Se non conosci gli ID degli item della skyblock vai su: https://api.hypixel.net/skyblock/bazaar per trovare l\'item corretto');
        channel_CMD.send('3-Imposta il prezzo e ogni quanto deve essere tracciato, ricordati che il tempo é in ms');
        channel_CMD.send('4-Utilizza i comandi /start-program-sell o /start-program-buy per far partire il bot');
        channel_CMD.send('5-Per fermare i programmi in esecuzione fai /stop-programs');
        channel_CMD.send('6-Utilizza /toggle-dm per abilitare o disabilitare i dm con true o false');
        channel_CMD.send('7-Per impostare il destinatario dei DM usa /set-dm ed inserisci l\'ID del destinatario');
        channel_CMD.send('8-Usa /info per sapere informazioni sulle impostazioni attuali del bot');
        channel_CMD.send('9-Usa /select, seguito dal numero dell\'instance per selezionare una instance');

    } else if (commandName === 'info') {
        await interaction.reply(`---------- INFORMAZIONI GENERALI ----------`);

        channel_CMD.send(`Instance selezionata: ${global.instance}`);

        channel_CMD.send(`La variabile stopCommand[0] é impostata su: ${stopCommand[0]}`);
        channel_CMD.send(`La variabile stopCommand_2 é impostata su: ${stopCommand_2}`);
        channel_CMD.send(`La variabile stopCommand_3 é impostata su: ${stopCommand_3}`);

        channel_CMD.send(`Il tempo della funzione autoSave é impostato su: ${global.timeAutoSave}`);

        await sleep(1000);

        channel_CMD.send(`---------- INFORMAZIONI INSTANCE #1 ----------`);

        channel_CMD.send(`L\'item del programma buy é impostato su: ${global.item[1]}`);
        channel_CMD.send(`Il prezzo del programma buy é impostato su: ${priceBuyCollector_1}`);
        channel_CMD.send(`Il tempo del programma buy é impostato su: ${timeBuyCollector_1} ms`);

        channel_CMD.send(`L\'item del programma sell é impostato su: ${itemSellCollector_1}`);
        channel_CMD.send(`Il prezzo del programma sell é impostato su: ${priceSellCollector_1}`);
        channel_CMD.send(`Il tempo del programma sell é impostato su: ${timeSellCollector_1} ms`);

        channel_CMD.send(`I messaggi DM sono impostati su: ${toggleDM_1}`);
        channel_CMD.send(`Il destinatario dei messaggi DM é impostato su: ${UserId_1}`);

        channel_CMD.send(`Lo stato del programma buy é impostato su: ${buyProgramStatus_1}`);
        channel_CMD.send(`Lo stato del programma sell é impostato su: ${sellProgramStatus_1}`);

        await sleep(1000);

        channel_CMD.send(`---------- INFORMAZIONI INSTANCE #2 ----------`);

        channel_CMD.send(`L\'item del programma buy é impostato su: ${itemBuyCollector_2}`);
        channel_CMD.send(`Il prezzo del programma buy é impostato su: ${priceBuyCollector_2}`);
        channel_CMD.send(`Il tempo del programma buy é impostato su: ${timeBuyCollector_2} ms`);

        channel_CMD.send(`L\'item del programma sell é impostato su: ${itemSellCollector_2}`);
        channel_CMD.send(`Il prezzo del programma sell é impostato su: ${priceSellCollector_2}`);
        channel_CMD.send(`Il tempo del programma sell é impostato su: ${timeSellCollector_2} ms`);

        channel_CMD.send(`I messaggi DM sono impostati su: ${toggleDM_2}`);
        channel_CMD.send(`Il destinatario dei messaggi DM é impostato su: ${UserId_2}`);

        channel_CMD.send(`Lo stato del programma buy é impostato su: ${buyProgramStatus_2}`);
        channel_CMD.send(`Lo stato del programma sell é impostato su: ${sellProgramStatus_2}`);

        await sleep(1000);

        channel_CMD.send(`---------- INFORMAZIONI INSTANCE #3 ----------`);

        channel_CMD.send(`L\'item del programma buy é impostato su: ${itemBuyCollector_3}`);
        channel_CMD.send(`Il prezzo del programma buy é impostato su: ${priceBuyCollector_3}`);
        channel_CMD.send(`Il tempo del programma buy é impostato su: ${timeBuyCollector_3} ms`);

        channel_CMD.send(`L\'item del programma sell é impostato su: ${itemSellCollector_3}`)
        channel_CMD.send(`Il prezzo del programma sell é impostato su: ${priceSellCollector_3}`);
        channel_CMD.send(`Il tempo del programma sell é impostato su: ${timeSellCollector_3} ms`);

        channel_CMD.send(`I messaggi DM sono impostati su: ${toggleDM_3}`);
        channel_CMD.send(`Il destinatario dei messaggi DM é impostato su: ${UserId_3}`);

        channel_CMD.send(`Lo stato del programma buy é impostato su: ${buyProgramStatus_3}`);
        channel_CMD.send(`Lo stato del programma sell é impostato su: ${sellProgramStatus_3}`);

    } else if (commandName === 'toggle-dm') {
        global.toggleDM = Boolean(options.getString('boolean-value'));
        await interaction.reply(`I messaggi DM sono impostati su: ${global.toggleDM}`);
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance}`);

    } else if (commandName === 'set-dm') {
        global.userID = options.getString('id');
        await interaction.reply(`I messaggi DM verranno inviati a: ${global.userID}`);
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance}`);

    } else if (commandName === 'select') {
        global.instance = parseInt(options.getString('instance'));
        await interaction.reply(`Hai selezionato l\'instance numero: ${global.instance}`);

    } else if (commandName === 'save-now') {
        manualSave(global);
        await interaction.reply(`Le impostazioni sono state salvate correttamente!`);

    } else if (commandName === 'auto-save') {
        global.timeAutoSave = parseInt(options.getString('time'));
        await interaction.reply(`Le impostazioni verranno salvate ogni ${global.timeAutoSave} ms!`);

    } else if (commandName === 'stop-programs') {
        await interaction.reply(`Tutti i programmi dell\'instance numero: ${global.instance} sono stati fermati!`);
        
        global.stopCommand[global.instance] = true;
    };
});

client.login(token);

// INSTANCE #1

// SELL

async function main_1_sell() {
    while (!global.stopCommand[0]) {
        sellProgramStatus_1 = 'active';

        const outputFilePath = '../output.txt';
        await saveDataToFile(outputFilePath);

        const filePath = '../output.txt';
        const nameToSearch = global.sell.item[0]; // Oggetto da cercare

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
    while (!global.stopCommand[0]) {
        buyProgramStatus_1 = 'active';

        const outputFilePath = '../output.txt';
        await saveDataToFile(outputFilePath);

        const filePath = 'output.txt';
        const nameToSearch = global.item[1]; // Oggetto da cercare

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