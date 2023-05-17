const express = require('express');
const app = express();

// Serve the HTML template
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API endpoint to fetch events
app.get('/events', async (req, res) => {
  try {
    const auth = await authorize();
    const events = await listEvents(auth);
    res.json(events);
  } catch (err) {
    console.error('Error retrieving events:', err);
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
