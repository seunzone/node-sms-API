import express from 'express';
import volleyball from 'volleyball';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';

dotenv.config();


// Defining the Port Variable
const port = process.env.PORT || 5000;

// Set up the express app
const app = express();

app.use(cors());

// Log requests to the console.
app.use(volleyball);

// Mongo Connection Set-Up Please this should move to the modesl folder
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;

// // Bind connection to error event (to get notification of connection errors)
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
