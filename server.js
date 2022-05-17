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
const { google }  = require('googleapis');

//dotenv.config();


const port = 80; //8000 80

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static('./build'))


// nodemail --------------------

const CLIENT_ID = '826658848754-a5sr9jk948hc285rdphqe6hn1qr999u5.apps.googleusercontent.com';
const CLIENT_SECRET =  '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04mSv4PZnzZx-CgYIARAAGAQSNwF-L9IrmphJz89LDtX4J7YHZz-j_AEF2BCKTqS5_NbQH8rx9nBXOczwT38BRkr3AVt8N8iT62M';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

app.post('/FooterEmail',(req,res) => {

//console.log('server: req.body.contactEmail.=', req.body.contactEmail);  
//console.log('server: req.body.contactComment.=', req.body.contactComment);  

async function sendMail(){
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'doc.kokhanovskyi@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    })

    const mailOptions = {
      from: 'engtest.org <doc.vik1910@gmail.com>',
      to: 'doc.kokhanovskyi@gmail.com',
      subject: 'Hello ' + req.body.contactEmail + ' !',
      text: 'Hello from vik',
      html: '<h5>This letter is from ' + req.body.contactEmail + '<br />' + 'The leter text:<br />' + req.body.contactComment +'</h5>'
    }

    const result = await transport.sendMail(mailOptions);
    return result;

  } catch (error) {
    return error
  }
}

sendMail().then(result => console.log('Email sent', result))
.catch(error => console.log(error.message))

});//app.post


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
