NPM(Node Package Manager)
Asynchronous Javascript{callbacks,promises,asynchronous wait}
CruD operation
Data validation	 
Authentication and Authorization using json web token including role management
handling and logging errors	
unit and integration testing
Test driven development
deployed to cloud

Clean coding and refactoring
Security Best Practices 
Useful libraries
common mistakes that developers make 	

path module:https://alligator.io/nodejs/intro-to-path-module/
compression func:https://alligator.io/nodejs/compression/
crud opreations: https://alligator.io/nodejs/crud-operations-mongoose-mongodb-atlas/
https://alligator.io/nodejs/express-routing/
https://alligator.io/js/async-functions/
https://alligator.io/js/promises-es6/


npm init --yes{to create package.json}
npm i express{install express}
node index.js {to start an application}


//sometimes this is annoying to restart server again and again on making some changes in code
//to work around on this we install module called nodemom{node monitor}
npm i -g nodemon   // here i is install and -g is global so that we can use it globally	{run this nodemon anywhere}
//so onces install we can run our application with nodemon
nodemon index.js

npm install bcryptjs --save

npm install openssl //to run server securely https://www.namecheap.com/support/knowledgebase/article.aspx/9641/67/how-to-put-domain-correctly-in-csr Explaination
CSR stands for Certificate Signing Request,
openssl req -nodes -newkey rsa:2048 -keyout tiy.key -out tiy.csr
openssl.exe x509 -req -in tiy.csr -signkey tiy.key -out tiy.crt

npm install jsonwebtoken --save
npm install cookie-parser --save

To start an mongo db: https://www.youtube.com/watch?v=pWbMrx5rVBE
1.	 Go to bin folder of mongo db which is in c drive of program files folder
2.	Cmd:mongod –directoryperdb  --dbpath E:\MongoDB\Server\4.0\data\db –logpath E:\MongoDB\Server\4.0\log\mongo.log  --logappend --rest --install 
3.	net start MongoDB
4.	mongo
5.	>cls
6.	Show dbs shows database
7.	use <db -name>
8.	db  shows database

need to set env variables in project:
process.env.LOG_LEVEL = prod|dev
process.env.PORT

const port = process.env.PORT || 3000;
//on command write 
//set PORT=4001
//on linux export PORT=4001

process.env.TIY_ENV === 'prod'

set TIY_ENV=prod
set LOG_LEVEL=prod

linux 
export TIY_ENV=prod
export LOG_LEVEL=prod



installed npm install winston morgan --save -->https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#file-transport |
https://github.com/winstonjs/winston/blob/HEAD/docs/transports.md#winston-core | https://www.npmjs.com/package/winston
http://www.jyotman.xyz/post/logging-in-node.js-done-right
https://www.loggly.com/ultimate-guide/node-logging-basics/


installed npm install winston-daily-rotate-file -->https://github.com/winstonjs/winston-daily-rotate-file




NPM(Node Package Manager)
Asynchronous Javascript{callbacks,promises,asynchronous wait}
CruD operation
Data validation	 
Authentication and Authorization using json web token including role management
handling and logging errors	
unit and integration testing
Test driven development
deployed to cloud

Clean coding and refactoring
Security Best Practices 
Useful libraries
common mistakes that developers make 	

npm init --yes{to create package.json}
npm i express{install express}
node index.js {to start an application}


//sometimes this is annoying to restart server again and again on making some changes in code
//to work around on this we install module called nodemom{node monitor}
npm i -g nodemon   // here i is install and -g is global so that we can use it globally	{run this nodemon anywhere}
//so onces install we can run our application with nodemon
nodemon index.js

//to integrate gmail 


Country Name (2 letter code) [AU]:IN
State or Province Name (full name) [Some-State]:utter pradesh
Locality Name (eg, city) []:noida
Organization Name (eg, company) [Internet Widgits Pty Ltd]:self
Organizational Unit Name (eg, section) []:nerd

password:test
https://www.npmjs.com/package/node-openssl-cert


#########################
to resize install sharp
npm install sharp
npm install uuid

npm install uuid multer sharp --save

server details
bitnami@ip-172-26-15-53:~/TIY/backend-TIY$ 
bitnami@ip-172-26-15-53:~/TIY/backend-TIY$ node -v
v8.15.1
bitnami@ip-172-26-15-53:~/TIY/backend-TIY$ npm -v
6.4.1

local server details
E:\TIY\TIY\backend-TIY>node -v
v10.16.0

E:\TIY\TIY\backend-TIY>npm -v
6.9.0

