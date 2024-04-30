const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, ButtonBuilder } = require("discord.js");
const { AttachmentBuilder } = require("discord.js");

const { Civitai } = require("civitai");
console.log(Civitai);
const civitai = new Civitai({
  auth: require("../../config.json").civitai_api_key,
});
const { Scheduler, AssetType } = require("civitai");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("textlogo")
    .setDescription("Generate a text logo using LoRA 'Text Logos by Dever'")

    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription(
          'The text you want to generate a logo for. e.g., "Hello"'
        )
        .setRequired(true)
    )

    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription(
          `The prompt to add additional details. e.g., "spikes, flames, oil, gradient background"`
        )
    ),
  async execute(interaction) {
    let prompt = interaction.options.getString("prompt");

    const text = interaction.options.getString("text");

    const prompts = [`spikes, flames, oil, gradient background`];

    if (prompt == null) {
      prompt = prompts[Math.floor(Math.random() * prompts.length)];
    }
    prompt = `("${text}" text logo:1.5), ${prompt} <lora:dvr-ftl:0.5>`;

    const embed = new EmbedBuilder().setDescription(
      `/textlogo \`text:${text}\` \`prompt:${prompt}\`\n\nGenerating...`
    );

    await interaction.reply({ ephemeral: false, embeds: [embed] });

    const input = {
      baseModel: "SDXL",
      model: "urn:air:sdxl:checkpoint:civitai:119229@362861",
      params: {
        prompt: prompt,
        negativePrompt:
          "gaussian noise, worst quality, lowres, oversaturated, undersaturated, overexposed, underexposed, grayscale, bw, bad photo, bad photography, bad art, blur, blurry, grainy, morbid, ugly, asymmetrical, mutated, malformed, mutilated, poorly lit, bad shadow, draft, cropped, out of frame, cut off, censored, jpeg artifacts, out of focus, glitch, duplicate, pixelated, soft focus, color fringing, overprocessed, oversharpened",
        scheduler: "DPMSDEKarras",
        steps: 30,
        cfgScale: 7,
        width: 1024,
        height: 1024,
        clipSkip: 2,
      },
      additionalNetworks: {
        "urn:air:sdxl:lora:civitai:345941@387163": {
          type: AssetType.LORA,
          strength: 0.8,
        },
      },
    };

    let imgUrl;

    try {
      const result = await civitai.image.fromText(input);
      const jobId = result.jobs[0].jobId;

      imgUrl = await new Promise((resolve, reject) => {
        let timeout1;

        const intervalId = setInterval(async () => {
          const res2 = await civitai.jobs.getById(jobId);
          console.log("status: ", res2);
          if (res2.result.available) {
            clearInterval(intervalId);
            clearTimeout(timeout1);
            resolve(res2.result.blobUrl);
          }
        }, 2000);

        timeout1 = setTimeout(async () => {
          clearInterval(intervalId);

        await interaction.editReply({
            content: "Image generation timed out. Please try again."
        })

          reject();
        }, 1000 * 60 * 10); // 10 min
      });

      const att = new AttachmentBuilder()
        .setFile(imgUrl)
        .setName("image.jpeg");

      await interaction.editReply({
        content: `<@${interaction.user.id}> /textlogo \`${prompt}\``,
        files: [att],
        ephemeral: false,
        fetchReply: true,
        embeds: [],
      });
    } catch (err) {
      console.log(err);
    }
  },
};
