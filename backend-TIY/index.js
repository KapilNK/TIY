const express = require('express');//returns a function object.

const app = express();
//express.json() create a middleware which then be used by our app.
app.use(express.json());

const fs = require('fs');
const readLine = require('readline');
const google = require('googleapis');

// If modifying these scopes, delete token.json.
//also this scope defines what you want to use like 
//in our case only gmail send so
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('./credentials/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), listLabels);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }


app.post('/api/contactus', (req, res) => {

    //in order to below line (req.body.emailid) work
    //we need to enable the parsing of json object which is by default false
    //to do that we will add app.use(express.json()) 
    const id = req.body.emailid;
    const name = req.body.name;
    const sub = req.body.sub;
    const msg = req.body.msg;
    res.send(`Got Your Message with id:${id}`);


});

// app.get('/api/contactus/:id',(req,res)=>{
// res.send(req.params.id);
// });

// //oR
// app.get('/api/contactus/:year/:month',(req,res)=>{
//     res.send(req.params);
//     //{
// //      year: "2018",
// //      month: "1"
//     //}
//     res.send(req.query);
//     //{sortBy:  "name"}
//     //res.status(404).send('No api found');

//     });


const port = process.env.PORT || 3000;
//on command write 
//set PORT=4001
//on linux export PORT=4001
app.listen(port, () => console.log(`Listing on port ${port}...`));