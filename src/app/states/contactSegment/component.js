import React from 'react';

export default class ContactSegment extends React.Component {
  constructor(props) {
          super(props);
          this.state = {contact: this.props.contact};
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
                                if(contactType =='COMPANY'){
                                    return(<span className='pull-right glyphicon glyphicon-briefcase'></span>)
                                    }else if(contactType=='PERSON'){
                                        return(<span className='pull-right glyphicon glyphicon-user'></span>)
                                    }else {
                                      return(null);
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
                                   <li className='list-group-item '>
                                    <div className='col-xs-12 col-sm-3 '>
                                               <ProfilePicture profilePicture={this.state.contact.profilePicture} />
                                                </div>
                                                <div className='col-xs-12 col-sm-9 '>
                                                    <ContactType contactType={this.state.contact.contactType}/>
                                                    <span  className='name'>{this.state.contact.displayName}</span><br/>
                                                    <span> <PhoneNumbers phoneNumbers={this.state.contact.phoneNumbers} /> </span>
                                                    <span> <Emails emails={this.state.contact.emails} /> </span>
                                       </div>
                             <div className='clearfix '></div>
                          </li>)

                      }
                    }
