const router = require('express').Router();
const pool = require('../model/dbconnection');
const jwt = require('jsonwebtoken');
function getToken(token) {
	return new Promise((resolved, rejected) => {
		jwt.verify(token, 'mafhamnachwalakinma3lichlhalwassaoulfanid04', (err, decoded) => {
			if (err) rejected(err);
			resolved(decoded);
		});
	});
}
function checkUserAndValidateAccount(userName) {
	return new Promise((res, rej) => {
		pool.getConnection((err, connection) => {
			if (err) rej(err);
			connection.execute('UPDATE `users` SET `verified`=? WHERE `user_name`=?', [1, userName], (err, result) => {
				if (err) rej(err);
				res(result);
			});
		});
	});
}
const tokenVerification = async (req, res, next) => {
	try {
		console.log('>>the token before <<: ', req.params.token);
		const tokenDecoded = await getToken(req.params.token);
		req.decoded = tokenDecoded;
		console.log('>>the token after  <<: ', req.params.token);
		console.log('<<the token decoded>>: ', tokenDecoded);
		next();
	} catch (err) {
		// console.log(err)
		console.log('the token is invalid !!');
		req.decoded = '';
		next();
	}
};
router.get('/passwordtokenverification/:token', tokenVerification, async (req, res) => {
	const backEndResponse = {};
	if (!req.decoded) {
		console.log('sad9a??', req.decoded);
		backEndResponse.error = 'password Token validation went wrong';
		backEndResponse.status = 1;
		res.send(backEndResponse);
	} else {
		const result = await checkUserAndValidateAccount(req.decoded.userName);
		console.log('>>Verified ?? << ', result);
		if (result.affectedRows === 1) console.log('the token has been verified succesfully');
		backEndResponse.userName = req.decoded.userName;
		backEndResponse.status = 0;
		res.send(backEndResponse);
	}
});
module.exports = router;
