require('dotenv').config({ path: './config.env' });
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const connectDB = require('../config/db');

const errorHandler = require('../middleware/error');

//connect DB here
connectDB();


const routesFile = require('../routes/routes');
const privateFile = require('../routes/private');


const app = express();


app.use('/api/soprano', routesFile);
app.use('/api/soprano/private', privateFile);

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json);


//This middleware should always be the last middleware
app.use(errorHandler);


app.get('/', (req, res,) => {
    res.json({ message: 'Hello Sopranos and Mintdropz', });
});


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>  console.log(`Listening at http://localhost:${ PORT }`) );

process.on('unhandledRejection', (err, promise) => { 
    console.log(`Logged error: ${err}`);
    server.close( () => process.exit(1) );
});