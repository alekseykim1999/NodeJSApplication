const express = require('express');
const app = express();
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

let dbClient;

mongoClient.connect(function (err, client) 
{
    if (err) 
        return console.log(err);

    dbClient = client;
    app.locals.collection = dbClient.db("Users").collection("Students");
    const port = process.env.PORT || 5000;
    app.listen(port, console.log(`Listening on port ${port}`));

});

app.get('/express_backend', async(req, res) => 
{
    const collection = req.app.locals.collection;

    try
    {
        const users = await collection.find({}).toArray();
        res.send(users);
    }
    catch(err)
    {
        return console.log(err);
    }

})

app.post("/addData", jsonParser, async(request, response) => {
    if (!request.body) 
        return response.sendStatus(400);

    const collection = request.app.locals.collection;
    const userName = request.body.name;
    const userAge = request.body.age;
    const userEd = request.body.university;
    const user = {name: userName, age: userAge, university : userEd};

    try
    {
        await collection.insertOne(user);
        response.send(user);
    }
    catch(err)
    {
        return console.log(err);
    }
});


app.put("/chgData/:id", jsonParser, async(request, response) => {
    if(!request.body) 
        return response.sendStatus(400);
    
    const id = new objectId(request.params.id);
    const userName = request.body.name;
    const userAge = request.body.age;
    const userUniversity = request.body.university;
    const collection = request.app.locals.collection;
    try
    {
        const result = await collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName, university:userUniversity}},
         {returnDocument: "after" });
        const user = result.value;
        response.send(user);
    }
    catch(err)
    {
        return console.log(err);
    }
});

app.delete("/deleteData/:id", async(req, res)=>{
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;

    try
    {
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