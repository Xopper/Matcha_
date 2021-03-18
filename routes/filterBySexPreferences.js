const router = require('express').Router();
const pool = require('../model/dbconnection');
const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
	if (req.headers.authorization) {
		const authKey = req.headers.authorization.split(' ')[1];
		if (authKey) {
			const authKey = req.headers.authorization.split(' ')[1];
			jwt.verify(authKey, 'boul3al7ayat7obilanamnghirakma3ichach7obi00', (err, user) => {
				if (err) return res.sendStatus(403);
				console.log(' {FIRST} >> ', user.userName);
				req.userNameConnected = user.userName;
			});
		}
	}
	next();
};
function getUserIdAndSexPref(userName) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			console.log('{1}  >>  ', userName);
			connection.execute(
				'SELECT `id`, `gender`, `sexual_preference` FROM `users` WHERE `user_name` = ?',
				[userName],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = {};
						queryResult.id = result[0].id;
						queryResult.gender = result[0].gender;
						queryResult.sexual_preference = result[0].sexual_preference;
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}
function filterAsBi(userId) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			console.log('{2} >>  ', userName);
			connection.execute(
				'SELECT * FROM `users` WHERE users.id NOT IN (SELECT users.id FROM users LEFT JOIN profile_blocks on (users.id = profile_blocks.blocked_id OR users.id = profile_blocks.blocker_id) WHERE (profile_blocks.blocker_id = ? or profile_blocks.blocked_id = ?)) AND users.id <> ? AND users.complited = 0',
				[userId, userId, userId],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = result[0];
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}
function filterAsNotBi(userId, userGender) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			console.log(' >>  ', userId);
			connection.execute(
				'SELECT * FROM `users` WHERE users.id NOT IN (SELECT users.id FROM `users` LEFT JOIN profile_blocks on (users.id = profile_blocks.blocked_id OR users.id = profile_blocks.blocker_id) WHERE (profile_blocks.blocker_id = ? or profile_blocks.blocked_id = ?)) AND users.id <> ? AND users.complited = 0 AND users.gender <> ?',
				[userId, userId, userId, userGender],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = result[0];
						console.log(queryResult);
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}
const getUserData = async (req, res, next) => {
	console.log(' {LAST} ==> ', req.userNameConnected);
	const result = await getUserIdAndSexPref(req.userNameConnected);
	req.userData = result;
	next();
};
const filterUsers = async (req, res, next) => {
	if (req.userData.sexual_preference === 'bi') {
		const result = await filterAsBi(req.userData.id, req.userData.gender);
		console.log('{fisrt res} >> ', result);
		req.filtredUsers = result;
	} else {
		const result = await filterAsNotBi(req.userData.id, req.userData.gender);
		console.log('{sec res} >> ', result);
		req.filtredUsers = result;
	}
	next();
};
router.get('/sex_prefs', authToken, getUserData, filterUsers, (req, res) => {
	const backEndResponse = {};
	backEndResponse.filtredUsers = req.filtredUsers;
	backEndResponse.status = 0;
	res.send(backEndResponse);
});
module.exports = router;
