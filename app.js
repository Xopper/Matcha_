const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const emailVerificationRouter = require('./routes/tokenverification');
const stepFormRouter = require('./routes/steFormValidation');
const getUserInfoRouter = require('./routes/getUserInfo');
const getUserPicsRouter = require('./routes/getUserPics');
const getUserPrefsRouter = require('./routes/getUserPrefs');
const userInfoValidatorRouter = require('./routes/userInfoValidator');
const userPrefsValidtorRouter = require('./routes/userPrefsValidator');
const userEditSecRouter = require('./routes/userSecValidator');
const userEditPicsRouter = require('./routes/userPicsValidator');
const authTokenValidationRouter = require('./routes/authTokenValidation');
const profileUserInfosRouter = require('./routes/profileInfos');
const forgetPwdEmailCheckerRouter = require('./routes/forgetPasswordEmailChecker');
const PasswordTokenVerificationRouter = require('./routes/forgetPasswordTokenValidation');

app.use(bodyParser({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors());

app.use('/auth', registrationRouter);
app.use('/emailverification', emailVerificationRouter);
app.use('/authLogin', loginRouter);
app.use('/stepForm', stepFormRouter);

app.use('/authToken', authTokenValidationRouter);
app.use('/auth', registrationRouter);
app.use('/emailverification', emailVerificationRouter);
app.use('/authLogin', loginRouter);
app.use('/stepForm', stepFormRouter);
app.use('/getInfos', getUserInfoRouter);
app.use('/getPictures', getUserPicsRouter);
app.use('/getPreferences', getUserPrefsRouter);
app.use('/editProfileInfo', userInfoValidatorRouter);
app.use('/editPrefs', userPrefsValidtorRouter);
app.use('/editPwd', userEditSecRouter);
app.use('/editPics', userEditPicsRouter);
app.use('/profileUserInfos', profileUserInfosRouter);
app.use('/forgetPwdEmailChecker', forgetPwdEmailCheckerRouter);
app.use('/passwordverification', PasswordTokenVerificationRouter);

app.listen(5000);
