// FILEPATH: /home/him/ai-art-discord-bot/test/utility/generate.test.js
const {
  execute,
} = require("../../src/commands/generate");
const { Civitai } = require("civitai");

jest.mock("civitai", () => {
  return {
    Civitai: jest.fn().mockImplementation(() => {
      return {
        image: {
          fromText: jest.fn().mockResolvedValue({ jobs: [{ jobId: "123" }] }),
        },
        jobs: {
          getById: jest
            .fn()
            .mockResolvedValue({ result: { available: false } }),
        },
      };
    }),
  };
});

const chatInputCommandInteraction = {
  type: 2,
  id: "1234968305903865938",
  applicationId: "1234841739991187456",
  channelId: "1193223722899886192",
  guildId: "1193223722128121977",
  user: {
    id: "654433388869976085",
    bot: false,
    system: false,
    flags: null,
    username: "eerop.",
    globalName: "eerop",
    discriminator: "0",
    avatar: "643a427288b5ec661a7d2dc1fb0a0524",
    banner: null,
    accentColor: null,
    avatarDecoration: null,
  },
  member: {
    guild: {
      id: "1193223722128121977",
      name: "AI Art Games",
      icon: null,
      features: [],
      commands: [],
      members: [],
      channels: [],
      bans: [],
      roles: [],
      presences: {},
      voiceStates: [],
      stageInstances: [],
      invites: [],
      scheduledEvents: [],
      autoModerationRules: [],
      available: true,
      shardId: 0,
      splash: null,
      banner: null,
      description: null,
      verificationLevel: 1,
      vanityURLCode: null,
      nsfwLevel: 0,
      premiumSubscriptionCount: 0,
      discoverySplash: null,
      memberCount: 11,
      large: false,
      premiumProgressBarEnabled: false,
      applicationId: null,
      afkTimeout: 300,
      afkChannelId: null,
      systemChannelId: "1193223722899886192",
      premiumTier: 0,
      widgetEnabled: null,
      widgetChannelId: null,
      explicitContentFilter: 2,
      mfaLevel: 0,
      joinedTimestamp: 1714480581386,
      defaultMessageNotifications: 1,
      systemChannelFlags: [],
      maximumMembers: 500000,
      maximumPresences: null,
      maxVideoChannelUsers: 25,
      maxStageVideoChannelUsers: 50,
      approximateMemberCount: null,
      approximatePresenceCount: null,
      vanityURLUses: null,
      rulesChannelId: "1217628660358713404",
      publicUpdatesChannelId: "1217628660358713406",
      preferredLocale: "en-US",
      safetyAlertsChannelId: null,
      ownerId: "654433388869976085",
      emojis: [],
      stickers: [],
    },
    joinedTimestamp: 1704557104411,
    premiumSinceTimestamp: null,
    nickname: null,
    pending: false,
    communicationDisabledUntilTimestamp: null,
    user: {
      id: "654433388869976085",
      bot: false,
      system: false,
      flags: null,
      username: "eerop.",
      globalName: "eerop",
      discriminator: "0",
      avatar: "643a427288b5ec661a7d2dc1fb0a0524",
      banner: null,
      accentColor: null,
      avatarDecoration: null,
    },
    avatar: null,
    flags: 0,
  },
  version: 1,
  appPermissions: { bitfield: 1096185279792705n },
  memberPermissions: { bitfield: 1125899906842623n },
  locale: "en-GB",
  guildLocale: "en-US",
  commandId: "1234846572865523822",
  commandName: "generate",
  commandType: 1,
  commandGuildId: null,
  deferred: false,
  replied: false,
  ephemeral: null,
  webhook: { id: "1234841739991187456" },
  options: {
    getNumber: (parameter) => {
      if (parameter === "clipskip") {
        return 2;
      } else if (parameter === "steps") {
        return 20;
      } else if (parameter === "cfg") {
        return 4;
      } else if (parameter === "seed") {
        return 82837009;
      }
    },
    getString: (parameter) => {
      if (parameter === "checkpoint") {
        return "Juggernaut XL";
      } else if (parameter === "prompt") {
        return "s";
      } else if (parameter === "negative-prompt") {
        return " ";
      } else if (parameter === "resolution") {
        return "1024x1024";
      } else if (parameter === "clipskip") {
        return 2;
      } else if (parameter === "steps") {
        return 20;
      } else if (parameter === "cfg") {
        return 4;
      } else if (parameter === "seed") {
        return 82837009;
      } else if (parameter === "sampler") {
        return "EulerA";
      }
    },
    _group: null,
    _subcommand: null,
    _hoistedOptions: [
      {
        $type: "textToImage",
        baseModel: "SDXL",
        model: "urn:air:sdxl:checkpoint:civitai:133005@357609",
        params: {
          prompt: "s",
          negativePrompt: " ",
          scheduler: "EulerA",
          steps: 20,
          cfgScale: 4,
          width: 1024,
          height: 1024,
          clipSkip: 2,
          seed: 82837009,
        },
      },
    ],
  },
  reply: async () => {
    return true;
  },
  followUp: () => {},
  editReply: () => {},
  deleteReply: () => {},
};

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("generate command", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should timeout after 10 minutes", async () => {
    try {
      const promise = execute(chatInputCommandInteraction);

      console.log(promise);

      await jest.advanceTimersByTimeAsync(1000 * 60 * 10); // Advance timers by 10 minutes

      res = await promise;

    } catch (err) {
      console.log(err);

      expect(res).toBe("timeout");
    }
  });

});









