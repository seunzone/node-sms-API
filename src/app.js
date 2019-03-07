import express from 'express';
import volleyball from 'volleyball';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';


// Defining the Port Variable
const port = process.env.PORT || 5000;

// Set up the express app
const app = express();

app.use(cors());

// Log requests to the console.
app.use(volleyball);

// parse request body content
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);


// Setup a default route to catch undefined routes
app.get('*', (req, res) => res.status(404).send({
  message: 'A beast ate this page, durh',
}));

app.listen(port);

export default app;
