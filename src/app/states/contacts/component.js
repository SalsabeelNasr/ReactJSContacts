import React from 'react';
import _ from 'lodash';
import cookie from '../../utils/cookies'
import router from '../../app.router';
import NavBar from '../navbar/component'

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
              if(token != 'undefined' && token != null){
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
                      this.setState({offset:this.state.offset+1});
                  };
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
                                                        return(
                                                           <li className='list-group-item ' key={contact.id}>
                                                                <div className='col-xs-12 col-sm-3 '>
                                                                  <ProfilePicture profilePicture={contact.profilePicture} />
                                                               </div>
                                                               <div className='col-xs-12 col-sm-9 '>
                                                                   <ContactType contactType={contact.contactType}/>
                                                                 <span  className='name'>{contact.displayName}</span><br/>
                                                                     <span> <PhoneNumbers phoneNumbers={contact.phoneNumbers} /> </span>
                                                                     <span> <Emails emails={contact.emails} /> </span>
                                                                </div>
                                                                <div className='clearfix '></div>
                                                            </li>)
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
