const { SlashCommandBuilder } = require("discord.js");
const { ButtonBuilder } = require("discord.js");
const { AttachmentBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonStyle } = require("discord.js");
const { Civitai } = require("civitai");
const civitai = new Civitai({
  auth: require("../../config.json").civitai_api_key,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate")
    .setDescription(
      "Generate a Stable Diffusion image using the Civitai generator!"
    )

    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("The prompt to use for the image. (SDXL)")
        .setRequired(true)
    )

    .addStringOption((option) =>
      option
        .setName("checkpoint")
        .setDescription("The SDXL checkpoint to use. (default = Juggernaut XL)")
        .addChoices(
          {
            name: "Juggernaut XL",
            value: "Juggernaut XL",
          },
          {
            name: "SDXL Unstable Diffusers YamerMIX",
            value: "SDXL Unstable Diffusers YamerMIX",
          },
          {
            name: "RealCartoon-XL",
            value: "RealCartoon-XL",
          },
          {
            name: "ZavyChromaXL",
            value: "ZavyChromaXL",
          },
          {
            name: "NightVisionXL",
            value: "NightVisionXL",
          }
        )
    )

    .addStringOption((option) =>
      option
        .setName("negative-prompt")
        .setDescription("The negative prompt to use for the image.")
    )

    .addStringOption((option) =>
      option
        .setName("resolution")
        .setDescription("The resolution to use. (default = 1024x1024)")
        .addChoices(
          {
            name: "1024x1024",
            value: "1024x1024",
          },
          {
            name: "1152x896",
            value: "1152x896",
          },
          {
            name: "1536x640",
            value: "1536x640",
          },
          {
            name: "640x1536",
            value: "640x1536",
          }
        )
    )

    .addStringOption((option) =>
      option
        .setName("sampler")
        .setDescription("The sampler to use. (default = EULER_A)")
        .addChoices(
          { name: "EULER_A", value: "EulerA" },
          { name: "EULER", value: "Euler" },
          { name: "LMS", value: "LMS" },
          { name: "HEUN", value: "Heun" },
          { name: "DPM2", value: "DPM2" },
          { name: "DPM2A", value: "DPM2A" },
          { name: "DPM2SA", value: "DPM2SA" },
          { name: "DPM2M", value: "DPM2M" },
          { name: "DPMSDE", value: "DPMSDE" },
          { name: "DPMFAST", value: "DPMFast" },
          { name: "DPMADAPTIVE", value: "DPMAdaptive" },
          { name: "LMSKARRAS", value: "LMSKarras" },
          { name: "DPM2KARRAS", value: "DPM2Karras" },
          { name: "DPM2AKARRAS", value: "DPM2AKarras" },
          { name: "DPM2SAKARRAS", value: "DPM2SAKarras" },
          { name: "DPM2MKARRAS", value: "DPM2MKarras" },
          { name: "DPMSDEKARRAS", value: "DPMSDEKarras" },
          { name: "DDIM", value: "DDIM" },
          { name: "PLMS", value: "PLMS" },
          { name: "UNI_PC", value: "UniPC" },
          { name: "LCM", value: "LCM" },
          { name: "DDPM", value: "DDPM" },
          { name: "DEIS", value: "DEIS" }
        )
    )

    .addNumberOption((option) =>
      option
        .setName("clipskip")
        .setDescription("The clip skip to use. (default = 1)")
        .addChoices(
          { name: "1", value: 1 },
          { name: "2", value: 2 },
          { name: "3", value: 3 },
          { name: "4", value: 4 },
          { name: "5", value: 5 },
          { name: "6", value: 6 },
          { name: "7", value: 7 },
          { name: "8", value: 8 },
          { name: "9", value: 9 },
          { name: "10", value: 10 },
          { name: "11", value: 11 },
          { name: "12", value: 12 }
        )
    )

    .addNumberOption((option) =>
      option
        .setName("steps")
        .setDescription("The amount of steps to use. (default = 20)")
    )

    .addNumberOption((option) =>
      option.setName("cfg").setDescription("The cfg to use. (default = 7)")
    )

    .addNumberOption((option) =>
      option.setName("seed").setDescription("The seed to use. (default = 1)")
    ),
  async execute(interaction) {
    let checkpoints = [
      {
        name: "Juggernaut XL",
        air: "urn:air:sdxl:checkpoint:civitai:133005@357609",
      },
      {
        name: "SDXL Unstable Diffusers YamerMIX",
        air: "urn:air:sdxl:checkpoint:civitai:84040@395107",
      },
      {
        name: "RealCartoon-XL",
        air: "urn:air:sdxl:checkpoint:civitai:125907@254091",
      },
      {
        name: "ZavyChromaXL",
        air: "urn:air:sdxl:checkpoint:civitai:119229@362861",
      },
      {
        name: "NightVisionXL",
        air: "urn:air:sdxl:checkpoint:civitai:128607@343830",
      },
    ];

    const checkpoint =
      checkpoints.find(
        (c) => c.name == interaction.options.getString("checkpoint")
      ) || checkpoints[0];

    const prompt = interaction.options.getString("prompt");
    const negativePrompt = interaction.options.getString("negative-prompt");
    const resolution =
      interaction.options.getString("resolution") || "1024x1024";
    const clipskip = interaction.options.getNumber("clipskip") || 2;
    const steps = interaction.options.getNumber("steps") || 20;

    let cfg;
    if (checkpoint.name == "Juggernaut XL") {
      cfg = interaction.options.getNumber("cfg") || 4;
    } else if (checkpoint.name == "NightVisionXL") {
      cfg = interaction.options.getNumber("cfg") || 3.5;
    } else {
      cfg = interaction.options.getNumber("cfg") || 7;
    }

    const seed =
      interaction.options.getNumber("seed") ||
      Math.floor(Math.random() * (100000000 - 100 + 1)) + 100;
    const sampler = interaction.options.getString("sampler") || "EulerA";

    const input = {
      baseModel: "SDXL",
      model: checkpoint.air,
      params: {
        prompt: prompt,
        negativePrompt: negativePrompt || " ",
        scheduler: sampler,
        steps: steps,
        cfgScale: cfg,
        width: Number(resolution.split("x")[0]),
        height: Number(resolution.split("x")[1]),
        clipSkip: clipskip,
        seed: seed,
      },
    };

    try {
      await interaction.reply({
        content: `
              <@${interaction.user.id}> \`prompt: ${prompt} ${
          negativePrompt !== null ? "negative prompt: " + negativePrompt : ""
        } resolution: ${resolution} checkpoint: ${
          checkpoint.name
        } clipskip: ${clipskip} steps: ${steps} cfg: ${cfg} seed: ${seed} sampler: ${sampler}\`\n\ngenerating image...`,
        fetchReply: true,
      });

      const result = await civitai.image.fromText(input);
      const jobId = result.jobs[0].jobId;

      const imgUrl = await new Promise((resolve, reject) => {
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

      const att = new AttachmentBuilder().setFile(imgUrl).setName("image.jpeg");

      await interaction.editReply({
        content: `<@${interaction.user.id}> \`prompt: ${prompt} ${
          negativePrompt !== null ? "negative prompt: " + negativePrompt : ""
        } resolution: ${resolution} checkpoint: ${
          checkpoint.name
        } clipskip: ${clipskip} steps: ${steps} cfg: ${cfg} seed: ${seed} sampler: ${sampler}\``,
        files: [att],
        fetchReply: true,
      });
    } catch (err) {
      console.log(err);
      return;
    }
  },
};
