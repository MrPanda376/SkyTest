const { Client, GatewayIntentBits, Interaction, ModalSubmitInteraction } = require("discord.js");
const { token } = require('../config.json');
const { saveDataToFile, searchNameInFile, findValue, sleep } = require('./functions/functions');
const { altFindValue, altSearchNameInFile } = require('./functions/altFunction');
const { autoSave, manualSave } = require('./functions/Save_Variables');
const fs = require('fs');
const { channel } = require("diagnostics_channel");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let global = {
    "instance": 0, // Ricordarsi che é sempre instance - 1 pk stiamo lavorando con gli array
    "Total_Instances": 1,
    "stopCommand": 0,
    "timeAutoSave": 900000,
    "channel": '1228448453672046722',
    "buy": {
        "item": ['N/D'],
        "price": [1],
        "time": [10000],
        "status": [0],
        "toggleDM": [false],
        "userID": ['718011250839257099'],
        "channel": ['1228448453672046722'],
        "ID": [1],
    },
    "sell": {
        "item": ['N/D'],
        "price": [1],
        "time": [10000],
        "status": [0],
        "toggleDM": [false],
        "userID": ['718011250839257099'],
        "channel": ['1228448453672046722'],
        "ID": [1],
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
    }
    // Resume of the programs that were active before the bot crashed/stopped
    for (let i = 0; i <= global.Total_Instances; i++) {
        if (global.buy.status) {

        }
        if (global.sell.status) {

        }
    }
});

// COMANDI

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    autoSave(global.timeAutoSave, global); // Inizio salvataggio automatico delle variabili

    const { commandName } = interaction;
    const options = interaction.options;
    const channel_CMD = await client.channels.fetch(global.channel);

    switch (commandName) {
        case 'start-program-sell':
            
    }
    if (commandName === 'start-program-sell') {
        await interaction.reply(`Programma per vendere avviato nell\'instance: ${global.instance + 1}`);

        Bazaar_Tracker(global, 'sell');

    } else if (commandName === 'start-program-buy') {
        await interaction.reply(`Programma per comprare avviato nell\'instance: ${global.instance + 1}`);

        Bazaar_Tracker(global, 'buy');

    } else if (commandName === 'set-program-sell') {
        global.sell.item = options.getString('item');
        global.sell.price = parseInt(options.getString('price'));
        global.sell.time = parseInt(options.getString('time'));
        await interaction.reply(`Nuovo item impostato: ${global.sell.item}`);
        channel_CMD.send(`Nuovo prezzo impostato: ${global.sell.price}`);
        channel_CMD.send(`Nuovo tempo impostato: ${global.sell.time}`);
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance + 1}`);

    } else if (commandName === 'set-program-buy') {
        global.buy.item = options.getString('item');
        global.buy.price = parseInt(options.getString('price'));
        global.buy.time = parseInt(options.getString('time'));
        await interaction.reply(`Nuovo item impostato: ${global.buy.item}`);
        channel_CMD.send(`Nuovo prezzo impostato: ${global.buy.price}`);
        channel_CMD.send(`Nuovo tempo impostato: ${global.buy.time}`);
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance + 1}`);

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
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance + 1}`);

    } else if (commandName === 'set-dm') {
        global.userID = options.getString('id');
        await interaction.reply(`I messaggi DM verranno inviati a: ${global.userID}`);
        channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance}`);

    } else if (commandName === 'select') {
        global.instance = parseInt(options.getString('instance')) - 1;
        await interaction.reply(`Hai selezionato l\'instance numero: ${global.instance + 1}`);

    } else if (commandName === 'save-now') {
        manualSave(global);
        await interaction.reply(`Le impostazioni sono state salvate correttamente!`);

    } else if (commandName === 'auto-save') {
        global.timeAutoSave = parseInt(options.getString('time'));
        await interaction.reply(`Le impostazioni verranno salvate ogni ${global.timeAutoSave} ms!`);

    } else if (commandName === 'stop-programs') {
        await interaction.reply(`Tutti i programmi dell\'instance numero: ${global.instance + 1} sono stati fermati!`);

        if (trackerType === 'buy') {
            global.stopCommand = global.buy.ID[global.instance];
        } else {
            global.stopCommand = global.sell.ID[global.instance];
        }
    };
});

client.login(token);

// INSTANCE #1

// SELL

async function Bazaar_Tracker(global, trackerType) {
    let local = {};
    if (trackerType === 'buy') {
        local = {
            "instance": global.instance, // The instance of the program
            "filePath": '../output.txt', // The file path of the API's response
            "valueToFind": 'pricePerUnit', // Value searched in the output file to find the price of the item
            "item": global.buy.item[global.instance], // Item tracked
            "price": global.buy.price[global.instance], // Price to reach
            "time": global.buy.time[global.instance], // How often does this function repeat
            "toggleDM": global.buy.toggleDM[global.instance], // Enables DMs
            "userID": global.buy.userID[global.instance], // The person receiving the DMs
            "channel": global.buy.channel[global.instance], // Channel where the bot writes the price history of the item
            "ID": global.buy.ID[global.instance], // The ID of this process
        };
    } else {
        local = {
            "instance": global.instance,
            "filePath": '../output.txt',
            "valueToFind": 'pricePerUnit',
            "item": global.sell.item[global.instance],
            "price": global.sell.price[global.instance],
            "time": global.sell.time[global.instance],
            "toggleDM": global.sell.toggleDM[global.instance],
            "userID": global.sell.userID[global.instance],
            "channel": global.sell.channel[global.instance],
            "ID": global.sell.ID[global.instance],
        };
    }
    while (global.stopCommand != local.ID) {

        await saveDataToFile(local.filePath);
        const context = await searchNameInFile(local.filePath, local.item);
        
        const channel = client.channels.cache.get(local.channel);

        const user = await client.users.fetch(local.userID);

        const price = parseInt(findValue([context], local.valueToFind), 10);
        const setPrice = local.price;

        const formattedPrice = price.toLocaleString();
        const formattedSetPrice = setPrice.toLocaleString();

        if (price > setPrice) {
            channel.send(`${local.item} - VENDI TUTTO ORA!!! @everyone - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`); // Output se prezzo conveniente
            if (local.toggleDM === 'true') {
                user.send(`${local.item} - VENDI TUTTO ORA!!! @everyone - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`) // Messaggio nei DM
                    .catch(error => {
                        console.error('Errore durante l\'invio del messaggio nei DM:', error); // Errore durante l'invio del messaggio nei DM
                    })
            }
        } else {
            channel.send(`${local.item} - Non vendere - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`); // Output se prezzo NON conveniente
        }

        await sleep(local.time); // Ritardo tra le esecuzioni
    };
};