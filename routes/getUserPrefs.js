const router = require('express').Router();
const pool = require('../model/dbConnection');
const bcrypt = require('bcrypt');
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

function getUserPrefs(userName)
{
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) =>{
            if (err) reject(err);
            connection.execute('SELECT `gender`, `sexual_preference` FROM `users` WHERE `user_name` = ?', [userName], (err, result) =>{
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

function getUserTags(userId)
{
    return new Promise((reject, resolve) =>{
        pool.getConnection((err, connection) =>{
            if (err) reject(err);
            connection.execute('SELECT `tag_id` FROM `users_tags` WHERE `user_id` = ?', [userId], (err, result) => {
                if (err) reject(err);
                else{
                    const queryResult = result;
                    connection.release();
                    resolve(queryResult);
                }
            })
        });
    })
}

function getUserId(userName) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
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

getUserData = async (req, res, next) => {
    const userNameConnected = req.userNameConnected
    console.log(userNameConnected)
    const userId = await getUserId(userNameConnected)
    const userPrefs = await getUserPrefs(userNameConnected)
    try{
        const userTags = await getUserTags(userId);
        console.log("=================")
        console.log(userTags[0])
        console.log(userTags[0])
        console.log("=================")
    }catch(err){
        console.log("----------------------")
        console.log(err)
        console.log("----------------------")
    }
    console.log(userId)
    console.log(userPrefs)
    // console.log(userTags)
    // console.log(userInfo)
}

router.get("/prefs", authToken, getUserData, (req, res) =>{
    ;
})

module.exports = router;