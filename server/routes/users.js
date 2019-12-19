var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt')
require('dotenv').config()

const helpers = require('../helpers/route-helpers/users-helper')


/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/login', (req, res) => {
	models.User.findOne({
		where: {username: req.body.username}
	})
	.then((user) => {
		if (!user) return {error: 'Could not sign in.'}
		return helpers.checkPassword(req.body.password, user.password, user)
	})
	.then(response => {
		res.json(response)
	})
	.catch( err => {
		res.statusCode = 500
		res.json(err)
	})

})


router.post('/new', (req, res) => {
	models.User.findOne({
		where: {username: req.body.username},
		attributes: ['id', 'username']
	})
	.then(async (user) => {
		if (typeof user !== 'object' && !user) res.json({
			message:'User already exists!',
			existingUser: user
		});
		else {
		models.User.create({
			username: req.body.username,
			password: await bcrypt.hash(req.body.password, 10),
			createdAt: new Date(),
			updatedAt: new Date(),
			company_id: req.body.company_id,
			access_level_id: req.body.access_level_id
		})
		.then(user => res.json({
			message: 'User created'}))
		}
	})
})

router.post('/verify', (req, res) => {
	const decoded = helpers.verifyJWT(req.body.token, process.env.ACCESS_TOKEN_SECRET)
	if (!decoded) {
		res.statusCode = 500
		res.json({error: 'Invalid or broken token.'})
		return false
	}
	models.User.findOne({
		where: {id: decoded.id},
		attributes: ['id', 'username', 'access_level_id', 'company_id']
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
		res.json({isTokenValid: true, userData: obj.userData})
	}
		else res.json({isTokenValid: false});
	})
	.catch(err => {
		res.statusCode = 500;
		res.json({error: 'Error occurred when verifying token.'})
	})
})


module.exports = router
