const jwt = require('jsonwebtoken')
const models = require('../../models')
const bcrypt = require('bcrypt')

function verifyJWT (token, secret) {
	let decoded
	try {
			decoded = jwt.verify(token, secret)
	} catch {
			decoded = null
	} finally {
		if (!decoded) {
			return ({error: 'Invalid or broken token.'})
		}
		return models.User.findOne({
			where: {id: decoded.id},
			attributes: ['username','access_level_id', 'company_id']
		})
		.then((user) => {
			if (!user) return {isMatch: false};
			else {
				return ({
					isMatch: user.username === decoded.username,
					userData: {
						access_level_id: user.dataValues.access_level_id,
						company_id: user.dataValues.company_id
					}
				})
			}
		})
		.then(obj => {
			if (obj.isMatch) {
				return ({isTokenValid: true, userData: obj.userData})
		}
			else return ({isTokenValid: false});
		})
		.catch(err => {
			return ({error: 'Error occurred when verifying token.'})
		})
	}  
}

function checkPassword (passwordToCheck, storedPassword, user) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(passwordToCheck, storedPassword, async (err, isMatch) => {
			if (err) reject(err);
			else if (isMatch) {
				let accessLevel = await models.Access_Levels.findOne({
					where: {id: user.dataValues.access_level_id},
					attributes: ['access_desc']
				})
				console.log(accessLevel)
				resolve({
					token: await jwt.sign({username: user.username, id: user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'12h'}),
					userData: {
						access_level_id:user.dataValues.access_level_id,
						company_id:user.dataValues.company_id,
						hasElevatedPermissions: accessLevel.access_desc === 'admin' || accessLevel.access_desc === 'superuser'
					}
				})
			} else {
				resolve({error: 'Could not sign in.'})
			}
		})
	}) 
}


module.exports = {
	verifyJWT,
	checkPassword,
}