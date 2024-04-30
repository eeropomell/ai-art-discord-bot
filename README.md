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


