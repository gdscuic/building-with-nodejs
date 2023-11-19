const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  properties: new SlashCommandBuilder().setName("hello").setDescription("Check if I'm online."),

  async run(interaction) {
    interaction.reply("Hey!");

    // TODO
    // for our todo board, we'd like the bot to send a message in a channel it can edit
    // we temporarily we add this line for the bot to send a message in a channel
    // we can then take that message's id and put it in the .env file under DISCORD_BOARD_MESSAGE_ID
    // interaction.channel.send("Board message");
  },
};
