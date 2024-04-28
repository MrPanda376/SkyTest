const { SlashCommandBuilder, REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('../../data/config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('start_tracker')
        .setDescription('Fa partire il tracker')
        .toJSON(),
    new SlashCommandBuilder()
        .setName('stop_tracker')
        .setDescription('Ferma il tracker')
        .toJSON(),
    new SlashCommandBuilder()
        .setName('set_tracker')
        .setDescription('Impostazioni del tracker')
        .addStringOption(option => option
            .setName('item')
            .setDescription('Inserisci l\'item')
            .setRequired(true))
        .addStringOption(option => option
            .setName('price')
            .setDescription('Inserisci il prezzo')
            .setRequired(true))
        .addStringOption(option => option
            .setName('time')
            .setDescription('Inserisci ogni quanto tempo il tracker deve verificare il prezzo (in ms)')
            .setRequired(true))
        .toJSON(),
    new SlashCommandBuilder()
        .setName('select')
        .setDescription('Imposta l\'instance del bot')
        .addStringOption(option => option
            .setName('instance')
            .setDescription('Inserisci l\'instance')
            .setRequired(true))
        .addStringOption(option => option
            .setName('type')
            .setDescription('Inserisci il tipo di instance (buy/sell)')
            .setRequired(true))
        .toJSON(),
    new SlashCommandBuilder()
        .setName('instance')
        .setDescription('Crea/Elimina un\'instance')
        .addStringOption(option => option
            .setName('action')
            .setDescription('Inserisci \'create\' o \'delete\' per creare o eliminare un\'instance')
            .setRequired(true))
        .addStringOption(option => option
            .setName('buy_channel_id')
            .setDescription('Inserisci l\'ID del canale per il buy tracker (da inserire solo se si sta creando un\'instance)')
            .setRequired(false))
        .addStringOption(option => option
            .setName('sell_channel_id')
            .setDescription('Inserisci l\'ID del canale per il sell tracker (da inserire solo se si sta creando un\'instance)')
            .setRequired(false))
        .toJSON(),
    new SlashCommandBuilder()
        .setName('toggle_dm')
        .setDescription('Attiva o Disattiva i DM')
        .addStringOption(option => option
            .setName('boolean_value')
            .setDescription('Inserisci true o false')
            .setRequired(true))
        .toJSON(),
    new SlashCommandBuilder()
        .setName('set_dm')
        .setDescription('Impostazioni dei DM')
        .addStringOption(option => option
            .setName('id')
            .setDescription('Inserisci \'ID del destinatario dei DM')
            .setRequired(true))
        .toJSON(),
    new SlashCommandBuilder()
        .setName('save_now')
        .setDescription('Salva tutte le impostazioni del bot')
        .toJSON(),
    new SlashCommandBuilder()
        .setName('auto_save')
        .setDescription('Impostazioni del salvataggio automatico')
        .addStringOption(option => option
            .setName('time')
            .setDescription('Ogni quanto tempo devono essere salvate le impostazioni (in ms)')
            .setRequired(true))
        .toJSON(),
    new SlashCommandBuilder()
        .setName('info')
        .setDescription('Visualizza tutte le impostazioni attuali del bot')
        .toJSON(),
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Mostra la guida del bot')
        .toJSON(),
];

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log('Inizio la registrazione dei comandi...');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Comandi registrati con successo!');
    } catch (error) {
        console.error('Errore durante la registrazione dei comandi:', error);
    }
})();