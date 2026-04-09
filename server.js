const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get('/', (req, res) => {
  res.send('Telegram landing backend running');
});

app.post('/send', async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ ok: false, message: 'invalid input' });
  }

  const text = `📩 상담 신청\n이름: ${name}\n연락처: ${phone}`;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error('Telegram send error:', error.response?.data || error.message);
    return res.status(500).json({ ok: false, message: 'telegram send failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});