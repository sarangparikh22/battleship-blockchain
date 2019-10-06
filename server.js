const express = require('express');

const dep = require('./deployContract');

const app = express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/saru',(req,res) => {
    dep.deployContract(req.query.p1,req.query.p2,req.query.p1L,req.query.p2L, (tx) => {
        res.send(tx);
    })
})


app.listen(3000, () => {
    console.log(`Server at you know where`);
})