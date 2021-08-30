const express = require('express');
const app = express();
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const jsonParser = express.json();



const urlencodedParser = bodyParser.urlencoded({ extended: false });


const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

let dbClient;

mongoClient.connect(function (err, client) {
    if (err) 
        return console.log(err);

    dbClient = client;

    var col = dbClient.db("Users").collection("Students");
    app.locals.collection = dbClient.db("Users").collection("Students");
    const port = process.env.PORT || 5000;
    app.listen(port, console.log(`Listening on port ${port}`));

});

app.get('/express_backend', (req, res) => 
{
    const collection = req.app.locals.collection;
    console.log(mongoClient)
    collection.find({}).toArray(function (err, users) {

        if (err)
             return console.log(err);
        res.send(users)
    });

})

app.post("/addData", jsonParser, async(request, response) => {
    if (!request.body) 
        return response.sendStatus(400);
    const collection = request.app.locals.collection;

    const userName = request.body.name;
    console.log(userName)
    const userAge = request.body.age;
    const userEd = request.body.university;
    const user = {name: userName, age: userAge, university : userEd};
    try{
        await collection.insertOne(user);
        response.send(user);
    }
    catch(err){return console.log(err);}
});


app.put("/chgData", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    response.send(`${request.body.NumOne} - ${request.body.NumTwo} CHG MODE`);
});

app.delete("/deleteData/:id", async(req, res)=>{
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    try{
        const result = await collection.findOneAndDelete({_id: id});
        const user = result.value;
        res.send(user);
    }
    catch(err)
    {
        return console.log(err);
    }
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});