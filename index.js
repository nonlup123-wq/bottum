const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  for (let event of events) {
    if (event.type === 'message') {
      await axios.post('https://api.line.me/v2/bot/message/reply', {
        replyToken: event.replyToken,
        messages: [
          {
            type: 'text',
            text: 'บัดนี้ตั้มยังติดภารกิจอยู่
มิอาจตอบสารได้ในเพลานี้
ขอท่านโปรดรอสักครู่เถิด 🙏
'
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
    }
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Bot is running');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
