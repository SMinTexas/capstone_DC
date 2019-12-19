import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";


import './card.styles.scss';
import { remove } from '../../redux/jwt-verification/actions'

class Card extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
      didLogout: false
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  handleLogoutClick(e) {
    this.props.dispatch1()
    this.setState({
      ...this.state,
      didLogout: true
    })
    console.log("did run")
  }

  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
    <section class="navigation">
      {this.state.didLogout ? <Redirect to='/' /> : null}
      <div class="nav-container">
        <div class="brand">
          <a href="#!"></a>
        </div>
        <nav>
          <div class="nav-mobile">
            <a id="nav-toggle" href="#!"><span></span></a>
          </div>
          <ul class="nav-list">
            <li>
              <a href="http://localhost:3000/tickets">Home</a>
            </li>
            <li>
              <a href="#!">About</a>
            </li>
            <li>
              <a href="#!">Resources</a>
            <ul class="nav-dropdown">
              <li>
                <a href="#!"></a>
              </li>
              <li>
                <a href="#!">Web Development</a>
              </li>
              <li>
                <a href="#!">Graphic Design</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="https://start.teamviewer.com/">TeamViewer</a>
          </li>
          <li>
            <a href="#!">Contact</a>
          </li>
          <li>
            <a onClick={e => this.handleLogoutClick()} >Logout</a>
          </li>
          </ul>
        </nav>
      </div>
    </section>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(remove())
    }
  }
}

export default connect(null, mapDispatchToProps)(Card)