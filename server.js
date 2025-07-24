const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const app = express();
app.use(cors());
app.use(express.json());

app.post('/claim', async (req, res) => {
  const { address } = req.body;
  const url = `https://faucet.testnet.ice.io/frost-send/${address}`;

  try {
    const faucetRes = await fetch(url);
    const data = await faucetRes.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Proxy sunucu çalışıyor: http://localhost:3000');
});
