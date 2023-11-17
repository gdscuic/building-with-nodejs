require("dotenv").config();
const { REST, Routes } = require("discord.js");
const { getCommandsFromDirectory } = require("./common");

const commandsMap = getCommandsFromDirectory();
const commandsArray = Array.from(commandsMap.values());
const commandsData = commandsArray.map((command) => command.properties.toJSON());

console.log(commandsData);

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: commandsData })
  .then(() => console.log("Successfully uploaded application (/) commands."))
  .catch(console.error);
