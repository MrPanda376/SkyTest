const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ComponentType } = require("discord.js");
const { token } = require('../config/config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('Il bot è online!');
});

//TEST EMBEDS

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






const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('select')
    .setPlaceholder('Select an option')
    .addOptions([
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3', description: 'prova' }
]);

const row = new ActionRowBuilder().addComponents(selectMenu);






// MAIN

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const channel_CMD = await client.channels.fetch('1228448453672046722');
    let selected

    if (commandName === 'start_tracker') {
        const reply = await interaction.reply({ embeds: [exampleEmbed], components: [row] });

        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 10000,
        });

        collector.on('collect', (interaction) => {
            interaction.reply(`You selected: ${interaction.values[0]}`);
            selected = interaction.values[0];
        });

        collector.on('end', () => {
            reply.edit({ components: [] });
            console.log(selected);
        });
    }
});

client.login(token);