const express = require("express");
const line = require("@line/bot-sdk");

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

// รับ webhook จาก LINE
app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.status(200).end())
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const replyText = "บอททำงานแล้ว 🔥";

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: replyText,
  });
}

// เปิด server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running");
});

