const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const emailVerificationRouter = require('./routes/tokenverification');
const stepFormRouter = require('./routes/steFormValidation');

app.use(bodyParser({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors());

app.use('/auth', registrationRouter);
app.use('/emailverification', emailVerificationRouter);
app.use('/authLogin', loginRouter);
app.use('/stepForm', stepFormRouter);

app.listen(5000);
