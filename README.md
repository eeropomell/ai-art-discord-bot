# ai-art-discord-bot
open-source AI art discord bot 

Documentation is a TODO.

You need a `config.json` in the root directory that looks like this:
```json
{
    "clientId": "",
    "token": "",
    "guildId": "",
    "civitai_api_key": ""
}
```

where token is your discord bot's token.

## Installation

**Creating a Discord bot**

1. Open the Discord Developer Portal: https://discord.com/developers/applications
2. Navigate to the "Applications" page
3. Create a new application by clicking on "New Application" and giving it a name.
4. Navigate to the "Bot" tab to configure it. ![](https://i.gyazo.com/cfee2961266a3b0c7d3317492dd0b756.png)
6. Click on "Reset Token"
	- **Note:** This token is basically your bot's password. Do not share it with anyone.
7. Copy the token by using the "Copy" button
8. Paste the token into the `config.json` file's `token` field:


## Usage

**Disabling the bot's commands in a channel**

To disable the bot's commands in a certain channel as a server admin:

1. Go to `Server Settings -> Integrations`
2. In the `Integrations` page, select the bot.
3. In the `Channels` section, you can now manage the channels where the bot's slash commands can be used.
   - e.g., if you only allow #general, then users won't be able to see or use the slash commands in any other channel.
     ![](https://i.gyazo.com/e9ffcd901ed366e83d458345b88b3905.png)





 

