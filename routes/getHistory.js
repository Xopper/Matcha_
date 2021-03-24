const router = require('express').Router();
const pool = require('../model/dbConnection');
const jwt = require('jsonwebtoken');
const { query } = require('../model/dbConnection');

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

function getUserId(userName) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			connection.execute('SELECT `id` from `users` WHERE `user_name`', [userName], (err, result) => {
				if (err) reject(err);
				else {
					const queryResult = result;
					connection.release();
					resolve(queryResult);
				}
			});
		});
	});
}

function getUserNotifications(userId) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			connection.execute(
				'SELECT users.user_name as `from`, notifications.type as `notifType`, notifications.notify_at as `notifyAt` from notifications JOIN notifications.to_id = users.id WHERE `notifications.from_id = ?`',
				[userId],
				(err, result) => {
					if (err) reject(err);
					else {
						const queryResult = {};
						if (isEmpty(result)) queryResult.empty = 1;
						else {
							queryResult.empty = 0;
							queryResult.from = result[0].from;
							queryResult.notifType = result[0].notifType;
							queryResult.notifyAt = result[0].notifyAt;
						}
						connection.release();
						resolve(queryResult);
					}
				}
			);
		});
	});
}

const getNotifications = async (req, res, next) => {
	const userId = await getUserId(req.userNameConnected);
	const notifications = await getUserNotifications(userId);
	req.notifications = notifications;
};

router.get('/getHistory', authToken, getNotifications, (req, res) => {
	const backEndResponse = {};
	if (typeof req.notifications !== 'undefined' || !req.notifications) {
		backEndResponse.errors = "can't get the notifications";
		backEndResponse.status = 1;
	} else if (req.notifications.empty === 1) {
		backEndResponse.message = 'No notifications';
		backEndResponse.status = -1;
	} else {
		backEndResponse.notificaions = req.notifications;
		backEndResponse.status = 0;
	}
});
module.exports = router;
