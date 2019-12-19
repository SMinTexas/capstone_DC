const axios = require('axios')
const models = require('../../models')

module.exports = class accessor {
    constructor(obj) {
        this.domain = obj.domain
        this.user = obj.userEmail
        this.token = obj.token
        this.apiUrl = this.domain + '/api/v2'
    }

    async get(params) {
        let payload = await axios.get(this.apiUrl + '/tickets.json?sort_by=updated_at&sort_order=desc', {
            auth: {
                username: this.user,
                password: this.token
            }
        })

        function findCustomFieldValue (fieldName, fieldsArr) {
            let fieldIds = {
                bopxTech:360030849313,
                reportNum:360030849093,
                custContact:360030849353,
                classification:360030853214,
                platform:360030853514,
                incidentDate:360030853274,
                resolution:360030853614,
                client:360031053874,            
            }
            
            let filteredArr = fieldsArr.filter((field) => {
                return (field.id == fieldIds[fieldName])
            })
            if (filteredArr.length > 1) throw new Error("Custom Fields contain 2 or more fields with identical ids.")
            if (filteredArr.length < 1) throw new Error("No fields were returned.")
            return filteredArr[0].value
        }

        let newEntries = Promise.all(
            payload.data.tickets.map(async (ticket) => {
                return await models.Company.findOne({where: {zendeskName: findCustomFieldValue('client', ticket.fields)}})
                .then(company => {
                    return company.id})
                .then(companyId => ({
                    data:{
                        zendesk_id: ticket.id,
                        subject: ticket.subject,
                        description: ticket.description,
                        priority: ticket.priority,
                        status: ticket.status,
                        bopxTech: findCustomFieldValue("bopxTech", ticket.fields),
                        reportNum: findCustomFieldValue("reportNum", ticket.fields),
                        custContact: findCustomFieldValue("custContact", ticket.fields),
                        classification: findCustomFieldValue("classification", ticket.fields),
                        platform: findCustomFieldValue("platform", ticket.fields),
                        incidentDate: new Date(findCustomFieldValue("incidentDate", ticket.fields)),
                        resolution: findCustomFieldValue("resolution", ticket.fields),
                        company_id: companyId
                    },
                    meta:{
                        updated_at: ticket.updated_at
                    }
                }))
            })
        )

        return newEntries
    }

    async pull(params) {
        let tickets = await this.get()
        let ticketsFromDb = tickets.map(async ticket => {
            return await models.Tickets.findOne({where: {zendesk_id: ticket.data.zendesk_id}})
        })

        return Promise.all(ticketsFromDb)
        .then(ticketsFromDb => {
            let newlyModifiedTickets = tickets.filter((ticket, index) => {
                if (!ticketsFromDb[index]) {
                    console.log('Ticket doesn\'t exist!')
                    return true
                } else if (ticketsFromDb[index].updatedAt < new Date(ticket.meta.updated_at)) {
                    console.log('Zendesk ticket is newer!')
                    return true
                } else {
                    console.log('Zendesk ticket is older!')
                    return false
                }
            })
            if (newlyModifiedTickets.length < 1) return false
            newlyModifiedTickets.forEach(ticket => {
                models.Tickets.upsert(ticket.data)
            })
            return true
        })

    }

    
}