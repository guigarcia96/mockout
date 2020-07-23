'use strict';
var express = require('express');
const app = express();
let config = require('./config/backend.json');

app.use(express.json());

// validar métodos HTTP
// criar rota de acordo com cada método


config.routes.forEach(route => {
    switch (route.method.toUpperCase()) {
        case "GET":
            app.get(route.url, (request, response) => {
                const output = route.responses.find(x => x.id === route.selectedResponseId);
                const body = require(output.output);
                response.status(output.status).json(body);
            })
            break;
        case "POST":
            app.post(route.url, (request, response) => {
                const body = require(route.output);
                response.json(body);
            });
        default:
            app.all(route.url, (request, response) => {
                const body = require(route.output);
                response.json(body);
            })
            break;
    }
})

app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen(3333, () => {
    console.log('backend started!')
});