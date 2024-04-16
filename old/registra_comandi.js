const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('../config/config.json');

const commands = [
    new SlashCommandBuilder().setName("start-program-sell").setDescription('Fa partire il programma per vendere').toJSON(),
    new SlashCommandBuilder().setName('start-program-buy').setDescription('Fa partire il programma per comprare').toJSON(),
    new SlashCommandBuilder().setName('stop-programs').setDescription('Ferma tutti i programmi in esecuzione').toJSON(),
    new SlashCommandBuilder().setName('set-program-sell').setDescription('Impostazioni del programma per vendere').addStringOption(option => option.setName('item').setDescription('Inserisci l\'item da impostare').setRequired(true)).addStringOption(option => option.setName('price').setDescription('Inserisci il prezzo per vendere').setRequired(true)).addStringOption(option => option.setName('time').setDescription('Inserisci ogni quanto tempo il programma deve verificare il prezzo (in ms)').setRequired(true))
  .toJSON(),
    new SlashCommandBuilder().setName('set-program-buy').setDescription('Impostazioni del programma per comprare').addStringOption(option => option.setName('item').setDescription('Inserisci l\'item da impostare').setRequired(true)).addStringOption(option => option.setName('price').setDescription('Inserisci il prezzo per comprare').setRequired(true)).addStringOption(option => option.setName('time').setDescription('Inserisci ogni quanto tempo il programma deve verificare il prezzo (in ms)').setRequired(true))
  .toJSON(),
    new SlashCommandBuilder().setName('help').setDescription('Informazioni utili per il funzionamento del bot').toJSON(),
    new SlashCommandBuilder().setName('info').setDescription('Visualizza tutte le impostazioni attuali del bot').toJSON(),
    new SlashCommandBuilder().setName('toggle-dm').setDescription('Attiva o Disattiva i DM, NON toccare se non sei autorizzato').addStringOption(option => option.setName('boolean-value').setDescription('Inserisci true o false, se metti altro vuol dire che NON sei autorizzato ad usare questo comando').setRequired(true)).toJSON(),
    new SlashCommandBuilder().setName('select').setDescription('Imposta su quale instance si vuole usare il bot').addStringOption(option => option.setName('instance').setDescription('Inserisci 1, 2 o 3 in base a quale instance vuoi usare').setRequired(true)).toJSON(),
    new SlashCommandBuilder().setName('set-dm').setDescription('Impostazioni dei DM').addStringOption(option => option.setName('id').setDescription('Inserisci \'ID della persona che vuole ricevere i DM').setRequired(true)).toJSON(),
    new SlashCommandBuilder().setName('save-now').setDescription('Salva tutte le impostazioni del bot').toJSON(),
    new SlashCommandBuilder().setName('auto-save').setDescription('Impostazioni del salvataggio automatico').addStringOption(option => option.setName('time').setDescription('Ogni quanto tempo devono essere salvate le impostazioni (in ms)').setRequired(true)).toJSON(),
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Inizio la registrazione dei comandi...');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

    console.log('Comandi registrati con successo!');
  } catch (error) {
    console.error('Errore durante la registrazione dei comandi:', error);
  }
})();