const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint utama
app.get("/api/:date?", (req, res) => {
  let input = req.params.date;
  let date;

  if (!input) {
    date = new Date();
  } else {
    input = isNaN(input) ? input : parseInt(input);
    date = new Date(input);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});