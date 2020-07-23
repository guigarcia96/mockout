'use strict';
var express = require('express');
const app = express();
let config = require('./config/backend.json');

app.use(express.json());

config.routes.forEach(route => {
    const method = route.method.toLowerCase()

    app[method](route.url, (req, res) => {
        const output = route.responses.find(x => x.id === route.selectedResponseId);
        const body = require(output.output);
        setTimeout(() => {
            res.status(output.status).json(body);
        }, output.delay)
        console.log(`${method.toUpperCase()}: ${route.url}\nbody: ${JSON.stringify(body)}`)
    });
})

app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen(3333, () => {
    console.log('backend started!')
});