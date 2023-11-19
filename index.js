require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { getCommandsFromDirectory } = require("./common.js");
const handleGitHubBoard = require("./githubBoard.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = getCommandsFromDirectory();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // run our function once on startup
  handleGitHubBoard(client).catch(console.error);

  // schedule our function to run every hour to the board gets updated
  setInterval(() => {
    handleGitHubBoard(client).catch(console.error);
  }, 1000 * 60 * 60);
});

client.on("interactionCreate", async (interaction) => {
  // other interaction types exist but we only want to handle chat slash commands
  if (!interaction.isChatInputCommand()) return;

  // check if commands map has the command from the interaction
  if (!commands.has(interaction.commandName)) return;

  try {
    await commands.get(interaction.commandName).run(interaction);
  } catch (error) {
    console.error(error);
    // Discord will throw errors if we reply to an interaction that has already been replied to
    // so we need to check if the interaction has been replied to or deferred
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
    } else {
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
