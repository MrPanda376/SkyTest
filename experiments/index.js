const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ComponentType, ButtonBuilder, ButtonStyle } = require("discord.js");
const { token } = require('../config/config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('Il bot è online!');
});

//TEST EMBEDS

let instance = 1;
let type = 'buy';
let item = 'STOCK_OF_STONKS';
let price = 10000000;
let time = 300000;

const exampleEmbed = new EmbedBuilder()
	.setColor(0xff7300)
	.setTitle('**Settings**')
    .setAuthor({ name: 'Bazaar Tracker' })
	.setThumbnail('https://imgur.com/7WWp8EJ.png')
	.addFields(
		{ name: '**Parametri:**', value: `Instance: ${instance}\nType: ${type}` },
		{ name: '**Impostazioni:**', value: `Item: ${item}\nPrice: ${price} coins\nTime: ${time / 1000} s` },
	)
	.setTimestamp()
	.setFooter({ text: 'SkyFlip', iconURL: 'https://imgur.com/rBYGryR.png' });


const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('select')
    .setPlaceholder('Select an option')
    .addOptions([
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3', description: 'prova' }
]);

const confirm = new ButtonBuilder()
	.setCustomId('confirm')
	.setLabel('Confirm')
	.setStyle(ButtonStyle.Success);

const cancel = new ButtonBuilder()
	.setCustomId('cancel')
	.setLabel('Cancel')
	.setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder().addComponents(selectMenu);
const row1 = new ActionRowBuilder().addComponents(confirm, cancel);









// MAIN

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const channel_CMD = await client.channels.fetch('1228448453672046722');
    let message;

    if (commandName === 'start_tracker') {
        message = await interaction.reply({ embeds: [exampleEmbed], components: [row, row1] });
    }

    const collector = message.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        filter: (i) => i.user.id === interaction.user.id,
        time: 10000,
    });

    collector.on('collect', (interaction) => {
        interaction.reply({ content: `You selected: ${interaction.values[0]}`, ephemeral: true});
    });

    collector.on('end', () => {
        message.edit({ components: [] });
    });

	const prova = message.createMessageComponentCollector({
		componentType: ComponentType.Button,
		filter: (i) => i.user.id === interaction.user.id,
        time: 10000,
	});

	prova.on('collect', (interaction) => {
		const { customId } = interaction;
        if (customId === 'confirm') {
			interaction.reply({ content: 'confirm', ephemeral: true});
		} else if (customId === 'cancel') {
			interaction.reply({ content: 'cancel', ephemeral: true});
		}
    });

    collector.on('end', () => {
        
    });
});

client.login(token);

/*

// EMBED LAYOUT

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
        { name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

*/


/*

// SELECT MENU LAYOUT

const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('select')
    .setPlaceholder('Select an option')
    .addOptions([
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3', description: 'prova' }
]);

const row = new ActionRowBuilder().addComponents(selectMenu);

*/




























/*

SET TRACKER EMBED

const setTrackerEmbed = new EmbedBuilder()
	.setColor(0xff7300)
	.setTitle('**Settings**')
    .setAuthor({ name: 'Bazaar Tracker' })
	.setThumbnail('https://imgur.com/7WWp8EJ.png')
	.addFields(
		{ name: '**Parametri:**', value: `Instance: ${instance}\nType: ${type}` },
		{ name: '**Impostazioni:**', value: `Item: ${item}\nPrice: ${price} coins\nTime: ${time / 1000} s` },
	)
	.setTimestamp()
	.setFooter({ text: 'SkyFlip', iconURL: 'https://imgur.com/rBYGryR.png' });

const setTrackerConfirm = new ButtonBuilder()
	.setCustomId('confirm')
	.setLabel('Confirm')
	.setStyle(ButtonStyle.Success);

const setTrackerCancel = new ButtonBuilder()
	.setCustomId('cancel')
	.setLabel('Cancel')
	.setStyle(ButtonStyle.Danger);

const firstRow = new ActionRowBuilder().addComponents(setTrackerConfirm, setTrackerCancel);

*/