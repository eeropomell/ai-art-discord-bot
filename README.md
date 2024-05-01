# AI Art Discord Bot

An AI art discord bot using the discord.js library and Civitai's SDK for image generation. 

# Features

- /generate - a basic Stable Diffusion image generator
	- `/generate prompt [negative-prompt,CFG, seed, etc.]`
        - `prompt` is the only mandatory parameter, all other Stable Diffusion parameters like CFG, seed, etc. are optional.
	- 5 different SDXL checkpoints
- /textlogo - text logo generation using [Dever's Text Logo SDXL LoRA](https://civitai.com/models/345941/text-logos-by-dever-sdxl)
	- `/textlogo text [prompt='spikes, flames, oil, gradient background']`
        - `text` specifies the text to be generated and `prompt` contains additional details for the image. The final prompt for the image generator is a concation of `text` and `prompt`.

- /help - see help for all commands or a specific one

# Installation and Running

You need to host the Discord bot yourself and provide an API key from Civitai.

#### Installation on Linux

1. Get the source code and cd into the directory
```
git clone https://github.com/eeropomell/ai-art-discord-bot; cd ai-art-discord-bot
```

2. Install dependencies
```
npm install
```

3. Create a `config.json` file in the root directory of the project with the 4 following fields:
```
{
    "clientId": "",
    "token": "",
    "guildId": "",
    "civitai_api_key": ""
}
```

In the above:
-  `clientId`, `token`, and `guildId` are Discord API related IDs:
  	- `clientId` = your Discord bot's application ID.
    - `token` = your Discord bot's secret token
    - `guildId` = the server's ID that the bot will be in. 
- `civitai_api_key` is your Civitai account's API key, required for the image generation service. You can generate an API key from your [User Account Settings](https://civitai.com/user/account)


#### **Creating a Discord bot**

In order to use this bot on your Discord server, you need your own Discord bot application running this code. Here's how you can create a Discord bot:

1. Open the Discord Developer Portal: https://discord.com/developers/applications
2. Navigate to the "Applications" page
3. Create a new application by clicking on "New Application" and giving it a name.
4. In the "General Information" tab, copy the "Application ID" field and paste it into the `config.json` file's `clientId` field.
4. Navigate to the "Bot" tab to configure it. ![](https://i.gyazo.com/cfee2961266a3b0c7d3317492dd0b756.png)
6. Click on "Reset Token"
	- **Note:** This token is basically your bot's password. Do not share it with anyone.
7. Copy the token by using the "Copy" button
8. Paste the token into the `config.json` file's `token` field

You are now ready to host the bot. 

Register the application commands with:
```
node deploy-commands.js
```

And start the bot client:
```
node index.js
```

For actually running the bot in production, you should use PM2 or something similar. 


### Usage tips

#### Disabling the bot's commands in a certain channel

The bot doesn't have a separate command for enabling or disabling channels on a server, but Discord provides functionality so that a server admin can easily do that themselves:
1. Go to `Server Settings -> Integrations`
2. In the `Integrations` page, select the bot.
3. In the `Channels` section, you can now manage the channels where the bot's slash commands can be used.
   - e.g., if you only allow #general, then users won't be able to see or use the slash commands in any other channel.
     ![](https://i.gyazo.com/e9ffcd901ed366e83d458345b88b3905.png)

## Further Resources

Here are some useful resources on Discord bots:
- [Hosting the Discord bot process with PM2](https://discordjs.guide/improving-dev-environment/pm2.html#installation)
- [The Discord.js Guide](https://discordjs.guide/)
   - Note: This bot implements the project structure used in discord.js's getting started guide, so their site contains a lot of relevant stuff on stuff like command registeration, bot creation, using PM2 to run the bot process.
- [Discord Developer Portal](https://discord.com/developers/docs/intro)

## Credits

This bot is an open-source continuation of a Discord bot called "AI Art Games" developed by eerop during January 2024 - April 2024. 








 

