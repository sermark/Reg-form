const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-994398.oktapreview.com',
  token: '00wlFvWSYKQBWswugxaO0QGOnFpkyd6LyqmYt6LVH_'
});

module.exports = client;