const { google } = require('googleapis');

// Create an OAuth2 client
const authClient = new google.auth.OAuth2(
 1060639358041-qgs6mm6on5485nl3u7h75m7g0h06ekj2.apps.googleusercontent.com,
 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,
 https://nodejs-serverless-function-express3.vercel.app
);

// Authorize the client
const authUrl = authClient.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar.readonly'],
});

// Use the authUrl to obtain an authorization code and exchange it for a token

// Use the token to authenticate requests and retrieve events from the Calendar API
const calendar = google.calendar({ version: 'v3', auth: authClient });

calendar.events.list(
  {
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  },
  (err, res) => {
    if (err) return console.error('The API returned an error:', err.message);

    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming events:');
      events.forEach((event) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  }
);
