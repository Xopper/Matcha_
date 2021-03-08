const router = require('express').Router();
const pool = require('../model/dbConnection');
const jwt = require('jsonwebtoken');


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

function getUserInformations(userName)
{
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) =>{
            if (err) reject(err);
            connection.execute('SELECT `user_name`, `first_name`, `last_name`, `email`, `birthdate`, `biography` FROM `users` WHERE `user_name` = ?', [userName], (err, result) =>{
                if (err) reject(err);
                else{
                    const queryResult = result;
                    connection.release();
                    resolve(queryResult);
                }
            })
        })
    })
}

getUserData = async (req, res, next) => {
    const userNameConnected = req.userNameConnected
    const userInfo = await getUserInformations(userNameConnected)
    req.userInfos = userInfo
    next()
}

router.get("/infos", authToken, getUserData, (req, res) =>{
    const backEndRes = {};
    backEndRes.userInfos = req.userInfos
    backEndRes.status = 0
    res.send(backEndRes)
})

module.exports = router;