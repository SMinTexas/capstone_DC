import React from 'react';
import './team-zen.styles.scss'



class TeamZen extends React.Component  {
   render() {
       return(
           <div className='buttonmain'>
               <a className='teamvtag' href="https://start.teamviewer.com/en/main.aspx">
                    <button className='teamviewbutton'>Visit TemViewer</button>
                </a>
                <a className='zentag' href="https://hendersonephriam.zendesk.com/access/unauthenticated">
                    <button className='zenbutton'>Visit ZenDesk</button>
                </a>

           </div>
       );
   }
}

export default TeamZen;