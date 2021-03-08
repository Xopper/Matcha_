const router = require("express").Router()
const jwt = require("jsonwebtoken")

const isEmpty = obj => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
};


router.post('/authTokenValidation', (req, res)=>{
    const errors = {}
    const backEndRes = {}

    if (req.body.authToken){
        jwt.verify(req.body.authToken, 'boul3al7ayat7obilanamnghirakma3ichach7obi00', (err, user) => {
            if (err)
                errors.authKey = "The token is not valid"
        });
    }
    if (!isEmpty(errors))
    {
        backEndRes.error = errors
        backEndRes.status = 1
        res.send(backEndRes)
    }else{
        backEndRes.status = 0
        res.send(backEndRes)
    }
})

module.exports = router