import React from 'react';
import './homepage.styles.scss'
import SignIn from '../../components/login/login.component'
import logo from '../../assets/logo.png'



class HomePage extends React.Component {

  render() {

    return(

    <>
    <div className='logo-main'>
      <img src={logo} className="company-logo" alt="logo" />
    </div>
    
      <div className="homepage">
          <SignIn/>
      </div>
    
    </>

    );
  }
}

export default HomePage;