import React from 'react';
import router from '../../app.router';
import cookie from '../../utils/cookies'
export default class NavBar  extends React.Component {
  constructor(props) {
          super(props);
          this.state = {displayName:cookie.get('user')?cookie.get('user').replace(/['"]+/g, ''):null };

      }
  render(){
    return(
            <nav className="navbar navbar-default navbar-static-top" role="navigation">
              <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">ReactJS Contacts</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown" >
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                           {this.state.displayName}
                                            <span className="caret"></span></a>
                             <ul className="dropdown-menu">
                                          <li>  <LogoutButton> </LogoutButton> </li>
                                        </ul>
                       </li>

                    </ul>
                </div>
              </div>
            </nav>
          );
     }
}

export class LogoutButton extends React.Component {
            constructor(props) {
                    super(props);
                    this.handleLogout = this.handleLogout.bind(this);
                }
            handleLogout(event) {

                             var token =cookie.get('auth-token');
                             if(token != 'undefined' && token != null){
                                  token=token.replace(/['"]+/g, '');
                                  var requestBody ={authToken:token};
                                 fetch('https://internal-api-staging-lb.interact.io/v2/logout/', {
                                  method: 'POST',
                                  headers:{
                                              'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*',
                                              'Accept':'application/json'
                                      },
                                  body: JSON.stringify(requestBody)
                                  }).then(response=> {
                                    if(response.status == 204){
                                              cookie.remove('user');
                                              cookie.remove('auth-token');
                                              router.go('login');
                                          }
                                  });
                             };
                         router.go('login');
                         event.preventDefault();
                };
            render (){
                        return (
                        <a href="#" onClick={this.handleLogout}>Logout</a>
                        );
                    }
        };
