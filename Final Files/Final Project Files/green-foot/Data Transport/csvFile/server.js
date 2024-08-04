const express = require('express');
const app = express();
const port = 3000;
const csvtojson = require("csvtojson");
//const {MongoClient} = require('mongodb');
const data = require("./written_data.json");
// const bp = require('body-parser')
// var axios = require('axios');

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://chuc4:powerpuffs@cluster0.srjhjhl.mongodb.net/test";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/getPercipitationPoints', async function(req, res) {
	client.connect();
	var collection = client.db("in_class_project").collection("gf-precipitation");
	var itr = await collection.find({}).toArray();
	//console.log(itr);
	res.json(itr);
});


app.post ('/add', async function(req, res) {

    const database = client.db("in_class_project");
    const collect = database.collection("gf-reduced-percip");
    
    for (var i = 0; i < data.length; i++) {
        const time = data[i].time;
        const lat = data[i].lat;
        const lon = data[i].lon;
        const pre = data[i].precipitationCal; 

        await collect.insertOne({
			type: "Feature",
			geometry: {
                type: "Point",
                "coordinates": [lon, lat]
            },
            properties: {
                time: time,
                precipitationCal: pre
            }
		});
    }
    
});

app.delete('/deleteData/:database', (req, res) => {
    const client = new MongoClient(uri);
    client.connect();
    const db = client.db("in_class_project");
    const pp_data = db.collection(req.params.database);
    pp_data.deleteMany({}).then(res.send("All Documents Deleted from: " + req.params.database));
    //res.send("All Documents Deleted from: " + req.params.database)
})


app.listen(port, () => {
	console.log('Listening on *:3000');
})