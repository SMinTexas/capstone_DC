const express = require('express');
const router = express.Router();
const models = require('../models')
const userHelpers = require('../helpers/route-helpers/users-helper')
const ticketHelpers = require('../helpers/route-helpers/tickets-helper')


const zendeskDomain = 'https://hendersonephriam.zendesk.com'
const zendeskUser = 'henderson.ephriamn@gmail.com'
const zendeskToken = 'UBAmHeLxRfcavAnMc5m2uq77c9hc4exkVaB'

const ZendeskAccessor = require('../helpers/zendesk/zendesk-accessor')
const Zendesk = new ZendeskAccessor({
	domain: zendeskDomain,
	userEmail: zendeskUser,
	token: zendeskToken 
})





/* GET home page. */
router.post('/:pageSize/:page', async function(req, res, next) {
	const pageSize = Number(req.params.pageSize)
	const page = Number(req.params.page)

	const decoded = await userHelpers.verifyJWT(req.body.token, process.env.ACCESS_TOKEN_SECRET)

	models.Tickets.findAll(await ticketHelpers.buildTicketQuery(pageSize, page, decoded.userData.access_level_id, decoded.userData.company_id))
	.then(tickets => {
		return ticketHelpers.addCompanyToTickets(tickets)
	})
	.then(ticketsWithCompany => {
		res.json(ticketsWithCompany)
	})
});

router.get('/pull', async (req, res) => {
	Zendesk.pull()
	res.statusCode == 204
	res.send()
})

module.exports = router;
