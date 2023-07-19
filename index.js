const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to the Store API - Made with Express.js');
});

routerApi(app);

app.listen(port);
