const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(
      "Get a list of all commands or more information for a specific command."
    )

    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription(
          "The command to get a guide for. Leave empty to get a list of all commands."
        )
        .addChoices(
          { name: "/generate", value: "generate" },
          { name: "/textlogo", value: "textlogo" }
        )
    ),
  async execute(interaction) {
    const cmd = interaction.options.getString("command");
    let embed;

    if (!cmd) {
      embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Commands")
        .setFields([
          {
            name: `/generate`,
            value: `Generate Stable Diffusion images using the Civitai generator!`,
          },
          {
            name: `/textlogo`,
            value: `Generate a text logo with Stable Diffusion!`,
          },
        ])
        .setTimestamp()
        .setFooter({
          text: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        });
    } else if (cmd === "generate") {
      embed = new EmbedBuilder().setColor(0x0099ff).setTitle("/generate Help")
        .setDescription(`
      /generate is a command that allows you to generate Stable Diffusion images using the Civitai image generation service. Parameters you can set: prompt, negative prompt, seed, cfg, checkpoint, resolution, clipskip, sampler, and steps. Prompt is the only required parameter. Checkpoint can be selected from a list of 3 SDXL checkpoints. Generations time out after 10 minutes, but they often finish in less than 60 seconds.
      `);
    } else if (cmd === "textlogo") {
      embed = new EmbedBuilder().setColor(0x0099ff).setTitle("/textlogo Help")
        .setDescription(`
        /textlogo is a command that allows you to generate textlogos using Stable Diffusion. The LoRA is Dever's SDXL Text Logo LoRA.
        `);
    }

    await interaction.reply({ embeds: [embed] });
  },
};
