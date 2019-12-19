import React from 'react';
import './ticket.styles.scss'

export default class Ticket extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {  
          isExpanded:false,
        }
    }

    handleRowClick(e) {
        this.setState({
          ...this.state,
          isExpanded: !this.state.isExpanded
        })
      }
    
    render() {

        const incidentDate = new Date(this.props.ticket.incidentDate).toLocaleString()

        const ExpandedPane = ((props) => {
            
            if (props.isExpanded) {
              return (
                <tr>
                  <td colSpan='9' >
                    <div>
                      <h2>
                        {props.ticket.subject} - {incidentDate}
                      </h2>
                      <div>
                        <p>
                          {props.ticket.description}
                        </p>
                        <a href={"https://hendersonephriam.zendesk.com/agent/tickets/" + props.ticket.zendesk_id} 
                        target='_blank' rel='noopener noreferrer' >View on Zendesk</a>
                        <a href="https://start.teamviewer.com/">Open TeamView</a>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            } 
            else return null
          })

          return (
            <React.Fragment >
            <tr className="ticket-row" onClick={e => this.handleRowClick(e)}>
              <td >
                {this.props.ticket.zendesk_id}
              </td>
              <td>
              <button type='button' name='down' onClick={e => this.handleRowClick(e)}>=></button>
              </td>
              <td>
                  <p></p>
              </td>
              <td>
                {this.props.ticket.subject}
              </td>
              <td>
                {this.props.ticket.status}
              </td>
              <td>
                {this.props.ticket.reportNum}
              </td>
              <td>
                {incidentDate}
              </td>
              <td>
                {this.props.ticket.company}
              </td>
              <td>
                {this.props.ticket.platform}
              </td>
            </tr>
            <ExpandedPane ticket={this.props.ticket} isExpanded={this.state.isExpanded}/>
          </React.Fragment>
          )
    }
}
