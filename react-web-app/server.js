const express = require('express');
const app = express();
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const bodyParser = require("body-parser");





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


    /* res.send({
        express: 'YOU EXPRESS BACKEND IS CONNECTED TO REACT. ALL WORK'
    }) */
})

app.post("/addData", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.NumOne} - ${request.body.NumTwo} ADD MODE`);
});


app.post("/chgData", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body); //отобразитсяя в консоли компьютера
    response.send(`${request.body.NumOne} - ${request.body.NumTwo} CHG MODE`);
});


process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});