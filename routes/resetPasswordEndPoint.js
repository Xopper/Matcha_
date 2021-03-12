const router = require('express').Router();
const pool = require('../model/dbConnection');
const bcrypt = require('bcrypt');
const isEmpty = obj => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
};
function checkIfUserExists(userName) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			connection.execute(
				'SELECT COUNT(*) AS `userExist` FROM `users` WHERE `user_name` = ?',
				[userName],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = result[0].userExist;
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}
const userValidation = async (req, res, next) => {
	const errors = {};
	const userToResetPwd = req.body.userName;
	const userExists = await checkIfUserExists(userToResetPwd);
	if (userExists === 1) {
		req.userToResetPwd = userToResetPwd;
	} else {
		errors.userError = 'User does not exist';
		req.userError = errors;
	}
	next();
};
const validatePassword = (req, res, next) => {
	const changedPwdErr = {};
	if (!req.body.newPassword) {
		changedPwdErr.newPassword = 'Password is required field.';
	} else if (
		!/(?=.{8,32})(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*\d).*$/.test(
			req.body.newPassword
		)
	) {
		changedPwdErr.newPassword = 'Use [lower-Upper] case, special chars and numbers.';
	} else if (req.body.newPassword.length <= 8) {
		changedPwdErr.newPassword = 'Password must be at least 8 characters.';
	} else if (req.body.newPassword.length > 32) {
		changedPwdErr.newPassword = 'Password must be less than 32 characters.';
	}
	if (isEmpty(changedPwdErr)) {
		if (req.body.newPassword !== req.body.confNewPassword)
			changedPwdErr.confPwdErr = 'Confirm password does not match with the new password';
	}
	req.changedPwdErr = changedPwdErr;
	next();
};
function updatePwd(userName, newPwd) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			connection.execute(
				'UPDATE `users` SET `password` = ? WHERE `user_name` = ?',
				[newPwd, userName],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = result;
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}
const resetPassword = async (req, res, next) => {
	if (!isEmpty(req.userError)) {
		next();
	} else if (!isEmpty(req.changedPwdErr)) {
		next();
	} else {
		const salt = bcrypt.genSaltSync();
		req.body.newPassword = bcrypt.hashSync(req.body.newPassword, salt);
		const pwdUpdated = await updatePwd(req.body.userName, req.body.newPassword);
		next();
	}
};
router.post('/resetPasswordValidation', userValidation, validatePassword, resetPassword, (req, res) => {
	const backEndResponse = {};
	if (!isEmpty(req.userError)) {
		backEndResponse.errors = req.userError;
		backEndResponse.status = 1;
		res.send(backEndResponse);
	} else if (!isEmpty(req.changedPwdErr)) {
		backEndResponse.errors = req.userError;
		backEndResponse.status = 1;
		res.send(backEndResponse);
	} else {
		backEndResponse.status = 0;
		res.send(backEndResponse);
	}
});
module.exports = router;
