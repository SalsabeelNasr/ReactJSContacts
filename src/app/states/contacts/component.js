import React from 'react';
import _ from 'lodash';
import cookie from '../../utils/cookies'
import router from '../../app.router';
import NavBar from '../navbar/component'
import ContactSegment from '../contactSegment/component'
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
                            this.setState({contacts:this.state.contacts.concat(json.data)});
                    }).catch(function(ex) {
                          console.log('failed', ex)
                    });
                      this.setState({offset:this.state.offset+1});
                  };
                };
             render (){

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
                                                    this.state.contacts.map(
                                                      function(contact,i){
                                                        return(
                                                          <ContactSegment key={contact.id} contact={contact}></ContactSegment>
                                                    );
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
