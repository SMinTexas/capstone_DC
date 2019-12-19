import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import TicketsHome from './pages/tickets/ticketHome';


const PrivateRoute = ({component: Component, ...rest}) => (    
  <Route {...rest} render={(props) => (
      rest.isAuthenticated === true
  ? <Component {...props} />
  : <Redirect to='/'/>
    )}/>
)

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <PrivateRoute path='/tickets' exact component={TicketsHome} isAuthenticated={this.props.jwt.isAuthenticated}/>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jwt: state.jwt
  }
}

export default connect(mapStateToProps)(App)
