const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const _ = require('lodash');
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./config/connectDb');
connectDb();

const PORT = 8080 || process.env.PORT;

const { addDonor, loginDonor } = require('./controller/donorControl');
const { addNGO, loginNGO } = require('./controller/ngoControl');
const { addDonation } = require('./controller/donationControl');
const { searchDonationsByQuery } = require('./controller/searchDonationsByQuery');
const { searchDonorById } = require('./controller/searchDonorById');
const { searchNGOById } = require('./controller/searchNGOById');
const { searchDonationById } = require('./controller/searchDonationById');
const { submitRequest } = require('./controller/submitRequest');
const { acceptRequest } = require('./controller/acceptRequest');
const { searchDonationsRecievedByNGO } = require('./controller/searchDonationsRecievedByNGO');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/donor/signup', addDonor);

app.post('/donor/login', loginDonor);

app.post('/ngo/signup', addNGO);

app.post('/ngo/login', loginNGO);

app.post('/addDonation', addDonation);

app.post('/request/submit', submitRequest);

app.post('/request/accept', acceptRequest);

app.get('/api/donations/search', searchDonationsByQuery);

app.get('/api/donor/search', searchDonorById);

app.get('/api/ngo/search', searchNGOById);

app.get('/api/donation/search', searchDonationById);

app.get('/api/ngo/received/search', searchDonationsRecievedByNGO);