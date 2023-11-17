const fs = require("fs");
const path = require("path");

/**
 * Retrieves a map of commands from the "commands" directory.
 *
 * @returns {Map<string, {properties: SlashCommandBuilder, run: Promise<void>}>} A map of commands, where the keys are the command names and the values are the command objects.
 */
function getCommandsFromDirectory() {
  const commands = new Map();

  const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", file));

    if (!command.properties || !command.run) {
      console.log(`Command ${file} is missing properties or run function`);
      continue;
    }

    commands.set(command.properties.name, command);
  }

  return commands;
}

/**
 * Checks if a string is blank.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} Whether the string is blank or not.
 */
function isBlank(str) {
  // from https://stackoverflow.com/a/3261380
  return !str || /^\s*$/.test(str);
}

module.exports = {
  getCommandsFromDirectory,
  isBlank,
};
