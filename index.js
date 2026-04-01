const express = require("express");
const line = require("@line/bot-sdk");

const app = express();

// สำคัญมาก
app.use(express.json());

// config จาก ENV
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// สร้าง client
const client = new line.Client(config);

// webhook
app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.status(200).end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// ฟังก์ชันตอบข้อความ
function handleEvent(event) {
  // ถ้าไม่ใช่ข้อความ → ไม่ต้องทำอะไร
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const userText = event.message.text;

  let replyText = "";

  // ตั้งนิสัยบอทได้ตรงนี้
  if (userText === "สวัสดี") {
    replyText = "สวัสดีครับบบ 😎";
  } else if (userText === "ทำไรอยู่") {
    replyText = "รอคุยกับคุณอยู่นี่แหละ 🔥";
  } else {
    replyText = "มึงพิมพ์ว่า: " + userText;
  }

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: replyText,
  });
}

// เปิด server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running 🔥");
});
