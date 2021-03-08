// const router = require('express').Router();
// const pool = require('../model/dbConnection');
// const jwt = require('jsonwebtoken');


// const isEmpty = obj => {
// 	for (let prop in obj) {
// 		if (obj.hasOwnProperty(prop)) return false;
// 	}
// 	return true;
// };

// function isValidDate(str) {
// 	// STRING FORMAT yyyy-mm-dd
// 	if (str == '' || str == null) {
// 		return false;
// 	}

// 	// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
// 	var m = str.match(/(\d{4})-(\d{2})-(\d{2})/);

// 	// STR IS NOT FIT m IS NOT OBJECT
// 	if (m === null || typeof m !== 'object') {
// 		return false;
// 	}

// 	// CHECK m TYPE
// 	if (typeof m !== 'object' && m !== null && m.size !== 3) {
// 		return false;
// 	}

// 	var ret = true; //RETURN VALUE
// 	var thisYear = new Date().getFullYear(); //YEAR NOW
// 	var minYear = 1900; //MIN YEAR

// 	// YEAR CHECK
// 	if (m[1].length < 4 || m[1] < minYear || m[1] > thisYear) {
// 		ret = false;
// 	}
// 	// MONTH CHECK
// 	if (m[2].length < 2 || m[2] < 1 || m[2] > 12) {
// 		ret = false;
// 	}
// 	// DAY CHECK
// 	if (m[3].length < 2 || m[3] < 1 || m[3] > 31) {
// 		ret = false;
// 	}

// 	return ret;
// }


// const authToken = (req, res, next) => {
	
// 	if (req.headers.authorization) {
// 		const authKey = req.headers.authorization.split(' ')[1];
// 		if (authKey) {
// 			const authKey = req.headers.authorization.split(' ')[1];
// 			jwt.verify(authKey, 'boul3al7ayat7obilanamnghirakma3ichach7obi00', (err, user) => {
// 				if (err) return res.sendStatus(403);
//                 req.userNameConnected = user.userName;
// 			});
// 		}
// 	}
// 	next();
// };

// const primaryInfoDataChecker = (values, center) => {
// 	const errors = {};

// 	// validating Email
// 	if (!values.email || values.email.trim() === '') {
// 		errors.email = 'Email address is required field.';
// 	} else if (!/^([a-zA-Z._0-9-]+)@([a-zA-Z0-9]+[.]?)*([a-zA-Z0-9])(\.[a-zA-Z]{2,4})$/.test(values.email)) {
// 		errors.email = 'Email address is not valid.';
// 	}

// 	// validating username
// 	if (!values.username || values.username.trim() === '') {
// 		errors.username = 'Username is required field.';
// 	} else if (!/^\w+$/.test(values.username)) {
// 		errors.username = 'Use only Alpha numeric characters.';
// 	} else if (values.username.length < 3) {
// 		errors.username = 'Username must be at least 4 characters.';
// 	} else if (values.username.length > 12) {
// 		errors.username = 'Username must be less than 13 characters.';
// 	}

// 	// validate first Name
// 	if (!values.firstName || values.firstName.trim() === '') {
// 		errors.firstName = 'First name is required field.';
// 	} else if (!/^([a-zA-Z ])+$/.test(values.firstName)) {
// 		errors.firstName = 'Use only alphabetic characters.';
// 	} else if (values.firstName.length < 3) {
// 		errors.firstName = 'First name must be at least 4 characters.';
// 	} else if (values.firstName.length > 12) {
// 		errors.firstName = 'First name must be less than 13 characters.';
// 	}

// 	// validate Last name
// 	if (!values.lastName || values.lastName.trim() === '') {
// 		errors.lastName = 'Last name is required field.';
// 	} else if (!/^([a-zA-Z ])+$/.test(values.lastName)) {
// 		errors.lastName = 'Use only alphabetic characters.';
// 	} else if (values.lastName.length < 3) {
// 		errors.lastName = 'Last name must be at least 4 characters.';
// 	} else if (values.lastName.length > 12) {
// 		errors.lastName = 'Last name must be less than 13 characters.';
//     }
    
//     //validate birthday
//     if (!isValidDate(values.birthDay))
//         errors.birthday = 'Not a valid birhtday';

//     //validate biography
//     const bio = values.biography.trim()

//     if (bio === '' || typeof bio === undefined)
//         errors.biography = 'Biography is required';
// 	else if (bio.length < 8 || bio.length > 500)
//         errors.biography = 'Biography field length can be only between 8 and 500 characters';
        
//     // validate location
//     if ((center.lat === null || center.lat === null) && (center.lng === null || center.lng == null))
//         errors.locationErr = 'Not a valid location';
//     else if ((center.lat < -90.0 || center.lat > 90.0) && (center.lng < -180.0 || center.lng > 180.0))
// 		errors.locationErr = 'Not a valid location';


// 	return errors;
// }

// const trimValues = (values) =>{
//     const trimedValues = {}
//     trimedValues.email = values.email.trim()
//     trimedValues.firstName = values.firstName.trim()
//     trimedValues.lastName = values.lastName.trim()
//     trimedValues.username = values.username.trim()
//     trimedValues.birthDay = values.birthDay.trim()
//     trimedValues.biography = values.biography.trim()
//     return trimedValues
// }

// function getUserId(userName) {
// 	return new Promise((resolve, reject) => {
// 		pool.getConnection((err, connection) => {
// 			if (err) reject(err);
// 			connection.execute('SELECT `id` FROM `users` WHERE `user_name` = ?', [userName], (err, result) => {
// 				if (err) reject(err);
// 				else {
// 					const queryResult = result;
// 					connection.release();
// 					resolve(queryResult);
// 				}
// 			});
// 		});
// 	});
// }

// function getUserEmail(userName)
// {
//     return new Promise((resolve, reject) =>{
//         pool.getConnection((err, connection)=>{
//             if (err) reject(err);
//             connection.execute('SELECT `email` FROM `users` WHERE `user_name` = ?', [userName], (err, result) =>{
//                 if (err) reject(err);
//                 else{
//                     const queryResult = result[0].email;
// 					connection.release();
// 					resolve(queryResult);
//                 }
//             })
//         })
//     })
// }
// function emailFound(email) {
// 	return new Promise((res, rej) => {
// 		pool.getConnection((err, connection) => {
// 			if (err) rej(err);
// 			else {
// 				connection.execute(
// 					'SELECT COUNT(*) as count FROM `users` WHERE `email` = ?',
// 					[email],
// 					(err, result) => {
// 						if (err) rej(err);
// 						else {
// 							const queryResult = result[0].count;
// 							connection.release();
// 							res(queryResult);
// 						}
// 					}
// 				);
// 			}
// 		});
// 	});
// }

// function userNameFound(userName)
// {
//     return new Promise((res, rej) => {
// 		pool.getConnection((err, connection) => {
// 			if (err) rej(err);
// 			else {
// 				connection.execute(
// 					'SELECT COUNT(*) as count FROM `users` WHERE `user_name` = ?',
// 					[userName],
// 					(err, result) => {
// 						if (err) rej(err);
// 						else {
// 							const queryResult = result[0].count;
// 							connection.release();
// 							res(queryResult);
// 						}
// 					}
// 				);
// 			}
// 		});
// 	});
// }

// function updateUserNameAndAuthToken(userId, userName, token, authToken)
// {
//     return new Promise((resolve, reject) =>{
//         pool.getConnection((err, connection) => {
// 			if (err) reject(err);
// 			else {
// 				connection.execute(
//                     'UPDATE `users` SET `user_name` = ?, `token` = ?, `authentication_token` = ? WHERE `id` = ?',
//                     [
//                         userName,
//                         token,
//                         authToken,
//                         userId
//                     ]
//                     ,
// 					(err, result) => {
// 						if (err) reject(err);
// 						else {
// 							const queryResult = result;
// 							connection.release();
// 							resolve(queryResult);
// 						}
// 					}
// 				);
// 			}
// 		});

//     })
// }

// function updateEmail(userId, email)
// {
//     return new Promise((resolve, reject) =>{
//         pool.getConnection((err, connection) => {
// 			if (err) rej(err);
// 			else {
// 				connection.execute(
//                     'UPDATE `users` SET `email` = ?, `verified` = ? WHERE `id` = ?',
//                     [
//                         email,
//                         0,
//                         userId
//                     ]
//                     ,
// 					(err, result) => {
// 						if (err) rej(err);
// 						else {
// 							const queryResult = result;
// 							connection.release();
// 							res(queryResult);
// 						}
// 					}
// 				);
// 			}
// 		});

//     })
// }

// function getValidationToken(userId)
// {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) =>{
//             if (err) reject(err);
//             connection.execute('SELECT `token` FROM `users` WHERE `id` = ? ', [userId], (err, result) =>{
//                 if (err) reject(err);
//                 else{
//                     const queryResult = result[0].token;
//                     connection.release();
//                     resolve(queryResult)
//                 }
//             })
//         })
//     })
// }

// function sendEmail(mailSettings, mailTransporter) {
// 	return new Promise((res, rej) => {
// 		mailTransporter.sendMail(mailSettings, (err, info) => {
// 			if (err) rej(err);
// 			res(info.response);
// 		});
// 	});
// }

// const sendEmailValidation = async (email, token) => {
// 	const transporter = nodemailer.createTransport({
// 		service: 'gmail',
// 		auth: {
// 			user: 'matchaproj@gmail.com',
// 			pass: 'dakchidialmatcha03'
// 		}
// 	});

// 	const mailOptions = {
// 		from: 'matchaproj@gmail.com',
// 		to: email,
// 		subject: 'Confirm your email',
// 		text: 'Easy Work',
// 		html: `<h1>Email confirmattion</h1>
//         <p>Confrim your email by clicking the link bellow</p>
//         <a href="http://localhost:5000/emailverification/tokenverification/${token}">Click to validate your registration</a>`
// 	};
// 	try {
// 		const emailSent = await sendEmail(mailOptions, transporter);
// 		console.log('email sent: ', emailSent);
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// const updateEmailAndsendEmail = async (userId, email, token) =>{
//     const emailUpdated = await updateEmail(userId, email)
//     // consdition to send email validation
//     sendEmailValidation(email, token)
// }

// const infoValidator = async (req, res, next) =>{

//     const primaryErrs = primaryInfoDataChecker(req.body.values, req.body.center)
//     if (!isEmpty(primaryErrs))
//     {
//         req.errors = primaryErrs
//         next()
//     }

//     const errors = {}
//     const trimedValues = trimValues(req.body.values)
//     const actualUserName = req.userNameConnected
//     const getUserIdRes = await getUserId(actualUserName)
//     if (getUserIdRes === undefined || getUserIdRes === [] || getUserIdRes === null || getUserIdRes.length === 0)
//         errors.user = "No user with this user name";
//     console.log(actualUserName)
//     const actualUserEmail = await getUserEmail(actualUserName);
//     let userNameChanged = 0;
//     let emailChanged = 0;

//     if (trimedValues.username !== actualUserName)
//     {
//         const userNameIsFound = await userNameFound(trimedValues.username)
//         if (userNameIsFound === 1)
//             errors.userName = "User Name already exists"
//         else if (userNameIsFound === 0)
//             userNameChanged = 1
//     }

//     if (trimedValues.email !== actualUserEmail)
//     {
//         const emailIsFound = await emailFound(trimedValues.email)
//         if (emailIsFound === 1)
//             errors.email = "Email already exists"
//         else if (emailIsFound === 0)
//             emailChanged = 1;
//     }

//     if (isEmpty(errors))
//     {
//         // const infosUpdated = updateUserInfos(trimedValues, center)
//         if (userNameChanged === 1)
//         {
//             const validationToken = jwt.sign(
//                 { userName: trimedValues.username },
//                 'mafhamnachwalakinma3lichlhalwassaoulfanid04'
//             );

//             const authenticationToken = jwt.sign(
//                 { userName: trimedValues.username },
//                 'boul3al7ayat7obilanamnghirakma3ichach7obi00'
//             );
//             const userNameAuthTokenChanged = await updateUserNameAndAuthToken(getUserIdRes[0].id, trimedValues.username, validationToken, authenticationToken)
//             console.log(userNameAuthTokenChanged)
//         }
//         if (emailChanged === 1)
//         {
//             const validationToken = await getValidationToken(getUserIdRes[0].id);
//             const emailChanged = await updateEmailAndsendEmail(getUserIdRes[0].id, trimedValues.email, validationToken)
//         }
//     }
//     req.errors = errors
//     next()
// }

// router.post("/infoValidator", authToken, infoValidator,(req, res) =>{
//     const backEndResponde = {};
//     if (!isEmpty(req.errors))
//     {
//         backEndResponde.errors = req.errors
//         backEndResponde.status = 1;
//         console.log(backEndResponde);
//         res.send(backEndResponde);
//     }else{

//         backEndResponde.status = 0;
//         console.log(backEndResponde);
// 		res.send(backEndResponde);
//     }
// })

// module.exports = router;

const router = require('express').Router();
const pool = require('../model/dbConnection');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// comment every thing 
// validate token first 
// get user_name from token validation
// second midlware gonna be for geting email and user id
// third middle ware to validate data

const isEmpty = obj => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
};

function isValidDate(str) {
	// STRING FORMAT yyyy-mm-dd
	if (str == '' || str == null) {
		return false;
	}

	// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
	var m = str.match(/(\d{4})-(\d{2})-(\d{2})/);

	// STR IS NOT FIT m IS NOT OBJECT
	if (m === null || typeof m !== 'object') {
		return false;
	}

	// CHECK m TYPE
	if (typeof m !== 'object' && m !== null && m.size !== 3) {
		return false;
	}

	var ret = true; //RETURN VALUE
	var thisYear = new Date().getFullYear(); //YEAR NOW
	var minYear = 1900; //MIN YEAR

	// YEAR CHECK
	if (m[1].length < 4 || m[1] < minYear || m[1] > thisYear) {
		ret = false;
	}
	// MONTH CHECK
	if (m[2].length < 2 || m[2] < 1 || m[2] > 12) {
		ret = false;
	}
	// DAY CHECK
	if (m[3].length < 2 || m[3] < 1 || m[3] > 31) {
		ret = false;
	}

	return ret;
}

const authToken = (req, res, next) => {
	if (req.headers.authorization) {
		const authKey = req.headers.authorization.split(' ')[1];
		if (authKey) {
			const authKey = req.headers.authorization.split(' ')[1];
			jwt.verify(authKey, 'boul3al7ayat7obilanamnghirakma3ichach7obi00', (err, user) => {
				if (err) return res.sendStatus(403);
                req.userNameConnected = user.userName;
			});
		}
	}
	next();
}

function getUserId(userName)
{
    return new Promise((resolve, reject) =>{
        pool.getConnection((err, connection)=>{
            if (err) reject(err);
            connection.execute('SELECT `id` FROM `users` WHERE `user_name` = ?', [userName], (err, result) =>{
                if (err) reject(err);
                else{
                    if (result === undefined || result === [] || result.length === 0)
                    {
                        connection.release();
                        resolve(false);
                    }
                    else
                    {
                        const queryResult = result[0].id;
                        connection.release();
                        resolve(queryResult);
                    }
                }
            })
        })
    })
}

function getUserEmail(userName)
{
    return new Promise((resolve, reject) =>{
        pool.getConnection((err, connection)=>{
            if (err) reject(err);
            connection.execute('SELECT `email` FROM `users` WHERE `user_name` = ?', [userName], (err, result) =>{
                if (err) reject(err);
                else{
                    if (result === undefined || result === [] || result.length === 0)
                    {
                        connection.release();
                        resolve(false);
                    }
                    else
                    {
                        const queryResult = result[0].email;
                        connection.release();
                        resolve(queryResult);
                    }
                }
            })
        })
    })
}

function userNameFound(userName)
{
    return new Promise((res, rej) => {
		pool.getConnection((err, connection) => {
			if (err) rej(err);
			else {
				connection.execute(
					'SELECT COUNT(*) as count FROM `users` WHERE `user_name` = ?',
					[userName],
					(err, result) => {
						if (err) rej(err);
						else {
							const queryResult = result[0].count;
							connection.release();
							res(queryResult);
						}
					}
				);
			}
		});
	});
}

function emailFound(email)
{
    return new Promise((res, rej) => {
		pool.getConnection((err, connection) => {
			if (err) rej(err);
			else {
				connection.execute(
					'SELECT COUNT(*) as count FROM `users` WHERE `email` = ?',
					[email],
					(err, result) => {
						if (err) rej(err);
						else {
							const queryResult = result[0].count;
							connection.release();
							res(queryResult);
						}
					}
				);
			}
		});
	});
}

const getActualInfos = async (req, res, next) =>{
    const actualInfosErr = {}
    const actualUserInfos = {}
    const actualUserName = req.userNameConnected
    const actualUserId = await getUserId(actualUserName)
    const actualEmail = await getUserEmail(actualUserName)
    if (!actualUserId)
        actualInfosErr.id = "We can't get the user id .Highly chanses that user name has been changed"
    if (!actualEmail)
        actualInfosErr.email = "We can't get the user email .Highly chanses that user name has been changed"
    
    if (isEmpty(actualInfosErr))
    {
        actualUserInfos.actualUserName = actualUserName
        actualUserInfos.actualUserId = actualUserId
        actualUserInfos.actualEmail = actualEmail
        req.actualUserInfos = actualUserInfos
    }
    req.actualInfosErr = actualInfosErr
    next()
}

const primaryInfoDataChecker = (values, center) => {
	const errors = {};

	// validating Email
	if (!values.email || values.email.trim() === '') {
		errors.email = 'Email address is required field.';
	} else if (!/^([a-zA-Z._0-9-]+)@([a-zA-Z0-9]+[.]?)*([a-zA-Z0-9])(\.[a-zA-Z]{2,4})$/.test(values.email)) {
		errors.email = 'Email address is not valid.';
	}

	// validating username
	if (!values.username || values.username.trim() === '') {
		errors.username = 'Username is required field.';
	} else if (!/^\w+$/.test(values.username)) {
		errors.username = 'Use only Alpha numeric characters.';
	} else if (values.username.length < 3) {
		errors.username = 'Username must be at least 4 characters.';
	} else if (values.username.length > 12) {
		errors.username = 'Username must be less than 13 characters.';
	}

	// validate first Name
	if (!values.firstName || values.firstName.trim() === '') {
		errors.firstName = 'First name is required field.';
	} else if (!/^([a-zA-Z ])+$/.test(values.firstName)) {
		errors.firstName = 'Use only alphabetic characters.';
	} else if (values.firstName.length < 3) {
		errors.firstName = 'First name must be at least 4 characters.';
	} else if (values.firstName.length > 12) {
		errors.firstName = 'First name must be less than 13 characters.';
	}

	// validate Last name
	if (!values.lastName || values.lastName.trim() === '') {
		errors.lastName = 'Last name is required field.';
	} else if (!/^([a-zA-Z ])+$/.test(values.lastName)) {
		errors.lastName = 'Use only alphabetic characters.';
	} else if (values.lastName.length < 3) {
		errors.lastName = 'Last name must be at least 4 characters.';
	} else if (values.lastName.length > 12) {
		errors.lastName = 'Last name must be less than 13 characters.';
    }
    
    //validate birthday
    if (!isValidDate(values.birthDay))
        errors.birthday = 'Not a valid birhtday';

    //validate biography
    const bio = values.biography.trim()

    if (bio === '' || typeof bio === undefined)
        errors.biography = 'Biography is required';
	else if (bio.length < 8 || bio.length > 500)
        errors.biography = 'Biography field length can be only between 8 and 500 characters';
        
    // validate location
    // if ((center.lat === null || center.lat === null) && (center.lng === null || center.lng == null))
    //     errors.locationErr = 'Not a valid location';
    if ((center.lat < -90.0 || center.lat > 90.0) && (center.lng < -180.0 || center.lng > 180.0))
		errors.locationErr = 'Not a valid location';

	return errors;
}

const trimValues = (values) =>{
    const trimedValues = {}
    trimedValues.email = values.email.trim()
    trimedValues.firstName = values.firstName.trim()
    trimedValues.lastName = values.lastName.trim()
    trimedValues.username = values.username.trim()
    trimedValues.birthDay = values.birthDay.trim()
    trimedValues.biography = values.biography.trim()
    return trimedValues
}

function sendEmail(mailSettings, mailTransporter) {
	return new Promise((res, rej) => {
		mailTransporter.sendMail(mailSettings, (err, info) => {
			if (err) rej(err);
			res(info.response);
		});
	});
}

const sendEmailValidation = async (email, token) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'matchaproj@gmail.com',
			pass: 'dakchidialmatcha03'
		}
	});

	const mailOptions = {
		from: 'matchaproj@gmail.com',
		to: email,
		subject: 'Confirm your email',
		text: 'Easy Work',
		html: `<h1>Email confirmattion</h1>
        <p>Confrim your email by clicking the link bellow</p>
        <a href="http://localhost:5000/emailverification/tokenverification/${token}">Click to validate your registration</a>`
	};
	try {
		const emailSent = await sendEmail(mailOptions, transporter);
		console.log('email sent: ', emailSent);
	} catch (err) {
		console.log(err);
	}
}

const primaryValidation = (req, res, next) =>{

    if (!isEmpty(req.actualInfosErr))
    {
        primaryErrs = req.actualInfosErr
        req.primaryErrs = primaryErrs
        next()
    }
    req.primaryErrs = primaryInfoDataChecker(req.body.values, req.body.center)
    if (isEmpty(req.primaryErrs))
        req.trimedValues = trimValues(req.body.values);
    next()
}

function updateUserNameAndTokens(userId, values, valToken, authToken)
{
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            connection.execute('UPDATE `users` SET `user_name` = ?, `first_name` = ?, `last_name` = ?, `email` = ?, `token` = ?, `authentication_token` = ?, `birthdate` = ?, `biography` = ? WHERE `id` = ?',
             [
                 values.username,
                 values.firstName, 
                 values.lastName,
                 values.email,
                 valToken,
                 authToken,
                 values.birthDay,
                 values.biography,
                 userId
             ],
             (err, result) => {
                if (err) reject(err)
                else{
                    const queryResult = result;
					connection.release();
					resolve(queryResult);
                }
            })
        })
    });
}
function UpdateAllInfos(userId, values, valToken, authToken)
{
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            connection.execute('UPDATE `users` SET `user_name` = ?, `first_name` = ?, `last_name` = ?, `email` = ?, `token` = ?, `authentication_token` = ?, `verified` = ?, `birthdate` = ?, `biography` = ? WHERE `id` = ?',
             [
                 values.username,
                 values.firstName, 
                 values.lastName,
                 values.email,
                 valToken,
                 authToken,
                 0,
                 values.birthDay,
                 values.biography,
                 userId
            ],
              (err, result) => {
                if (err) reject(err)
                else{
                    const queryResult = result;
					connection.release();
					resolve(queryResult);
                }
            })
        })
    });
}

function updateEmail(userId, values, valToken)
{
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            connection.execute('UPDATE `users` SET `user_name` = ?, `first_name` = ?, `last_name` = ?, `email` = ?, `token` = ?, `verified` = ?, `birthdate` = ?, `biography` = ? WHERE `id` = ?',
             [
                 values.username,
                 values.firstName, 
                 values.lastName,
                 values.email,
                 valToken,
                 0,
                 values.birthDay,
                 values.biography,
                 userId
            ],
              (err, result) => {
                if (err) reject(err)
                else{
                    const queryResult = result;
					connection.release();
					resolve(queryResult);
                }
            })
        })
    });
}

function updateAllWithNoChanges(userId, values)
{
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            connection.execute('UPDATE `users` SET `user_name` = ?, `first_name` = ?, `last_name` = ?, `email` = ?, `birthdate` = ?, `biography` = ? WHERE `id` = ?',
             [
                 values.username,
                 values.firstName, 
                 values.lastName,
                 values.email,
                 values.birthDay,
                 values.biography,
                 userId
            ],
              (err, result) => {
                if (err) reject(err)
                else{
                    const queryResult = result;
					connection.release();
					resolve(queryResult);
                }
            })
        })
    });
}

const finalInfosValidation = async (req, res, next) =>{
    if (!isEmpty(req.primaryErrs))
    {
        req.errors = req.primaryErrs
        next()
    }
    const actualUserInfos = req.actualUserInfos
    const formData = req.trimedValues
    const errors = {}
    let userNameChanged = 0
    let emailChanged = 0
    let newValidationToken = ''
    let newAuthenticationToken = ''


    if (formData.username !== actualUserInfos.actualUserName)
    {
        const userNameIsFound = await userNameFound(formData.username)
        if (userNameIsFound === 1)
            errors.userName = "User Name already exists"
        else if (userNameIsFound === 0)
        {
            userNameChanged = 1

            newValidationToken = jwt.sign(
                { userName: formData.username },
                'mafhamnachwalakinma3lichlhalwassaoulfanid04'
            );

            newAuthenticationToken = jwt.sign(
                { userName: formData.username },
                'boul3al7ayat7obilanamnghirakma3ichach7obi00'
            );
            req.authenticationToken = newAuthenticationToken
        }
    }
    if (formData.email !== actualUserInfos.actualEmail)
    {
        const emailIsFound = await emailFound(formData.email)
        if (emailIsFound === 1)
            errors.email = "Email already exists"
        else if (emailIsFound === 0)
        {
            emailChanged = 1;
            if (userNameChanged === 0)
            {
                newValidationToken = jwt.sign(
                    { userName: formData.username },
                    'mafhamnachwalakinma3lichlhalwassaoulfanid04'
                );
            }
        }
    }

    // update data
    if (userNameChanged === 1 && emailChanged === 1)
    {
        var updateAll = await UpdateAllInfos(actualUserInfos.actualUserId, formData, newValidationToken, newAuthenticationToken)
        if (updateAll.affectedRows === 1)
        {
            sendEmailValidation(formData.email, newValidationToken)
        }
        else 
            errors.updateErr = "Update Error"
    }else if (userNameChanged === 1 && emailChanged === 0)
    {
        var updateUserName = await updateUserNameAndTokens(actualUserInfos.actualUserId, formData, newValidationToken, newAuthenticationToken)
        if (updateUserName.affectedRows === 1)
            ;
        else
            errors.updateErr = "Update Error"
    }else if (emailChanged === 1 && userNameChanged === 0)
    {
        var emailUpdated = await updateEmail(actualUserInfos.actualUserId, formData, newValidationToken)
        if (emailUpdated.affectedRows === 1)
        {
            sendEmailValidation(formData.email, newValidationToken)
        }else
            errors.updateErr = "Update Error"
    }else
    {
        var allUpdated = await  updateAllWithNoChanges(actualUserInfos.actualUserId, formData)
        if (allUpdated.affectedRows === 1)
            ;
        else
            errors.updateErr = "Update Error"
    }
    req.errors = errors
    next()
}

router.post('/infoValidator', authToken, getActualInfos, primaryValidation, finalInfosValidation,(req, res) =>{
    // any time the form gonna be submited the new token has to be send to the front aand then to the back to check it
    const backEndResponde = {}
    if (!isEmpty(req.errors))
    {
        backEndResponde.errors = req.errors
        backEndResponde.status = 1 
    }else
    {
        backEndResponde.authToken = req.authenticationToken
        backEndResponde.status = 0
    }
})


module.exports = router;