const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
// TODO import octokit

// TODO create octokit instance

module.exports = {
  properties: new SlashCommandBuilder()
    .setName("github")
    .setDescription("Grab a GitHub user's info.")
    .addStringOption((option) => option.setName("username").setDescription("A GitHub username").setRequired(true)),

  async run(interaction) {
    // TODO defer the interaction while we fetch the data

    // TODO get the username from the interaction

    // TODO check if the username is blank

    // TODO try to get the user from GitHub
    try {
      // TODO create a message embed with the user's info
    } catch (error) {
      // TODO check if error.status == 404
    }
  },
};
