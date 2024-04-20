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
    "trackerType": 'buy',
    "stopCommand": 0,
    "timeAutoSave": 10000,
    "channel": '1228448453672046722',
    "buy": {
        "item": ['N/D'],
        "price": [1],
        "time": [10000],
        "status": ['off'],
        "toggleDM": [false],
        "userID": ['718011250839257099'],
        "channel": ['1228448453672046722'],
        "ID": [1],
    },
    "sell": {
        "item": ['N/D'],
        "price": [1],
        "time": [10000],
        "status": ['off'],
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
    for (let i = 0; i < global.Total_Instances; i++) {
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
        case 'start_tracker':
            await interaction.reply(`Il tracker in modalitá: ${global.trackerType} é stato avviato nell\'instance: ${global.instance + 1}`);

            if (global.trackerType === 'buy') {
                global.buy.status[global.instance] = 'on';
            } else {
                global.sell.status[global.instance] = 'on';
            }

            try {
                Bazaar_Tracker(global);
            } catch (error) {
                console.error('Si è verificato un errore durante l\'esecuzione:', error);
            }
            break;
        case 'set_tracker':
            if (global.trackerType === 'buy') {
                global.buy.item = options.getString('item');
                global.buy.price = parseInt(options.getString('price'));
                global.buy.time = parseInt(options.getString('time'));

                await interaction.reply(`Nuovo item impostato: ${global.buy.item}`);
                channel_CMD.send(`Nuovo prezzo impostato: ${global.buy.price}`);
                channel_CMD.send(`Nuovo tempo impostato: ${global.buy.time}`);
            } else {
                global.sell.item = options.getString('item');
                global.sell.price = parseInt(options.getString('price'));
                global.sell.time = parseInt(options.getString('time'));

                await interaction.reply(`Nuovo item impostato: ${global.sell.item}`);
                channel_CMD.send(`Nuovo prezzo impostato: ${global.sell.price}`);
                channel_CMD.send(`Nuovo tempo impostato: ${global.sell.time}`);
            }
            channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance + 1} tipo: ${global.trackerType}`);
            break;
        case 'help':
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
            break;
        case 'info':
            break;
        case 'toggle_dm':
            if (options.getString('boolean-value') === 'true' || options.getString('boolean-value') === 'false') {
                if (global.trackerType === 'buy') {
                    global.buy.toggleDM[global.instance] = Boolean(options.getString('boolean-value'));

                    await interaction.reply(`I messaggi DM sono impostati su: ${global.buy.toggleDM}`);
                } else {
                    global.sell.toggleDM[global.instance] = Boolean(options.getString('boolean-value'));

                    await interaction.reply(`I messaggi DM sono impostati su: ${global.sell.toggleDM}`);
                }
                channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance + 1}`);
            } else {
                await interaction.reply('Il parametro inserito non é valido');
            }
            break;
        case 'set_dm':
            if (global.trackerType === 'buy') {
                global.buy.userID = options.getString('id');

                await interaction.reply(`I messaggi DM verranno inviati a: ${global.buy.userID}`);
            } else {
                global.sell.userID = options.getString('id');

                await interaction.reply(`I messaggi DM verranno inviati a: ${global.sell.userID}`);
            }
            channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance}`);
            break;
        case 'select':
            global.instance = parseInt(options.getString('instance')) - 1;

            await interaction.reply(`Hai selezionato l\'instance numero: ${global.instance + 1}`);
            break;
        case 'save_now':
            try {
                manualSave(global);

                await interaction.reply(`Le impostazioni sono state salvate correttamente!`);
            } catch (error) {
                console.error('Si è verificato un errore durante l\'esecuzione:', error);
            }
            break;
        case 'auto_save':
            global.timeAutoSave = parseInt(options.getString('time'));

            await interaction.reply(`Le impostazioni verranno salvate ogni ${global.timeAutoSave} ms!`);
            break;
        case 'stop_tracker':
            if (trackerType === 'buy') {
                global.stopCommand = global.buy.ID[global.instance];
                
                global.buy.status[global.instance] = 'off';
            } else {
                global.stopCommand = global.sell.ID[global.instance];
                
                global.sell.status[global.instance] = 'off';
            }

            await interaction.reply(`Il tracker nell\'instance: ${global.instance + 1} di tipo: ${global.trackerType} é stato fermato!`);
            break;
    }
});

client.login(token);

// INSTANCE #1

// SELL

async function Bazaar_Tracker(global) {
    let local = {};
    if (global.trackerType === 'buy') {
        local = {
            "instance": global.instance, // The instance of the program
            "trackerType": global.trackerType, // The type of the tracker (buy/sell)
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
            "trackerType": global.trackerType,
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

        if (local.trackerType === 'buy') {
            if (price < setPrice) {
                channel.send(`${local.item} - COMPRA ORA!!! @everyone - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`); // Output se prezzo conveniente
                if (local.toggleDM === 'true') {
                    user.send(`${local.item} - COMPRA ORA!!! @everyone - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`) // Messaggio nei DM
                        .catch(error => {
                            console.error('Errore durante l\'invio del messaggio nei DM:', error); // Errore durante l'invio del messaggio nei DM
                        }
                    )
                }
            } else {
                channel.send(`${local.item} - Non comprare - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`); // Output se prezzo NON conveniente
            }
        } else {
            if (price > setPrice) {
                channel.send(`${local.item} - VENDI TUTTO ORA!!! @everyone - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`); // Output se prezzo conveniente
                if (local.toggleDM === 'true') {
                    user.send(`${local.item} - VENDI TUTTO ORA!!! @everyone - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`) // Messaggio nei DM
                        .catch(error => {
                            console.error('Errore durante l\'invio del messaggio nei DM:', error); // Errore durante l'invio del messaggio nei DM
                        }
                    )
                }
            } else {
                channel.send(`${local.item} - Non vendere - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`); // Output se prezzo NON conveniente
            }
        }

        await sleep(local.time); // Ritardo tra le esecuzioni
    };
};