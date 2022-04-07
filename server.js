const express     = require('express')
const app         = express()
const fs          = require('fs');
const path        = require('path');
const util        = require('util');
const MongoClient = require('mongodb').MongoClient;
let bodyParser    = require('body-parser');
const nodemailer  = require('nodemailer');
const { getMaxListeners } = require('process');
const dotenv      = require('dotenv');
const oauth2      = require('googleapis');

dotenv.config();


const CLIENT_ID = '1029265838911-puufht5qdi91rmg83g014cc4aj96u47s.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04CuXsf3gi8tiCgYIARAAGAQSNwF-L9IrG8avR49udmxfkqMb70FfI0pMG6tc6kIMZtxViZmYv2zE2KYeZbhVFh7G2sEWbiDw7Zo';

const oAuth2Client = new oauth2.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendMail(){
    try {
      const accessToken = await oAuth2Client.getAccessToken()

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'doc.vik1910@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken
        }
      })

      const mailOptions = {
        from: 'DOCVIK <doc.vik1910@gmail.com>',
        to: 'ic.okbshs@gmail.com',
        subject: 'Hello VIK',
        text: 'Hello from vik',
        html: '<h1>Hello doc.VIK</h1>'
      }

      const result = await transport.sendMail(mailOptions);
      return result;

    } catch (error) {
      return error
    }
}

sendMail().then(result => console.log('Email sent', result))
.catch(error => console.log(error.message))
/*
"access_token": "ya29.A0ARrdaM866btz5pIxRtkg5IF6keZJFL0BcgI0J7mzl_5Ew3GIVQkBaJp47-MB6YO912MUbJk17mYotM3I40rP-Lqxd4__i3kkIyOF0os917ESaxtsoovxubWLS9Rpy3K0IwsDIXenZPLCYCD48X2vT1CYDsea", 
"scope": "https://mail.google.com/", 
"token_type": "Bearer", 
"expires_in": 3599, 
"refresh_token": "1//04CuXsf3gi8tiCgYIARAAGAQSNwF-L9IrG8avR49udmxfkqMb70FfI0pMG6tc6kIMZtxViZmYv2zE2KYeZbhVFh7G2sEWbiDw7Zo"
}

Client ID
1029265838911-puufht5qdi91rmg83g014cc4aj96u47s.apps.googleusercontent.com
Client secret
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
*/

const port = 80; //8000 80

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static('./build'))

// Connection URL
//const url = 'mongodb://localhost';
const url = 'mongodb://127.0.0.1:27017';
let db;

// Database Name
const dbName = 'TESTS';
const client = new MongoClient(url);

let path_text_audio = null; // path to text audio file

//time
let current_time = new Date();

// Use connect method to connect to the server
client.connect(function(err){
  if(err) {
    console.log(err);
    return;
  } else {
    console.log("Connected successfully to server");
    db = client.db(dbName);
  }
});

app.get('/home',(req,res) => {
  res.send({'_id': 1,'name': '333','phrases': ['444']});
});


app.get('/getGreatings',(req,res) => {
  //Get the documents of the collection
  
  const collection = db.collection('Greatings');
  
  //Find some documents
  collection.find().toArray(function(err,phrases){
    if(err) {
      console.log(err);
      return;
    } else {
      res.json(phrases);
    }
  })
  
});


app.get('/getPhrasalVerbs',(req,res) => {
  //Get the documents of the collection
  const collection = db.collection('PhrasalVerbs');
  //Find some documents
  collection.find().toArray(function(err,phrases){
    if(err) {
      console.log(err);
      return;
    } else {
      res.json(phrases);
    }
  })
});


app.get('/getJokes',(req,res) => {
  //Get the documents of the collection
  const collection = db.collection('Jokes');
  //Find some documents
  collection.find().toArray(function(err,phrases){
    if(err) {
      console.log(err);
      return;
    } else {
      res.json(phrases);
    }
  })
});


app.get('/getPresentation',(req,res) => {
  //Get the documents of the collection
  const collection = db.collection('Presentation');
  //Find some documents
  collection.find().toArray(function(err,phrases){
    if(err) {
      console.log(err);
      return;
    } else {
      res.json(phrases);
    }
  })
});


app.get('/getSpring',(req,res) => {
  //Get the documents of the collection
  const collection = db.collection('Spring');
  //Find some documents
  collection.find().toArray(function(err,phrases){
    if(err) {
      console.log(err);
      return;
    } else {
      res.json(phrases);
    }
  })
});



app.get('/getVacation',(req,res) => {
  //Get the documents of the collection
  const collection = db.collection('Vacation');
  //Find some documents
  collection.find().toArray(function(err,phrases){
    if(err) {
      console.log(err);
      return;
    } else {
      res.json(phrases);
    }
  })
});


app.get('/getStatistics',(req,res) => {
  //Get the documents of the collection
  const collection = db.collection('Statistics');
  //Find some documents
  collection.find().toArray(function(err,phrases){
    if(err) {
      console.log(err);
      return;
    } else {
      res.json(phrases);
    }
  })
});


app.post('/Statistics',(req,res) => {
  //Get the documents of the collection
//console.log('server: /Statistics: req.ip=', req.ip);  
  const collection = db.collection('Statistics');
  //Find some documents  
//console.log('server: /Statistics: collection=', collection);    
//console.log('server: /Statistics: collection.count()=', collection.count());    

  if(collection) {
    let el = {"tests": req.body.tests, "words": req.body.words, "listen": req.body.listen, 
      "phrases": req.body.phrases, "jokes": req.body.jokes, 'comments': req.body.statistics_comments,"statistics": req.body.statistics, "ip-address": req.ip, "time": current_time};
    collection.insertOne(el);
  }
});



app.post('/FooterEmail',(req,res) => {//=========================================================================

console.log('server: req.body.contactEmail.=', req.body.contactEmail);  
console.log('server: req.body.contactComment.=', req.body.contactComment);  
  //  Get the data of email form

//  "use strict";
//  const nodemailer = require("nodemailer");
  /*
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'ic.okbsh@sgmail.com',//testAccount.user, // generated ethereal user
        pass: 'prospect_227'//testAccount.pass, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Vladik 👻" <foo@example.com>', // sender address
      to: "doc.vik1910@gmail.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world----?", // plain text body
      html: "<b>Hello world?----</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);
*/


  let transporter = nodemailer.createTransport({
    host: oauth2.googleapis.com,
    port: 465,
    secure: true,
    auth:  {
        type: 'OAuth2',
        clientId: '169113029343-vvsi8274ocoi5fl5l4pd5r55fmdssuro.apps.googleusercontent.com',
        clientSecret: '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'
    }
  });

  transporter.sendMail({
    from:'vladik1910@gmail.com',
    to: 'ic.okbshs@gmail.com',
    subject: 'My Message',
    text: 'I hope this massage gets through!',
    auth: {
      user: "vladik1910@gmail.com",
      refreshToken: '1//04_Cncgw8zQlcCgYIARAAGAQSNwF-L9IrrIAoqL_ILkRiFE1U1i4KbUQVx2nrQlw9a7g_c1TO99yIO1x1c2rZ8nIUSGxO8vBgxFo',
      accessToken: 'ya29.A0ARrdaM9AF1RVrktKXVBmVR6ryYh22oBepYj_89OgISDAQW7U86FwftD47wgxRk_2GaxT78MkWbuj96-gZBpnG103QN5ioaeFgOaopJvHY9IlYG0oCYD3qaGPFhmG_AnUlK5jPCsbw2g92bGIrXOOJ8JC4Ej8',
      expires: 3599
    }
  });

});//app.post


app.get('/getAllInsertSections',(req,res) => {
  //Get the documents of the collection
  const collection = db.collection('all_input_sections');
  //Find some documents
  collection.find().toArray(function(err,phrases){
    if(err) {
      console.log(err);
      return;
    } else {
      res.json(phrases);     
    }
  })
});


app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())


app.post('/postAllInsertSections',(req,res) => {
  const body = req.body.sections;
//console.log('server: body= ',body);
//console.log('server: body.all_input_tests= ',body.all_input_tests);

  async function updateColl(){
    try {
      await client.connect();

      const database = client.db(dbName);

      const collection =  database.collection('all_input_sections');

      if(collection) {
//    console.log('server: collection= ',collection);
        const filter = {"key": 0};

        const options ={
          function(err, result){
            console.log(result);
          }
        };
        const doc = {
          "key": 0,
          "all_input_tests":      body.all_input_tests, 
          "all_input_words":      body.all_input_words, 
          "all_input_listen":     body.all_input_listen, 
          "all_input_phrases":    body.all_input_phrases, 
          "all_input_jokes":      body.all_input_jokes, 
          "all_input_statistics": body.all_input_statistics,
          "time": current_time
        }

        const result = await collection.update({},{$set: doc},options);

//        console.log('result=',result)

      }//if
    } catch (e){
      console.log('Error: ', e);
    }

//    await client.close();

  }//end of updateColl

  updateColl();

});



async function run(){
  try{
    await client.connect();

    const database = client.db(dbName);

    const sections =  database.collection('all_input_sections');

 //   console.log('sections =',sections);   

    const filter = {"key": 0};

    const options ={
      function(err, result){
        console.log(result);

      }
    };

    const doc = {
        "key": 0,
        "all_input_tests": 0, 
        "all_input_words": 0, 
        "all_input_listen": 0, 
        "all_input_phrases": 0, 
        "all_input_jokes": 0, 
        "all_input_statistics": 0,
        "time": current_time
    }
    
    const result = await sections.update({},{$set: doc},options);
    
//    console.log('result=',result)

    //try { db.Jokes.deleteOne({"_id" : ObjectId("621b8b4a58b485db58637524") } ) } catch (e) {print(e);}

  } catch (e){
    console.log('Error: ', e);
  }
//  await client.close();

}// end of run


//run();


app.get('/getListenTextFile/:id',(req,res) => {
//console.log('server: req.params=', req.params)
//console.log('server: id=', id)
//console.log('server: req.body.path_text_audio=', req.body.path_text_audio)
  path_text_audio = 'build/audio/text/audio' + req.params.id + '.txt';
//console.log('server: getListenTextFile: path_text_audio= ',path_text_audio);   
//  path_text_audio = 'build/audio/text/audio1.txt'
  //Get the documents of the collection
  fs.readFile(path_text_audio, 'utf8', (err,data)=>{
    if(err){
      console.error(err)
      return
    }
//console.log('data=', data)    
    res.json(data);
  })
//  res.end();
});

app.listen(port, () => {
  console.log(`tests listening at http://srv21035.yourbestnetwork.net:${port}`)
})

// =================================================================================================

/*
  const collection2 = db.collection('all_insert_sections');
  console.log('server: collection2= ',collection2);
  if(collection) {
    try{
      collection.updateOne(
                            {},
                            {$set: {"all_input_tests": 3, "all_input_words": 0, 
                            "all_input_listen": 0, "all_input_phrases": 0, 
                            "all_input_jokes": 0, "all_input_statistics": 0}}
                          );
    } catch (e){
      console.log(e);
    }
  }
*/


//  const collection = db.collection('Statistics');
  //Find some documents  
//console.log('server: /Statistics: collection=', collection);    
//console.log('server: /Statistics: collection.count()=', collection.count());    

//  if(collection) {
//    let el = {"tests": req.body.tests, "words": req.body.words, "listen": req.body.listen, 
//      "phrases": req.body.phrases, "jokes": req.body.jokes, 'comments': req.body.statistics_comments,"statistics": req.body.statistics, "ip-address": req.ip, "time": current_time};
//    collection.insertOne(el);
//  }
  
/*
var app = require('express')(),
    bodyParser = require('body-parser');

// Обратите внимание на используемый путь. Именно он задается в атрибуте action формы
app.use('/form_handler', bodyParser.urlencoded({
    extended: true
}));

// Обратите внимание на используемый путь. Именно он задается в атрибуте action формы
app.post('/form_handler', function(req, res, next) {
    // Объект req.body содержит данные из переданной формы
    console.dir(req.body);
});


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

*/


/*
const dbColl = 'Greatings';
let cl;

const assert = require('assert');

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  cl = client;
});

let content;
let cont;

app.get('/start', (req, res) => {
  console.log('2222')

//  res.sendFile(__dirname + '/public/index.html');

  db = cl.db(dbName);
  collection = db.collection(dbColl);
  
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records on /");
    console.log('docs=',docs);
    doc = docs;
  });

//      content = util.format(data2,"test", "test", "test");
      content = data2;
//      console.log('1 content=',content);

//      console.log('2 content=',content);
      res.setHeader('content-type', 'text/html');
      res.send(content);

//    });


//  });
});  

app.get('/getAllProducts', (req, res) => {

  db = cl.db(dbName);
  collection = db.collection(dbColl);
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("getAllProducts: Found the following records in /getAllTasks");
    console.log(docs);

    res.json(docs);
  });

});

app.post('/addProduct', (req, res) => {

  const body = req.body;
  console.log(typeof(body));
  const db = cl.db(dbName);
  const collection = db.collection(dbColl);
  // Find some documents
  collection.insertOne( body , function(err, result) {
    assert.equal(err, null);
    //assert.equal(3, result.result.n);
    //assert.equal(3, result.ops.length);
    console.log("Inserted 1 documents into the collection");

    res.json({ 'Result' : 'ok' });
  });
  //res.end();
});


app.post('/editProduct/:id', (req, res) => {  
  const body = req.body;
  console.log('editTask: body= ',body);
  const id = req.params.id;
  
  const db = cl.db(dbName);
  const collection = db.collection(dbColl);
  const objNew = 
  // Find some documents
  collection.update( { "id" : id } , {body}, {upsert: true});
  res.end();
});


app.get('/removeProduct/:id', (req, res) => {
  console.log('server: /removeProduct/:id  req.params=',req.params);
  
  const id = req.params.id;
  console.log('server: /removeProduct/:id  id=',id);
  
  const db = cl.db(dbName);
  const collection = db.collection(dbColl);
  // Find some documents
  collection.removeOne( { "id_pu" : Number(id) } , function(err, result) {
    assert.equal(err, null);
    //assert.equal(3, result.result.n);
    //assert.equal(3, result.ops.length);
    console.log("removed 1 documents from the collection");

    res.json({ 'Result' : 'ok' });
  });
  //res.end();
});
*/

/*
> sudo apt-get install libcap2-bin 
> sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
*/
