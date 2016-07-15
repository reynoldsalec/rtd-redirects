# Insert Read the Docs Redirects

This automates creation of "Exact Redirects" on Read the Docs from a source
Google Spreadsheet using WebdriverIO.

Since this was a PoC one-off for me to play with WebdriverIO, there is no prompt
and you'll need to edit values in index.js to get this working.

## Usage

1. Install selenium-standalone:

```
npm install selenium-standalone@latest -g
selenium-standalone install
```

2. Run selenium-standalone server:

`selenium-standalone start`

1. Insert the ID to the Google Spreadsheet into index.js. Note that your
spreadsheet must have "To" and "From" columns and be "Published to Web" on
Google Drive.

2. Insert your Read the Docs URL into index.js.

3. Insert your Read the Docs creds into index.js.

4. Run the script:

`node index.js`
