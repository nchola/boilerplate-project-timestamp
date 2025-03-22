const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;

  // Handle empty date parameter (return current time)
  if (!dateString) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Check for Unix timestamp (numeric string)
  if (/^\d+$/.test(dateString)) {
    dateString = parseInt(dateString);
  }

  const date = new Date(dateString);

  // Handle invalid dates
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return successful response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});