await axios.post('https://api.line.me/v2/bot/message/reply', {
  replyToken: event.replyToken,
  messages: [
    {
      type: 'text',
      text: "บัดนี้ตั้มยังติดภารกิจอยู่ มิอาจตอบสารได้ในเพลานี้ ขอท่านโปรดรอสักครู่เถิด 🙏"
    }
  ]
}, {
  headers: {
    'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});
