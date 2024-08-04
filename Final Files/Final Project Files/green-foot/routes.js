const express = require('express');
const app = express();
const axios = require('axios').default;
const encrypt = require('crypto');
const router = express.Router();
var bodyParser = require('body-parser');
const fs = require("fs");
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
let cors = require("cors");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// database connection
const uri = "mongodb+srv://chuc4:powerpuffs@cluster0.srjhjhl.mongodb.net/test";
const dbname = "in_class_project";
const collectioname = "login-profileinfo";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

/**
 * Here lies the data structure for [Account]:
 * 
 * Account Structure:{
 * 
 *    permission - Mutable int
 *    seasoning - Mutable string
 *    username - Mutable string
 *    password - Mutable string
 *    Firstname - Uncallable directly by clients
 *    Lastname - Uncallable directly by clients
 *    Email - Mutable string
 *    Bio - Mutable String(First letter of Firstname)
 *    SavedSearches - Mutable array of Search Objects
 *    
 * }
 * 
 * Status Codes:
 *  200 - OK(successful)
 *  402 - Global Error(for public operations)
 *  404 - User Error(for user operations)
 */

// Helper Function: response generator
function constructResponse(rescode, resstatus, resmessage, resdata){
  var result;
  (resdata == null) ? result = {code: rescode, status: resstatus,
                                message: resmessage} 
                    : result = {code: rescode, status: resstatus,
                                message: resmessage, data: resdata};
  return result;
}



/** User Operations
 * // some operations requires additional permission checks
*/

router.put('/db/:username/changePassword', function(req, res){
  UserOperate('cp', req.params.username, req.body).then(result => res.send(result));
});
router.put('/db/:username/changeEmail', function(req, res){
  UserOperate('ce', req.params.username, req.body).then(result => res.send(result));
});
router.delete('/db/:username/removeSearch', function(req, res){
  UserOperate('rs', req.params.username, req.body).then(result => res.send(result));
});
router.delete('/db/:username/clearSearches', function(req, res){
  UserOperate('cs', req.params.username, null).then(result => res.send(result));
});
router.delete('/db/:username/deleteAccount', function(req, res){
  UserOperate('da', req.params.username, req.body).then(result => res.send(result));
});
router.put('/db/:username/logoutAccount', function(req, res){
  UserOperate('la', req.params.username, null).then(result => res.send(result));
});
router.get('/db/:username/fetchData', function (req, res){
  UserOperate('fd', req.params.username, null).then(result => res.send(result));
});

async function UserOperate(operation, name, doc){
  // connect to the database
  await client.connect();
  const collection = client.db(dbname).collection(collectioname);
  // verify user is already logged in
  if(await collection.findOne({username: name}) == null)
    return constructResponse("404", "Invalid Request",
            "Account does not exist.", null);
  if(await collection.findOne({username: name, permission: 1}) == null) 
    return constructResponse("404", "Invalid Request",
            "You need to login to do that.", null);
  const user = await collection.findOne({username: name});


  // changePassword[req.body = {oldpassword, newpassword}]
  if(operation == 'cp'){
    var success = true;
    // field existence check
    success = (Object.keys(doc).length == 2);
    success = success && ('oldpassword' in doc);
    success = success && ('newpassword' in doc);
    if(!success) return constructResponse("404", "Invalid Request",
                         "Incorrect input format detected.", null);
    // check validity of passwords
    if(doc.oldpassword == doc.newpassword)
      return constructResponse("404", "Invalid Request",
              "old password cannot be the same as new password.", null);
    if(doc.newpassword.length < 8)
      return constructResponse("404", "Invalid Request", 
              "new password needs to be at least 8 charcters long.", null);
    var old = encrypt.createHash('sha512')
                     .update(user.seasoning+doc.oldpassword)
                     .digest('base64');
    if(old != user.password) 
      return constructResponse("404", "Invalid Request",
              "Invalid credentials", null);
    // update salt and password for account
    const newseasoning = encrypt.randomBytes(128);
    collection.updateOne({username: name}, {$set: {seasoning: newseasoning, password: 
      encrypt.createHash('sha512')
             .update(newseasoning+doc.newpassword)
             .digest('base64')}});
    return constructResponse("200", "OK", "Operation Successful.", null);
    
  }

  // changeEmail[req.body = {oldemail, newemail, password}]
  else if(operation == 'ce'){
    var success = true;
    // field existence check
    success = (Object.keys(doc).length == 3);
    success = success && ('oldemail' in doc);
    success = success && ('newemail' in doc);
    success = success && ('password' in doc);
    if(!success) return constructResponse("404", "Invalid Request",
                         "Incorrect input format detected.", null);
    // email redundence check
    if(doc.oldemail == doc.newemail)
      return constructResponse("404", "Invalid Request",
              "old email cannot be the same as new email.", null);
    if(doc.oldemail != user.Email) 
      return constructResponse("404", "Invalid Request",
              "Invalid old email", null);
    // confirm correct password for additional authentication
    var old = encrypt.createHash('sha512')
                     .update(user.seasoning+doc.password)
                     .digest('base64');
    if(old != user.password) 
      return constructResponse("404", "Invalid Request",
              "Invalid credentials", null);
    // update email for account
    collection.updateOne({username: name}, {$set: {Email: doc.newemail}});
    return constructResponse("200", "OK", "Operation Successful.", null);
  }
  // removeSearch[req.body = {index}]
  else if(operation == 'rs'){
    var success = true;
    // field existence check
    success = (Object.keys(doc).length == 1);
    success = success && ('index' in doc);
    if(!success) return constructResponse("404", "Invalid Request",
                         "Incorrect input format detected.", null);
    // notice user if specified index does not exist
    var arr = user.SavedSearches;
    if(arr.length <= parseInt(doc.index)) return constructResponse("404", "Invalid Request",
                                    "Element specified not found.", null);
    // remove specified search for account
    arr.splice(parseInt(doc.index), 1);
    collection.updateOne({username: name}, {$set: {SavedSearches: arr}});
    return constructResponse("200", "OK", "Operation Successful.", null);
  }
  
  // clearSearches[]
  else if(operation == 'cs'){
    var search = await collection.findOne({username: name});
    if(search == null) 
      return constructResponse("404", "Invalid Request",
              "Account does not exist.", null);
    collection.updateOne({username: name}, {$set: {SavedSearches: []}});
    return constructResponse("200", "OK", "Operation Successful.", null);
  }
  
  // deleteAccount[{password}]
  else if(operation == 'da'){
    var success = true;
    // field existence check
    success = (Object.keys(doc).length == 1);
    success = success && ('password' in doc);
    if(!success) return constructResponse("404", "Invalid Request",
                         "Incorrect input format detected.", null);
    // confirm correct password for additional authentication
    var old = encrypt.createHash('sha512')
                     .update(user.seasoning+doc.password)
                     .digest('base64');
    if(old != user.password) 
      return constructResponse("404", "Invalid Request",
              "Invalid credentials", null);
    // deletes provided account
    collection.updateOne({username: name}, {$set: {permission: 0}});
    collection.deleteOne({username: name});
    return constructResponse("200", "OK", "Operation Successful.", null);
  }

  // logoutAccount[]
  else if(operation == 'la'){
    // remove login permission from provided account
    await collection.updateOne({username: name}, {$set: {permission: 0}});
    return constructResponse("200", "OK", "Operation Successful.", null);
  }
  
  // fetchData[]
  else if(operation == 'fd'){
    // construct & filter user data
    var data = await collection.findOne({username: name});
    delete data.password;
    delete data.permission;
    data.Bio = user.Firstname[0].toUpperCase();
    // return user data
    return constructResponse("200", "OK", "Operation Successful.", data);
  }

  // Invalid request ==> do nothing
  else return constructResponse("404", "Invalid Request",
               "Check your fields and try again.", null);
}



/** Public Operations
 *  these operations is open to general public
*/

router.post('/db/createAccount', function(req, res){
  GlobalOperate('c', req.body).then(result => res.send(result));
});
router.put('/db/normalLogin', function(req, res){
  GlobalOperate('l', req.body).then(result => res.send(result));
});

async function GlobalOperate(operation, doc){
  // connect to the database
  await client.connect();
  const collection = client.db(dbname).collection(collectioname);

  // createAccount[req.body = {firstname, lastname, email, username, password}]
  if(operation == "c"){ 
    var response;
    var success = true;
    
    // field existence check
    success = (Object.keys(doc).length == 5);
    success = success && ('Firstname' in doc);
    success = success && ('Lastname' in doc);
    success = success && ('Email' in doc);
    success = success && ('username' in doc);
    success = success && ('password' in doc);
    // reject duplicate usernames
    var existsname = await collection.findOne({username: doc.username});
    if(existsname != null) 
      return constructResponse("402", "Invalid Argument(s)",
              "This username is already taken.", doc.username);
    // reject short passwords
    if(doc.password.length < 8)
      return constructResponse("402", "Invalid Argument(s)",
              "password needs to be at least 8 characters.", null);
    if(success == true){
      // initialize other fields
      doc.permission = 1;
      doc.Bio = doc.Firstname[0].toUpperCase();
      doc.SavedSearches = [];
      // generate a random salt
      doc.seasoning = encrypt.randomBytes(128);
      doc.password = encrypt.createHash('sha512')
                            .update(doc.seasoning+doc.password)
                            .digest('base64');
      // creates account and add it to database
      collection.insertOne(doc);
    }
    // generate a readable response
    (success == true) 
    ? response = constructResponse("200", "OK", "Operation Successful.", doc.username)
    : response = constructResponse("402", "Invalid Argument(s)",
                  "Check your fields and try again.", null);
    return response;
  }

  // normalLogin[req.body = {username, password}]
  else if(operation == "l"){ 
    var response;
    var success = true;
    // field existence check
    success = (Object.keys(doc).length == 2);
    success = success && ('username' in doc);
    success = success && ('password' in doc);
    // username check
    var usernamestr = doc.username;
    if(await collection.findOne({username: usernamestr}) == null) 
      return constructResponse("402", "Invalid Argument(s)",
              "Specified account does not exist.", null);
    if(await collection.findOne({username: usernamestr, permission: 1}) != null)
      return constructResponse("402", "Invalid Argument(s)",
              "You're already logged in!", null);
    // password check
    const user = await collection.findOne({username: usernamestr});
    var input = encrypt.createHash('sha512')
                       .update(user.seasoning+doc.password)
                       .digest('base64');
    success = (input === user.password);
    // change permission of user --> logged in(1)
    if(success === true) 
      await collection.updateOne({username: usernamestr}, 
                                 {$set: {permission: 1}});
    // generate a readable response
    (success == true) 
    ? response = constructResponse("200", "OK", "Operation Successful.", usernamestr)
    : response = constructResponse("402", "Invalid Argument(s)",
                  "Check your credentials and try again.", null);
    return response;
  }

  // Invalid request ==> do nothing
  else return constructResponse("402", "Invalid Request",
               "Check your fields and try again.", null);
}

function sleep(ms) {
    console.log("sleeping...");
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

router.get('/getPowerPlantData', async (req, res) => {
    var q = {};
    for(var key in req.query) {
        let final_k = "properties." + key.toUpperCase();
        q[final_k] = {'$regex' : req.query[key], '$options' : 'i'}
    }
    // console.log(q);
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("in_class_project");
    const pp_data = db.collection("gf-power-plants");
    let data = await pp_data.find(q).toArray();
    res.json(data);
    // createVisualization(data);
});

router.get('/getPrecipitationPoints', async function(req, res) {
    const client = new MongoClient(uri);
    await client.connect();
    var collection = client.db("in_class_project").collection("gf-reduced-percip");
    var itr = await collection.find({}).toArray();
    //console.log(itr);
    res.json(itr);
});

router.post('/insertPowerPlantData', async (req, res) => {
    const jsonString = fs.readFileSync("./data/powerplant.geojson");
    const powerplant = await JSON.parse(jsonString);
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("in_class_project");
    const pp_data = db.collection("gf-power-plants");
    for(let i = 0; i < powerplant.features.length; i++) {
        //24.52o N latitude to 49.38o N latitude
        //66.95o W longitude to 124.77o W longitude
        if(powerplant.features[i].properties.STATE != "AK" 
        && powerplant.features[i].properties.STATE != "HI"
        && powerplant.features[i].properties.STATE != "PR"
        && powerplant.features[i].properties.STATE != "GU"
        && powerplant.features[i].properties.STATE != "AS"
        && powerplant.features[i].properties.STATE != "MP") {
                await pp_data.insertOne({
                    type: powerplant.features[i].type,
                    geometry: powerplant.features[i].geometry,
                    properties: powerplant.features[i].properties,
                });
                console.log("added " + i + " " + powerplant.features[i].properties.STATE);
            }
    }
    res.send("Added all powerplant data");
})

router.post('/addSaveSearch', async (req, res) => {
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect();
    var collection = client.db("in_class_project").collection("login-profileinfo");
    //console.log(req.body);

    let q = {}
    var holder = []
    for(const key in req.body) {
        if (key != "username") {
            q[key] = req.body[key];
        }
    }
    var itr = await collection.findOne({username: req.body.username});
    var newArray = itr.SavedSearches;

    if ((await collection.find({
      username: req.body.username,
      SavedSearches: {
        $elemMatch: q
      }
    }).toArray()).length == 0) {
        newArray.push(q);
        console.log(newArray);
        await collection.updateOne ({username: req.body.username}, {
            $set: {SavedSearches: newArray}
        }).then(res.send({status: "Success!"}))
    } else {
        res.send({status: "Fail"});
    }
});

router.delete('/deleteData/:database', (req, res) => {
    const client = new MongoClient(uri);
    client.connect();
    const db = client.db("in_class_project");
    const pp_data = db.collection(req.params.database);
    pp_data.deleteMany({}).then(res.send("All Documents Deleted from: " + req.params.database));
    //res.send("All Documents Deleted from: " + req.params.database)
})

module.exports = router;
