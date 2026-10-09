require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

const answers = [
    "Absolutely!",
    "No way!",
    "Maybe, who knows?",
    "Definitely not.",
    "My sources say yes.",
    "Ask again later.",
    "The universe says no.",
    "Without a doubt.",
    "If you want it, it will happen.",
    "I have no idea.",
    "The stars say maybe.",
    "Don't count on it.",
    "You will find out soon.",
    "The answer is unclear.",
    "All roads lead to Rome..."
];

app.command("/8ball-ping", async ({ command, ack, respond }) => {
  await ack();
  const question = command.text;
  const answer = answers[Math.floor(Math.random() * answers.length)];

  if (!question) {
    await respond({ text: "Ask me something!" });
    return;
}

await respond({ text: answer, response_type: "in_channel" });

});

app.command("/hrandom-number", async ({ ack, respond }) => {
  await ack();
  const n = Math.floor(Math.random() * 100) + 1;
  await respond({ text: `Here's your random number: ${n}`, response_type: "in_channel" });
});

app.command("/hrandom-color", async ({ ack, respond }) => {
  await ack();
  const hex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
  await respond({
    response_type: "in_channel",
    attachments: [{color: hex, text: `Here's your random color: ${hex}`}]
  });
});


(async () => {
  await app.start();  
  console.log("bot is running!");
})();