const express = require("express");
const line = require("@line/bot-sdk");

const app = express();

// สำคัญ
app.use(express.json());

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
      console.error(err);
      res.status(500).end();
    });
});

// ฟังก์ชันแปลงคำให้เป็นโบราณ
function oldThaiStyle(text) {
  return `คุณท่านกล่าวว่า: "${text}" ข้าน้อยรับทราบแล้วขอรับ 🙇‍♂️`;
}

// handle event
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const userText = event.message.text;

  let replyText = "";

  if (userText === "สวัสดี") {
    replyText = "สวัสดีคุณท่าน ข้าน้อยยินดีรับใช้เพลานี้ 🙇‍♂️";
  } 
  else if (userText === "ทำไรอยู่") {
    replyText = "ข้าน้อยกำลังรอรับบัญชาจากคุณท่านอยู่เพลานี้";
  } 
  else if (userText === "ไปไหน") {
    replyText = "ข้าน้อยจักไปยังที่ซึ่งคุณท่านประสงค์ขอรับ";
  } 
  else {
    replyText = oldThaiStyle(userText);
  }

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
