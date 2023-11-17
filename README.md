# building-with-nodejs

This repo contains the starter code needed to follow along with the Building with Node.js event. To run this project, you will need to have Node.js installed on your machine. You can download Node.js from [here](https://nodejs.org/en/download/). The LTS version is recommended.

Some of the code here is based off of the excellent examples in the [discord.js documentation](https://discord.js.org/#/docs/discord.js/main/general/welcome) and the [discord.js guide](https://discordjs.guide/). If you're looking for more examples on how to improve this bot, check out those resources.

## Getting Started

Clone the repo and install the dependencies with these commands in your terminal:

```bash
git clone https://github.com/gdscuic/building-with-nodejs.git
cd building-with-nodejs
npm install
```

Copy the `.env.example` file to `.env` and fill in the values. You will need to create a new Discord application on the [Discord Developer Portal](https://discord.com/developers/applications). The `DISCORD_TOKEN` can be found on the Bot page. The `DISCORD_CLIENT_ID` can be found on the OAuth page.

`DISCORD_GUILD_ID` can be found by enabling Developer Mode in Discord. You can do this by going to Settings > Advanced > Developer Mode. Then, right click on the server you'd like to have the commands in and click "Copy ID".

`DISCORD_BOARD_CHANNEL_ID` and `DISCORD_BOARD_MESSAGE_ID` are expected to be the channel and message ID of the message that will be updated with the Todo board. You can get these by right clicking on the channel and message and clicking "Copy ID". How these values are used are explained in the event.

`GITHUB_TOKEN` is entirely optional and can be used if you encouter rate limits while using the GitHub API.

Once you've filled out the values required in the `.env`, you should post your commands to Discord with this command:

```bash
node postCommands.js
```

This will post the commands to Discord. You can then run the bot with this command:

```bash
npm run start
```

## Project Structure

`index.js` contains the main code for the Discord client. Events are handled here. `common.js` contains code that is used in multiple places.

`postCommands.js` contains code that will post the commands to Discord. This is ran once to let Discord know what commands are available in your bot.

`/commands` contains code that will be ran when a user uses a chat command. `/commands/hello.js` contains an example on how commands are structured for our Discord bot.

`githubBoard.js` has the code that will be run hourly to update the Todo board. This is the code that will be modified during the event.
