var wdio = require("webdriverio");
var GoogleSpreadsheet = require("google-spreadsheet");
// Insert the ID to the Google Spreadsheet. Must have "To" and "From" columns
// and be "Published to Web" on Google Drive.
var my_sheet = new GoogleSpreadsheet('');
var _ = require('lodash');
// Insert your Read the Docs URL.
var targetUrl = 'https://readthedocs.org/dashboard/kalabox-documentation/redirects/';
// Insert Read the Docs creds.
var creds = {username: '', password: ''};
var Promise = require('bluebird');

executeRedirects();

function prepBrowser() {
  var options = {
    desiredCapabilities: {
        browserName: "chrome"
    }
  };
  var browser = wdio.remote(options);
  return browser;
}

// Create key/value pairs of from/to URLs for the redirects.
function retrieveRedirects() {
  var redirects = [];
  return new Promise(function(resolve, reject) {
    my_sheet.getRows(1, function( err, rows ){
      resolve(rows);
    });
  });
}

// Drive the browser to insert a single redirect.
function insertRedirect(browser, redirect) {
  return new Promise(function(resolve, reject) {
    browser.selectByValue('#id_redirect_type', 'exact')
    .waitForExist('#id_from_url')
    .setValue('#id_from_url', redirect.from)
    .setValue('#id_to_url', redirect.to)
    .click('input[value=Submit]')
    .pause(5000).then(function() {
      resolve();
    });
    console.log(redirect.from, redirect.to);
  });
}

// Create all the redirects in the Google Spreadsheet.
function executeRedirects() {
  var browser = prepBrowser();
  browser.init().url('https://readthedocs.org/accounts/login/')
    .setValue('#id_login', creds.username)
    .setValue('#id_password', creds.password)
    .click('button.primaryAction')
    .url(targetUrl)
    .then(function() {
      retrieveRedirects().each(function(redirect) {
        return insertRedirect(browser, redirect);
      });
    });

}