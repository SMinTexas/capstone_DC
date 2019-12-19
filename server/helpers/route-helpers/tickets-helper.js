const models = require('../../models')
const Ops = require('sequelize').Op;

function buildTicketQuery(pageSize, page, accessLevelId, companyId) {
	return new Promise((resolve, reject) => {
		models.Access_Levels.findOne({where: {id: accessLevelId}})
		.then(accessLevel => {
			let query = {
				limit: pageSize,
				offset: pageSize * page, 
			}
		
			if (accessLevel.access_desc !== 'admin' && accessLevel.access_desc !== 'superuser') {
				query = {
					...query,
					where: {
						...query.where,
						approveDate: {[Ops.not]: null},
						company_id: companyId,
					}
				}
			}
		
			resolve(query)
		})
	})
}

function addCompanyToTickets(tickets) {
	return new Promise((resolve, reject) => {
		let ticketPromises = tickets.map((ticket) => {
		// Return a promise to find and insert the company name into each ticket.
			return models.Company.findOne({
				where:{id: ticket.company_id,},
				attributes: ['company_name']
			})
			.then(company => {
				// Insert company name into ticket.
				ticket.dataValues.company = company.company_name
				return ticket
			})
		})
		
		resolve(Promise.all(ticketPromises))
	})
}

module.exports = {
    buildTicketQuery,
    addCompanyToTickets
}