import React from 'react';
import _ from 'lodash';
import cookie from '../../utils/cookies'

import router from '../../app.router';
export default class ContactsState extends React.Component {
  constructor(props) {
          super(props);
          this.state = {contacts: [],offset:0};
          this.handleLoadMore = this.handleLoadMore.bind(this);
          this.GetContacts = this.GetContacts.bind(this);
      };
             componentDidMount(){

                this.GetContacts();
             };
             handleLoadMore(event) {

                      this.GetContacts();
                }
             GetContacts(){
              var token =cookie.get('auth-token');
              if(token){
                token=token.replace(/['"]+/g, '');
                 var requestUrl ='https://internal-api-staging-lb.interact.io/v2/contacts?limit=4&offset='+this.state.offset;
                  fetch(requestUrl, {
                    method: "GET",
                    headers:  {
                                    'Accept':'application/json','authToken':token,'Connection':'keep-alive',
                                    'Access-Control-Allow-Origin':'*','Content-Type':'application/json'
                                    }
                    }).then(response=> {
                            return response.json();
                    }).then(json=>{
                            this.setState( (state) => {
                                        state.contacts = state.contacts.concat(json.data);
                                        return state;
                                    });
                    }).catch(function(ex) {
                          console.log('failed', ex)
                    });
                  };
                  this.setState({offset:this.state.offset+1});
                };
             render (){
                        function  PhoneNumbers({ phoneNumbers }) {
                                            const isNull = !phoneNumbers;
                                            const isEmpty = !isNull && !phoneNumbers.length;
                                            return (
                                                <div>
                                                    { isNull
                                                        ? <span><span className='glyphicon glyphicon-earphone'></span> no phone number</span>
                                                        : ( isEmpty
                                                            ? <span><span className='glyphicon glyphicon-earphone'></span> no phone number</span>
                                                            : <div>{phoneNumbers.filter((number, i) => (i < 1)).map(function(number,i){
                                                                return(<span key={i}><span className='glyphicon glyphicon-earphone'></span>
                                                                 {number.number}</span> ) })}</div>
                                                        )
                                                    }
                                                </div>
                                            );
                                        }
                        function ProfilePicture({profilePicture}){
                                    return(
                                        !profilePicture
                                        ? <img src='https://techreport.com/forums/styles/canvas/theme/images/no_avatar.jpg' alt="No Avatar" className='img-responsive img-circle ' />
                                        : <img src={profilePicture}  className='img-responsive img-circle ' />
                                    )
                        }
                        function ContactType({contactType}){
                                if(contactType=='COMPANY'){
                                    return(<span className='pull-right glyphicon glyphicon-briefcase'></span>)
                                    }else if(contactType=='PERSON'){
                                        return(<span className='pull-right glyphicon glyphicon-user'></span>)
                                    }
                        }
                        function Emails({ emails }) {
                           const isNull = !emails;
                           const isEmpty = !isNull && !emails.length;
                           return (
                               <div>
                                   { isNull
                                       ? <span><span className='glyphicon glyphicon-envelope'></span> no email</span>
                                       : ( isEmpty
                                           ? <span><span className='glyphicon glyphicon-envelope'></span>no email</span>
                                           : <div>{emails.filter((email, i) => (i < 1)).map(function(email,i){
                                               return(<span key={i}>
                                                 <span className='glyphicon glyphicon-envelope'></span>
                                                  {email.email}
                                                  </span> ) })}</div>
                                       )
                                   }
                               </div>
                           );
                         };
                     return (
                      <div>
                          <NavBar></NavBar>
                          <div className='container'>
                          <div className='col-xs-12 col-sm-offset-3 col-sm-6'>
                                   <div className='panel panel-default'>
                                             <div className='panel-heading c-list'>
                                                <span className='title'>Contacts</span>
                                            </div>
                                         <ul className='list-group' id='contact-list'>
                                           {
                                                    this.state.contacts.map(function(contact,i){
                                                        return( <ContactSegment key={contact.id}>
                                                            <div className='col-xs-12 col-sm-3 '>
                                                              <ProfilePicture profilePicture={contact.profilePicture} />
                                                           </div>
                                                           <div className='col-xs-12 col-sm-9 '>
                                                               <ContactType contactType={contact.contactType}/>
                                                             <span  className='name'>{contact.displayName}</span><br/>
                                                                 <span> <PhoneNumbers phoneNumbers={contact.phoneNumbers} /> </span>
                                                                 <span> <Emails emails={contact.emails} /> </span>
                                                            </div>
                                                                </ContactSegment>)
                                                    })
                                           }
                                           <div className='panel-footer c-list'>
                                                 <div className='col-md-offset-9'><button className='btn btn-default'  onClick={this.handleLoadMore}>load more</button> </div>
                                            </div>
                                        </ul>
                                    </div>
                                 </div>
                            </div>
                            </div>
                           ); 
                      }
}

var ContactSegment = React.createClass({
     render : function (){
                return (
                    <li className='list-group-item '>
                         {this.props.children}
                        <div className='clearfix '></div>
                   </li>
                );
            }
        });

var NavBar = React.createClass({
  getInitialState() {
      return { lastName:cookie.get('user') };
    },
  render:function(){
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
                                           {this.state.lastName.replace(/['"]+/g, '')}
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
});

export class LogoutButton extends React.Component {
            constructor(props) {
                    super(props);
                    this.handleLogout = this.handleLogout.bind(this);
                }
            handleLogout(event) {
                             router.go('login');
                                var requestBody ={authToken:"kss_0vUY1noqOQ4LfAK4TILoal"};
                               fetch('https://internal-api-staging-lb.interact.io/v2/logout/', {
                                method: 'POST',
                                headers:{
                                            'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*',
                                            'Accept':'application/json'
                                    },
                                body: JSON.stringify(requestBody)
                                }).then(response=> {
                                        console.log(response);
                                        cookie.remove('user');
                                        cookie.remove('auth-token');
                                }).then(()=>{
                                    router.go('login');
                                }).catch(function(ex) {
                                    console.log('failed ', ex)
                              });
                                 event.preventDefault();

                };
            render (){
                        return (
                        <a href="#" onClick={this.handleLogout}>Logout</a>
                        );
                    }
        };
