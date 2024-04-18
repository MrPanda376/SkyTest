const { Client, GatewayIntentBits, Interaction, ModalSubmitInteraction, EmbedBuilder } = require("discord.js");
const { token } = require('../config/config.json');
const { saveDataToFile, searchNameInFile, findValue, sleep } = require('./functions');
const { altFindValue, altSearchNameInFile } = require('./altFunction')
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('Il bot è online!');
});

// COMANDI


// MIGLIORE

const exampleEmbed = {
    color: 0xff7300,
    title: 'Some title',
    url: 'https://discord.js.org',
    author: {
        name: 'Some name',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://discord.js.org',
    },
    description: 'Some description here',
    thumbnail: {
        url: 'https://i.imgur.com/AfFp7pu.png',
    },
    fields: [
        {
            name: 'Regular field title',
            value: 'Some value here',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
    ],
    image: {
        url: 'https://i.imgur.com/AfFp7pu.png',
    },
    timestamp: new Date().toISOString(),
    footer: {
        text: 'Some footer text here',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
    },
};


const prova1 = {
    "test": true,
    "prova": false,
}


console.log(prova1.test);
console.log(prova1.prova);







client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const options = interaction.options;
    const channel_CMD = await client.channels.fetch('1228448453672046722');

    if (commandName === 'prova') {
        await interaction.reply('Prova eseguita con successo!');
        
        //channel_CMD.send({ embeds: [exampleEmbed] });

        main();
    } else if (commandName === 'save-now') {
        await interaction.reply('Variabili salvate con successo!');
        manualSave();
    }
});

client.login(token);











/*

EMBED EXAMPLE

const exampleEmbed = new EmbedBuilder()
    .setColor(0xff7300)
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
*/

// PROVA PER VEDERE COME SALVARE UN ARRAY




let prova = [];



if (fs.existsSync('variables.json')) {
    // Leggi i dati dal file
    fs.readFile('variables.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Si è verificato un errore durante la lettura delle variabili:', err);
          } else {
            try {
              const savedVariables = JSON.parse(data);

              // Assegna i valori alle variabili
              prova = savedVariables.prova;
    
              console.log('Variabili recuperate con successo.');

              console.log(prova[0]);
              console.log(prova[1]);
              console.log(prova[2]);
            } catch (error) {
              console.error('Si è verificato un errore durante il parsing dei dati JSON:', error);
            }
        }
    });
} else {
  console.log('Il file variables.json non esiste. Le variabili non sono state recuperate.');
};










async function manualSave() {
    prova = [1, 2, 3];
    // Salva tutte le variabili in un oggetto
    const variablesToSave = {
        prova,
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










//FIX #1

async function main() {
    while (true) {
        sellProgramStatus_1 = 'active';

        const outputFilePath = 'output.txt';
        await saveDataToFile(outputFilePath);

        const filePath = 'output.txt';
        const nameToSearch = "STOCK_OF_STONKS"; // Oggetto da cercare

        const context = await searchNameInFile(filePath, nameToSearch);

        const valueToFind = 'pricePerUnit'; // Valore che viene cercato in function.js da cambiare solo se si cambia cosa si vuole cercare
        const value = findValue([context], valueToFind); //CHANGE QUI

        const formattedValue = value.toLocaleString();

        // Invia il messaggio formattato su Discord
        const channel = client.channels.cache.get('1228448453672046722'); // Sostituisci 'ID_DEL_CANALE' con l'ID del canale di destinazione


        const maxValue = parseInt("100000000"); // DA NOTARE IL PARSE INT PER LA CONVERSIONE IN NUMERO FIX #1
        const formattedMaxValue = maxValue.toLocaleString(); // Valore maxValue formattato con i punti

        if (value > maxValue) {
            channel.send(`${nameToSearch} - VENDI TUTTO ORA!!! @everyone - SellPrice: ${formattedValue} - Set to: ${formattedMaxValue}`); // Output se prezzo conveniente
        } else {
            channel.send(`${nameToSearch} - Non vendere - SellPrice: ${formattedValue} - Set to: ${formattedMaxValue}`); // Output se prezzo NON conveniente
        }

        await sleep(20000); // Ritardo tra le esecuzioni
    };
};

