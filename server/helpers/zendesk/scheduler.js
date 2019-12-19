const zendeskDomain = 'https://hendersonephriam.zendesk.com'
const zendeskUser = 'henderson.ephriamn@gmail.com'
const token = 'UBAmHeLxRfcavAnMc5m2uq77c9hc4exkVaB'

const ZendeskAccessor = require('./zendesk-accessor')
const Zendesk = new ZendeskAccessor({
  domain: zendeskDomain,
  userEmail: zendeskUser,
  token 
})

const CronJob = require('node-cron').schedule

module.exports = new CronJob('0 0 * * * *', () => {
    Zendesk.pull()
    .then(() => {
        console.log(`Automated Pull Completed at: ${new Date().toLocaleString()}`)
    })
    .catch((err) => {
        console.log(`Automated Pull Failed at: ${new Date().toLocaleString()}`)
        console.log(err)
    })
})