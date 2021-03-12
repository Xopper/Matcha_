const router = require('express').Router();
const pool = require('../model/dbConnection');
const jwt = require('jsonwebtoken');
const isEmpty = obj => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
};
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
};
function searchUser(userName) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			connection.execute(
				'SELECT COUNT(*) AS `count` FROM `users` WHERE `user_name` = ?',
				[userName],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = result[0].count;
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}
const checkIfUserExists = async (req, res, next) => {
	const userNotFound = {};
	const userFound = await searchUser(req.body.userNameLokingFor);
	if (userFound === 0) userNotFound.error = `No user found with ${req.body.userNameLokingFor} user name`;
	req.userNotFound = userNotFound.error;
	next();
};
function getUserInfos(userName) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			connection.execute(
				'SELECT `user_name`, `first_name`, `last_name`, `gender`, `sexual_preference`, `birthdate`, `biography`, `public_famerating`, `profile_img`, `img_one`, `img_two`, `img_three`, `img_four`, `country` From `users` WHERE `user_name` = ?',
				[userName],
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
function getUserTags(userId) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			connection.execute(
				'SELECT tags.tags FROM users_tags JOIN tags ON users_tags.tag_id = tags.id WHERE users_tags.user_id = ?',
				[userId],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = result.map(tag => {
							return tag.tags;
						});
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}
function getUserId(userName) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			console.log('model :', userName);
			connection.execute('SELECT `id` FROM `users` WHERE `user_name` = ?', [userName], (err, result) => {
				if (err) reject(err);
				else {
					const queryResult = result[0].id;
					connection.release();
					resolve(queryResult);
				}
			});
		});
	});
}
function checkIfUserIsLiked(currentUserId, userLookingForId) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			connection.execute(
				'SELECT COUNT(*) AS `like` FROM `profile_likes` WHERE `liker_id` = ? AND `liked_id` = ?',
				[currentUserId, userLookingForId],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = result[0].like;
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}
function checkIfUserIsBlocked(currentUserId, userLookingForId) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			connection.execute(
				'SELECT COUNT(*) AS `block` FROM `profile_blocks` WHERE `blocker_id` = ? AND `blocked_id` = ?',
				[currentUserId, userLookingForId],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = result[0].block;
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}
function checkIfProfileIsReported(userLookingForId) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			connection.execute(
				'SELECT COUNT(*) AS `like` FROM `profile_reported` WHERE `reported_id` = ?',
				[userLookingForId],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = result[0].like;
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}
// http://localhost:5000/profileUserInfos/userInfos
// userNameLokingFor hrafi
// Authorization   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhyYWZpIiwiaWF0IjoxNjE1MTk4MjYwfQ.rIkuBx2dZHJjWmA9KhuB6aXsEq0njnGm-8vdJ5WAXZw
const getUserData = async (req, res, next) => {
	const errors = {};
	const allUserInfos = {};
	if (!isEmpty(req.userNotFound)) {
		req.errors = req.userNotFound;
		next();
	} else {
		// get user infos
		const userInfos = await getUserInfos(req.body.userNameLokingFor);
		console.log(userInfos[0]);
		allUserInfos.userName = userInfos[0].user_name;
		allUserInfos.firstName = userInfos[0].first_name;
		allUserInfos.lastName = userInfos[0].last_name;
		allUserInfos.birthday = userInfos[0].birthdate;
		allUserInfos.biography = userInfos[0].biography;
		allUserInfos.gender = userInfos[0].gender;
		allUserInfos.sexualPreference = userInfos[0].sexual_preference;
		allUserInfos.fameRating = userInfos[0].public_famerating;
		allUserInfos.profileImg = userInfos[0].profile_img;
		allUserInfos.imgOne = userInfos[0].img_one;
		allUserInfos.imgTwo = userInfos[0].img_two;
		allUserInfos.imgThree = userInfos[0].img_three;
		allUserInfos.imgFour = userInfos[0].img_four;
		// allUserInfos.imgFour = userInfos[0].img_four;
		allUserInfos.country = userInfos[0].country;
		// get current user id
		console.log('actualuser', req.userNameConnected);
		console.log('req.body.userNameLokingFor', req.body.userNameLokingFor);
		const currentUserId = await getUserId(req.userNameConnected);
		// console.log(currentUserId);
		// get user looking for id
		// -----------------------------------
		const userLookingForId = await getUserId(req.body.userNameLokingFor);
		// console.log(userLookingForId);
		// --------------------------------------
		// get user tags
		const userTags = await getUserTags(userLookingForId);
		allUserInfos.tags = userTags;
		// get if he is liking the profile
		const userIsLiked = await checkIfUserIsLiked(currentUserId, userLookingForId);
		allUserInfos.liked = userIsLiked;
		// get if he is blocking the profile
		const userIsBlocked = await checkIfUserIsBlocked(currentUserId, userLookingForId);
		allUserInfos.blocked = userIsBlocked;
		// get if the profile is reported
		const profileRepoted = await checkIfProfileIsReported(userLookingForId);
		allUserInfos.reported = profileRepoted;
		req.allUserInfos = allUserInfos;
	}
	next();
};
router.post('/userInfos', authToken, checkIfUserExists, getUserData, (req, res) => {
	const backEndResponse = {};
	if (!isEmpty(req.errors)) {
		backEndResponse.errors = req.errors;
		backEndResponse.status = 1;
		res.send(backEndResponse);
	} else {
		backEndResponse.allUserInfos = req.allUserInfos;
		backEndResponse.status = 0;
		res.send(backEndResponse);
	}
});
module.exports = router;
