const express = require("express");
const line = require("@line/bot-sdk");

const app = express();

const config = {
  channelAccessToken: "ใส่ TOKEN ตรงนี้",
  channelSecret: "ใส่ SECRET ตรงนี้",
};

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: "สวัสดี นี่คือบอทของตั้ม 🤖",
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running 🔥");
});

 
