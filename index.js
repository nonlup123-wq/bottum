const express = require("express");
const line = require("@line/bot-sdk");

const app = express();
app.use(express.json()); // 🔥 สำคัญมาก (กันพัง 500)

// config จาก Render (ENV)
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

// webhook
app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.status(200).end())
    .catch((err) => {
      console.log("ERROR:", err);
      res.status(500).end();
    });
});

// function ตอบข้อความ
async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const userText = event.message.text;

  // 👑 เปลี่ยนสไตล์ตรงนี้ได้
  const replyText = `คุณท่านกล่าวว่า "${userText}" เพลานี้ข้าน้อยรับทราบแล้ว 🙇‍♂️`;

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: replyText,
  });
}

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running 🔥");
});
