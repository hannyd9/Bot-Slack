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

(async () => {
  await app.start();  
  console.log("bot is running!");
})();