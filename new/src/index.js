const { Client, GatewayIntentBits } = require("discord.js");
const fs = require('fs');
const { token } = require('../data/config.json');
const { Bazaar_Tracker } = require('./functions/botFeatures');
const { autoSave, manualSave } = require('./functions/saveVariables');
const { randomID, isCommandOnCooldown, setCommandCooldown } = require('./functions/utilities');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let global = {
    "instance": 0, // Ricordarsi che é sempre instance - 1 pk stiamo lavorando con gli array
    "totalInstances": 1,
    "trackerType": 'buy',
    "stopCommand": 0,
    "timeCheckStop": 10000,
    "cooldownTime": 10000,
    "timeAutoSave": 10000,
    "channel": '1228448453672046722',
    "buy": {
        "item": ['N/D'],
        "price": [1],
        "time": [10000],
        "status": ['off'],
        "toggleDM": [false],
        "userID": ['1'],
        "channel": ['1228448453672046722'],
        "ID": [1],
    },
    "sell": {
        "item": ['N/D'],
        "price": [1],
        "time": [10000],
        "status": ['off'],
        "toggleDM": [false],
        "userID": ['1'],
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
        console.log('Il file variables.json non esiste, quindi le variabili non sono state recuperate.');
    }
    setTimeout(() => { // Resume of the programs that were active before the bot crashed/stopped
        let temp = global;
        for (let i = 0; i < global.totalInstances; i++) {
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
        autoSave(global.timeAutoSave, global); // Inizio salvataggio automatico delle variabili
    }, 1000);
});

// COMANDI

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const options = interaction.options;
    const channelCMD = await client.channels.fetch(global.channel);

    switch (commandName) {
        case 'start_tracker':
            if ((global.buy.status[global.instance] === 'on' && global.trackerType === 'buy') || (global.sell.status[global.instance] === 'on' && global.trackerType === 'sell')) {
                await interaction.reply('Non é possibile avviare piú volte lo stesso tracker nella stessa instance.');
            } else {
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
            }
        break;
        case 'stop_tracker':
            if (isCommandOnCooldown(commandName, global.cooldownTime)) {
                await interaction.reply(`Il comando "${commandName}" ha un cooldown di ${global.cooldownTime / 1000} secondi, attendi.`);
            } else {
                if (global.trackerType === 'buy') {
                    if (global.buy.status[global.instance] === 'off') {
                        await interaction.reply('Non puoi fermare un tracker che non é stato startato.');
                    } else {
                        setCommandCooldown(commandName) // Cooldown to wait for the checkStop function to stop the tracker
                        global.stopCommand = global.buy.ID[global.instance];
    
                        global.buy.ID[global.instance] = randomID(1, 10000, global);
    
                        global.buy.status[global.instance] = 'off';

                        await interaction.reply(`Il tracker nell\'instance: ${global.instance + 1} di tipo: ${global.trackerType} é stato fermato!`);
                    }
                } else {
                    if (global.sell.status[global.instance] === 'off') {
                        await interaction.reply('Non puoi fermare un tracker che non é stato startato.');
                    } else {
                        setCommandCooldown(commandName) // Cooldown to wait for the checkStop function to stop the tracker
                        global.stopCommand = global.sell.ID[global.instance];
    
                        global.sell.ID[global.instance] = randomID(1, 10000, global);
        
                        global.sell.status[global.instance] = 'off';

                        await interaction.reply(`Il tracker nell\'instance: ${global.instance + 1} di tipo: ${global.trackerType} é stato fermato!`);
                    }
                }
            }
        break;
        case 'set_tracker':
            if (global.trackerType === 'buy') {
                global.buy.item[global.instance] = options.getString('item');
                global.buy.price[global.instance] = parseInt(options.getString('price'));
                global.buy.time[global.instance] = parseInt(options.getString('time'));

                await interaction.reply(`Nuovo item impostato: ${global.buy.item[global.instance]}`);
                channelCMD.send(`Nuovo prezzo impostato: ${global.buy.price[global.instance]}`);
                channelCMD.send(`Nuovo tempo impostato: ${global.buy.time[global.instance]}`);
            } else {
                global.sell.item[global.instance] = options.getString('item');
                global.sell.price[global.instance] = parseInt(options.getString('price'));
                global.sell.time[global.instance] = parseInt(options.getString('time'));

                await interaction.reply(`Nuovo item impostato: ${global.sell.item[global.instance]}`);
                channelCMD.send(`Nuovo prezzo impostato: ${global.sell.price[global.instance]}`);
                channelCMD.send(`Nuovo tempo impostato: ${global.sell.time[global.instance]}`);
            }
            channelCMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance + 1} tipo: ${global.trackerType}`);
        break;
        case 'select':
            if ((options.getString('type') === 'buy' || options.getString('type') === 'sell') && parseInt(options.getString('instance')) > 0 && parseInt(options.getString('instance')) <= global.totalInstances) {
                global.instance = parseInt(options.getString('instance')) - 1;
                global.trackerType = options.getString('type');

                await interaction.reply(`Hai selezionato l\'instance numero: ${global.instance + 1} di tipo: ${global.trackerType}`);
            } else {
                await interaction.reply('I parametri inseriti non sono validi.');
            }
        break;
        case 'instance':
            if (options.getString('action') === 'create') {
                global.totalInstances += 1;
                // Buy
                global.buy.item[global.totalInstances - 1] = 'N/D'
                global.buy.price[global.totalInstances - 1] = 1;
                global.buy.time[global.totalInstances - 1] = 10000;
                global.buy.status[global.totalInstances - 1] = 'off';
                global.buy.toggleDM[global.totalInstances - 1] = false;
                global.buy.userID[global.totalInstances - 1] = '1';
                global.buy.channel[global.totalInstances - 1] = options.getString('buy_channel_id');
                global.buy.ID[global.totalInstances - 1] = randomID(1, 10000, global);
                // Sell
                global.sell.item[global.totalInstances - 1] = 'N/D'
                global.sell.price[global.totalInstances - 1] = 1;
                global.sell.time[global.totalInstances - 1] = 10000;
                global.sell.status[global.totalInstances - 1] = 'off';
                global.sell.toggleDM[global.totalInstances - 1] = false;
                global.sell.userID[global.totalInstances - 1] = '1';
                global.sell.channel[global.totalInstances - 1] = options.getString('sell_channel_id');
                global.sell.ID[global.totalInstances - 1] = randomID(1, 10000, global);
                await interaction.reply(`E\' stata creata l\'instance: ${global.totalInstances}`);
            } else {
                if (global.buy.status[global.totalInstances - 1] === 'off' && global.sell.status[global.totalInstances - 1] === 'off') {
                    if (global.totalInstances !== 1) {
                        await interaction.reply(`Hai eliminato l\'instance: ${global.totalInstances}`);
                        global.totalInstances -= 1;
                    } else {
                        await interaction.reply('Non puoi eliminare la prima instance.');
                    }
                } else {
                    await interaction.reply('Non puoi eliminare un\'instance con dei tracker attivi, fermali e riprova.');
                }
            }
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
                channelCMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance + 1}`);
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
            channelCMD.send(`I seguenti valori sono stati impostati nell\'instance: ${global.instance}`);
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
        case 'info':
        break;
        case 'help':
            await interaction.reply('Se non sai come far partire il bot segui i seguenti step:');
            channelCMD.send('1-Imposta il bot con le informazioni dell\'item da tracciare usando /set-program-sell o /set-program-buy');
            channelCMD.send('2-Se non conosci gli ID degli item della skyblock vai su: https://api.hypixel.net/skyblock/bazaar per trovare l\'item corretto');
            channelCMD.send('3-Imposta il prezzo e ogni quanto deve essere tracciato, ricordati che il tempo é in ms');
            channelCMD.send('4-Utilizza i comandi /start-program-sell o /start-program-buy per far partire il bot');
            channelCMD.send('5-Per fermare i programmi in esecuzione fai /stop-programs');
            channelCMD.send('6-Utilizza /toggle-dm per abilitare o disabilitare i dm con true o false');
            channelCMD.send('7-Per impostare il destinatario dei DM usa /set-dm ed inserisci l\'ID del destinatario');
            channelCMD.send('8-Usa /info per sapere informazioni sulle impostazioni attuali del bot');
            channelCMD.send('9-Usa /select, seguito dal numero dell\'instance per selezionare una instance');
        break;
    }
});

client.login(token);