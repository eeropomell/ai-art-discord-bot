# Discord AI Art Generator Bot

[![](https://dcbadge.limes.pink/api/server/https://discord.gg/rSgTS8CSH3)](https://discord.gg/https://discord.gg/rSgTS8CSH3)

![AiArtGamesHeader (1)](https://github.com/user-attachments/assets/c070e0c2-5161-459f-8b21-4dc183ce1bdb)


This bot is a fork of AI Art Games bot, an entertainment and utility Discord bot designed for AI art servers, made by Eero Pomell, originally for Civitai's Discord server. This open source version of the bot doesn't have all features like leaderboards, as they would make the bot less accessible and harder to setup. The prerequisites for getting started with the bot are listed below.

Feel free to fork this and develop your own custom AI art bot!

## Features

- **Art Generation**: Generate AI art using user prompts with SDXL.
- **Text Logo Creation**: Generate text-based logos using AI.

## Getting Started

### Prerequisites

- Node.js (>=14.0.0)
- A Discord server to host the bot
- An API key from Civitai for the image generation.

### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/discord-ai-art-generator.git && cd discord-ai-art-generator
```

2. Install dependencies:
```
npm install
```

3. Create a `config.json` file in the root directory of the project with the following fields:
```
{
	"clientId": "",
	"token": "",
	"guildId": "",
	"civitai_api_key": ""
}
```
`clientId`, `token` and `guildId` are Discord API related fields, you can find more information about them in the [Discord Developer Portal](https://discord.com/developers/docs/intro) and [discord.js's getting started guide](https://discordjs.guide/). 
`civitai_api_key` is your Civitai account's API key, you can generate an API key from [Your Account Settings](https://civitai.com/user/account).


### Running the Bot

1. Register the application commands:
```
node deploy-commands.js
```

2. Start the bot:
```
node index.js
```
For production use, consider using a process manager like PM2.

## Usage

### Commands

- **/generate prompt [CFG, negative prompt, seed, steps, etc.]**: Generates an AI art piece based on the provided prompt using an SDXL checkpoint.
  - Example: `/generate prompt:"A beautiful sunset over the ocean" CFG:10`
- **/textlogo text [prompt]**: Generates a text-based logo based on the provided text using SDXL.
  - Example: `/textlogo text:"AI Art Generator" prompt:summer,blue sky, masterpiece, 8K`

## Contributing

I, Eero Pomell, am no longer personally working on this project, but I'm still maintaining PRs. You are also encouraged to fork it and extend the feature set however you like!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

This bot is an open-source continuation of discord bot AI Art Games by me (Eero), that I developed over January to April 2024. It was used in Civitai's community server and 100 other AI art servers. 

![zoomVid](https://github.com/user-attachments/assets/11f2fe96-e755-4008-a6c2-0e34ee073061)

![help](https://github.com/user-attachments/assets/0f7c6c10-0c82-4b08-aeff-0dfea1e9c673)

![leaderboard](https://github.com/user-attachments/assets/6605642d-47fd-4b44-be84-d9fbdf4cb047)


Others:
- [discord.js](https://discord.js.org/) for the library used to interact with Discord.
- [Civitai](https://civitai.com/) for providing the AI art generation capabilities.









