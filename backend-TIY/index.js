const express = require('express');//returns a function object.

const app = express();
//express.json() create a middleware which then be used by our app.
app.use(express.json());

const fs = require('fs');
var key = fs.readFileSync('encryption/tiy.key');
var cert = fs.readFileSync( 'encryption/tiy.crt');
var options = {
  key: key,
  cert: cert
};
var https = require('https');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
//also this scope defines what you want to use like 
//in our case only gmail send so
//const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

let credentials;
// Load client secrets from a local file.
fs.readFile('./credentials/credentials.json', (err, content) => {
    console.log('======================================');
    console.log('Entered.. readFile');
    if (err) return console.log('Error loading client secret file:', err);

    // Authorize a client with credentials, then call the Gmail API.
    //authorize(JSON.parse(content), sendMessage);
    //console.log(JSON.parse(content));
    credentials = JSON.parse(content);
     console.log('Exit readFile');
     console.log('======================================');
});


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, to,from,sub,msg,callback) {
    console.log('======================================');
    console.log('Entered authorize 2 params');
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, to,from,sub,msg, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        console.log('read oAuth2Client',oAuth2Client);
        callback(oAuth2Client, to,from,sub,msg);
    });
    console.log('Exit authorize 2 params');
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client,to,from,sub,msg,callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client, to,from,sub,msg);
        });
    });
}

function makeBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
}

function sendMessage(auth, to, from, sub, msg) {
    var raw = makeBody(to, from, sub, msg);
    const gmail = google.gmail({ version: 'v1', auth });
    console.log('======================================');
    console.log('==auth==',auth);
    console.log('to',to);
    console.log('from:',from);
    console.log('sub:',sub);
    console.log('msg:',msg);
    gmail.users.messages.send({
        auth: auth,
        userId: 'me',
        resource: {
            raw: raw
        }
    }, function (err, response) {
        if (err) return console.log('The API returned an error: ' + err);
        else {
            // console.log(response);
        }

    });
    console.log('======================================');
}

app.post('/api/contactus', (req, res) => {

    //in order to below line (req.body.emailid) work
    //we need to enable the parsing of json object which is by default false
    //to do that we will add app.use(express.json()) 
    const id = req.body.emailid;
    const name = req.body.name;
    const sub = req.body.sub;
    const msg = req.body.msg;

    
    
    let from='travelparts1@gmail.com';
    let to=id;
    authorize(credentials,to,from,sub,msg,sendMessage);
    //sendMessage(auth, 'travelparts1@gmail.com', 'kapilnakhasi@gmail.com', su, msg);
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


const port = process.env.PORT || 6443;
//on command write 
//set PORT=4001
//on linux export PORT=4001
var server = https.createServer(options,app);
server.listen(port, () => console.log(`Listing on port ${port}...`));

//app.listen(port, () => console.log(`Listing on port ${port}...`));