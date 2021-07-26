const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port =  process.env.PORT || 5000;
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.listen(port, console.log(`Listening on port ${port}`));


app.get('/express_backend', (req,res) =>
{
    res.send({
        express: 'YOU EXPRESS BACKEND IS CONNECTED TO REACT. ALL WORK'
    })
})

app.post("/addData", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.NumOne} - ${request.body.NumTwo} ADD MODE`);
});


app.post("/chgData", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body); //отобразитсяя в консоли компьютера
    response.send(`${request.body.NumOne} - ${request.body.NumTwo} CHG MODE`);
});