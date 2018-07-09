const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-994398.oktapreview.com',
  token: '00j6_XN4I4v3CpVaUi4SVAyMK0B54-6o9TptxCTJMp'
});

module.exports = client;