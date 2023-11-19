const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Octokit } = require("octokit");

const octokit = new Octokit();

module.exports = {
  properties: new SlashCommandBuilder()
    .setName("github")
    .setDescription("Grab a GitHub user's info.")
    .addStringOption((option) => option.setName("username").setDescription("A GitHub username").setRequired(true)),

  async run(interaction) {
    const username = interaction.options.getString("username");

    if (!username) {
      interaction.reply("You need to provide a username!");
      return;
    }

    try {
      const { data } = await octokit.rest.users.getByUsername({ username });

      const msgEmbed = new EmbedBuilder()
        .setColor("#315e7d")
        .setTitle(data.name)
        .setURL(data.html_url)
        .setThumbnail(data.avatar_url)
        .setDescription(data.bio)
        .addFields(
          { name: "Followers", value: data.followers.toString(), inline: true },
          { name: "Following", value: data.following.toString(), inline: true },
          { name: "Public Repos", value: data.public_repos.toString(), inline: true }
        )
        .setFooter({ text: `${data.blog + " " || ""}• Joined GitHub on` })
        .setTimestamp(new Date(data.created_at));

      interaction.reply({ embeds: [msgEmbed] });
    } catch (error) {
      if (error.status === 404) {
        return interaction.reply("That user doesn't exist!");
      }

      console.error(error);
      return interaction.reply("Sorry, I got an error trying to get that GitHub user.");
    }
  },
};
