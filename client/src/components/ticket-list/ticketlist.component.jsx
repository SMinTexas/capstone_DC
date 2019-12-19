import React from 'react'
import Axios from 'axios';
import Ticket from '../ticket/ticket.component.jsx';
import {connect} from 'react-redux'
// import './ticket.styles.scss'

class TicketList extends React.Component {

  constructor(props) {
      super(props)
      this.state = { 
        tickets: [], 
        resultsPerPage:50,
        page:0
      }
      // this.retrieveTickets()
  }

  retrieveTickets() {
    Axios.post(`/api/tickets/${this.state.resultsPerPage}/${this.state.page}`,{token:this.props.jwt.token})
    .then(response => {
        if (response.error) return false
        this.setState({
          ...this.state,
          tickets: response.data
        })
    })
  }

  componentDidMount () {
    this.retrieveTickets()
  }

  componentDidUpdate ( _, prevState) {
    if (this.state.resultsPerPage !== prevState.resultsPerPage || this.state.page !== prevState.page) {
      this.retrieveTickets()
    }
  }

  handlePaginationClick(e) {
    this.setState({
      ...this.state,
      resultsPerPage: Number(e.target.name)
    })
  }

  handleChangePageClick(e) {
    let page = () => {
      if (e.target.name === 'previous') {
        if(this.state.page - 1 < 0) return 0;
        else return this.state.page - 1
      } else if (e.target.name === 'next') {
        return this.state.page + 1
      }
    }
    this.setState({
      ...this.state,
      page: page()
    })
  }

  render () {

      const tickets = this.state.tickets.map((ticket) => {
        return(
          <Ticket key={ticket.id} ticket={ticket}/>
          )
      })

      return (
          <>
          <table>
            <thead>
              <tr>
                <th>Zendesk ID</th>
                <th> </th>
                <th> </th>
                <th>Subject</th>
                <th>Status</th>
                <th>Report #</th>
                <th>Incident Date</th>
                <th>Company</th>
                <th>Platform</th>
              </tr>
            </thead>
            <tbody>
              {tickets}
            </tbody>
            <tbody>
              <tr>
                <td colSpan='9' >
                  <p>
                    <button type='button' href="" name='10' onClick={e => this.handlePaginationClick(e) }>10</button>  <button type='button' href="" name='50' onClick={e => this.handlePaginationClick(e) }>50</button>  <button type='button' href="" name='100' onClick={e => this.handlePaginationClick(e) }>100</button> Per Page
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan='9'>
                  <button type='button' name='previous' onClick={e => this.handleChangePageClick(e)}>Previous Page</button>
                  <button type='button' name='next' onClick={e => this.handleChangePageClick(e)}>Next Page</button>
                </td>
              </tr>
            </tbody>
          </table>
          </>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    jwt: state.jwt
  }
}


export default connect(mapStateToProps)(TicketList)