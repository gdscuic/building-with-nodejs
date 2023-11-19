const { EmbedBuilder } = require("discord.js");
const { Octokit } = require("octokit");

const octokit = new Octokit();

/**
 * Handles GitHub board functionality.
 * @param {import("discord.js").Client} client - The Discord.js client.
 */
async function handleGitHubBoard(client) {
  // get channel from Discord
  const channel = await client.channels.fetch(process.env.DISCORD_BOARD_CHANNEL_ID);

  if (!channel) {
    console.error("The board channel was not found");
    return;
  }

  // get message from channel
  const message = await channel.messages.fetch(process.env.DISCORD_BOARD_MESSAGE_ID);

  if (!message) {
    console.error("The board message was not found");
    return;
  }

  // use the search api to find all open issues in the repo gdscuic/gdsc-uic-web-frontend
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: "repo:gdscuic/gdsc-uic-web-frontend type:issue is:open",
  });

  const { total_count, incomplete_results, items } = data;

  let output = `${incomplete_results ? "Around " : ""}${total_count} open issues\n\n`;
  items.forEach((item) => {
    output += `[${item.title}](${item.html_url})\n`;
  });

  const msgEmbed = new EmbedBuilder()
    .setColor("#315e7d")
    .setTitle("Project Todo Board")
    .setURL("https://github.com/orgs/gdscuic/projects/6")
    .setThumbnail("https://avatars.githubusercontent.com/u/90728025?v=4")
    .setDescription(output);

  // edit the message
  await message.edit({ content: "", embeds: [msgEmbed] });
}

module.exports = handleGitHubBoard;
