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






//TEST EMBEDS

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








// MAIN

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const options = interaction.options;
    const channel_CMD = await client.channels.fetch('1228448453672046722');

    if (commandName === 'prova') {
        await interaction.reply('Prova eseguita con successo!');
        
        //channel_CMD.send({ embeds: [exampleEmbed] });

    } else if (commandName === 'save-now') {
        await interaction.reply('Variabili salvate con successo!');
        manualSave();
    }
});

client.login(token);