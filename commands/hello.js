const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  properties: new SlashCommandBuilder().setName("hello").setDescription("Check if I'm online."),

  async run(interaction) {
    interaction.reply("Hey!");
  },
};
