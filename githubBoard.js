const { EmbedBuilder } = require("discord.js");
const { Octokit } = require("octokit");

const octokit = new Octokit();

/**
 * Handles GitHub board functionality.
 * @param {import("discord.js").Client} client - The Discord.js client.
 */
async function handleGitHubBoard(client) {
  // TODO get channel from Discord
  // TODO get message from channel
  // TODO use the search api to find all open issues in the repo gdscuic/gdsc-uic-web-frontend
  // https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28
  // TODO use total_count, incomplete_results, items data to create a message embed
  // TODO edit the message
}

module.exports = handleGitHubBoard;
