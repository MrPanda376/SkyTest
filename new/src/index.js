const { Client, GatewayIntentBits, Interaction, ModalSubmitInteraction } = require("discord.js");
const fs = require('fs');
const { token } = require('../data/config.json');
const { Bazaar_Tracker } = require('./functions/botFeatures');
const { autoSave, manualSave } = require('./functions/saveVariables');
const { randomID, cooldown } = require('./functions/utilities');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let global = {
    "instance": 0, // Ricordarsi che é sempre instance - 1 pk stiamo lavorando con gli array
    "Total_Instances": 1,
    "trackerType": 'buy',
    "stopCommand": 0,
    "timeCheckStop": 10000,
    "onCooldown": false,
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
        "ID": [2],
    },
};

client.once('ready', () => {
    console.log('Il bot è online!');

    // LETTURA VARIABILI

    // Verifica se il file variables.json esiste
    if (fs.existsSync('../data/variables.json')) {
        // Leggi i dati dal file
        fs.readFile('../data/variables.json', 'utf-8', (err, data) => {
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
    setTimeout(() => {
        let temp = global;
        for (let i = 0; i < global.Total_Instances; i++) {
            if (global.buy.status[i] === 'on') {
                temp.instance = i;
                temp.trackerType = 'buy';
                try {
                    Bazaar_Tracker(temp, client);
                } catch (error) {
                    console.error('Si è verificato un errore durante l\'esecuzione:', error);
                }
            }
            if (global.sell.status[i] === 'on') {
                temp.instance = i;
                temp.trackerType = 'sell';
                try {
                    Bazaar_Tracker(temp, client);
                } catch (error) {
                    console.error('Si è verificato un errore durante l\'esecuzione:', error);
                }
            }
        }
    }, 1000);
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
                Bazaar_Tracker(global, client);
            } catch (error) {
                console.error('Si è verificato un errore durante l\'esecuzione:', error);
            }
        break;
        case 'set_tracker':
            if (global.trackerType === 'buy') {
                global.buy.item[global.instance] = options.getString('item');
                global.buy.price[global.instance] = parseInt(options.getString('price'));
                global.buy.time[global.instance] = parseInt(options.getString('time'));

                await interaction.reply(`Nuovo item impostato: ${global.buy.item[global.instance]}`);
                channel_CMD.send(`Nuovo prezzo impostato: ${global.buy.price[global.instance]}`);
                channel_CMD.send(`Nuovo tempo impostato: ${global.buy.time[global.instance]}`);
            } else {
                global.sell.item[global.instance] = options.getString('item');
                global.sell.price[global.instance] = parseInt(options.getString('price'));
                global.sell.time[global.instance] = parseInt(options.getString('time'));

                await interaction.reply(`Nuovo item impostato: ${global.sell.item[global.instance]}`);
                channel_CMD.send(`Nuovo prezzo impostato: ${global.sell.price[global.instance]}`);
                channel_CMD.send(`Nuovo tempo impostato: ${global.sell.time[global.instance]}`);
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

                    await interaction.reply(`I messaggi DM sono impostati su: ${global.buy.toggleDM[global.instance]}`);
                } else {
                    global.sell.toggleDM[global.instance] = Boolean(options.getString('boolean-value'));

                    await interaction.reply(`I messaggi DM sono impostati su: ${global.sell.toggleDM[global.instance]}`);
                }
                channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance + 1}`);
            } else {
                await interaction.reply('Il parametro inserito non é valido');
            }
        break;
        case 'set_dm':
            if (global.trackerType === 'buy') {
                global.buy.userID[global.instance] = options.getString('id');

                await interaction.reply(`I messaggi DM verranno inviati a: ${global.buy.userID[global.instance]}`);
            } else {
                global.sell.userID[global.instance] = options.getString('id');

                await interaction.reply(`I messaggi DM verranno inviati a: ${global.sell.userID[global.instance]}`);
            }
            channel_CMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance}`);
        break;
        case 'select':
            if (options.getString('type') === 'buy' || options.getString('type') === 'sell') {
                global.instance = parseInt(options.getString('instance')) - 1;
                global.trackerType = options.getString('type');

                await interaction.reply(`Hai selezionato l\'instance numero: ${global.instance + 1} di tipo: ${global.trackerType}`);
            } else {
                await interaction.reply('Il parametro inserito non é valido');
            }
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
            if (global.onCooldown) {
                await interaction.reply(`Questo comando ha un cooldown di ${global.timeCheckStop} ms, attendi.`);
            } else {
                if (global.trackerType === 'buy') {
                    if (global.buy.status[global.instance] === 'off') {
                        await interaction.reply('Non puoi fermare un tracker che non é stato startato');
                    } else {
                        // Cooldown to wait for the checkStop function to stop the tracker
                        global.onCooldown = true;
                        cooldown(global.timeCheckStop).then((result) => {
                            global.onCooldown = result;
                        }).catch((error) => {
                            console.error(error);
                        });

                        global.stopCommand = global.buy.ID[global.instance];
    
                        global.buy.ID[global.instance] = randomID(1, 10000, global);
    
                        global.buy.status[global.instance] = 'off';

                        await interaction.reply(`Il tracker nell\'instance: ${global.instance + 1} di tipo: ${global.trackerType} é stato fermato!`);
                    }
                } else {
                    if (global.sell.status[global.instance] === 'off') {
                        await interaction.reply('Non puoi fermare un tracker che non é stato startato');
                    } else {
                        // Cooldown to wait for the checkStop function to stop the tracker
                        global.onCooldown = true;
                        cooldown(global.timeCheckStop).then((result) => {
                            global.onCooldown = result;
                        }).catch((error) => {
                            console.error(error);
                        });
                        
                        global.stopCommand = global.sell.ID[global.instance];
    
                        global.sell.ID[global.instance] = randomID(1, 10000, global);
        
                        global.sell.status[global.instance] = 'off';

                        await interaction.reply(`Il tracker nell\'instance: ${global.instance + 1} di tipo: ${global.trackerType} é stato fermato!`);
                    }
                }
            }
        break;
    }
});

client.login(token);