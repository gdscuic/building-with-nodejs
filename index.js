require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { getCommandsFromDirectory } = require("./common.js");

// create a new instance of the Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// grab all commands from the commands directory
const commands = getCommandsFromDirectory();

// this event will only trigger after logging in
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// this event will trigger when the bot receives a new interaction event
client.on("interactionCreate", async (interaction) => {
  // there are different types of interactions, we only want to handle chat commands
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
