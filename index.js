const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error-handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ["http://localhost:8000", "http://localhost:3000"];
const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			console.log(origin);
			callback(new Error('Not allowed'));
		}
	}
}
app.use(cors(options));

app.get('/', (req, res) => {
	res.send('Welcome to the Store API - Made with Express.js');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);
