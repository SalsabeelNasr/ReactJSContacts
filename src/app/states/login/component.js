import React from 'react';
import router from '../../app.router';
import cookie from '../../utils/cookies'
export default class LoginState extends React.Component {
  constructor(props) {
    super(props);
     this.state =  {username: '',password:'',
     formErrors: {email: '', password: ''},
     usernameValid: false,
     passwordValid: false };
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleUsernameChange = this.handleUsernameChange.bind(this);
     this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  handleUsernameChange(event) {
       this.setState({username: event.target.value});
       if(event.target.value !=='' &&
       event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !=null){
            this.setState({usernameValid:true});
       }
       else{
            this.setState({usernameValid:false});
       }
     }
   handlePasswordChange(event) {
      this.setState({password: event.target.value});
           if(event.target.value != ''){
            this.setState({passwordValid:true});
       }
       else{
            this.setState({passwordValid:false});
       }
    }
    handleSubmit(event) {
        if(this.state.usernameValid == true && this.state.passwordValid == true){
          var requestBody = {
                              username: this.state.username,
                              password: this.state.password,
                              client: "Contacts"
                                              } ;
              fetch('https://internal-api-staging-lb.interact.io/v2/login/', {
                          method: 'POST',
                          headers:{
                                      'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*',
                                      'Accept':'application/json'
                              },
                          body: JSON.stringify(requestBody)
                          }).then(response=> {
                                   return response.json();
                          }).then(json=>{
                               cookie.save('auth-token',json.token.authToken,true);
                               cookie.save('user',
                               json.user.firstName    +' '+
                               json.user.lastName
                               ,true);
                          }).then(()=>{
                            router.go('contacts');
                          }).catch(function(ex) {
                          console.log('failed ', ex)
                          });
                        event.preventDefault();
      }
    }

  render() {
    return (
      <div className='col-md-12'>
          <div className='modal-dialog'>
              <div className='panel panel-default'>
                          <div className='panel-heading'>
                              <h3 className='panel-title'>Login</h3>
                          </div>
                          <div className='panel-body'>
                          <form onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        <div className='form-group'>
                                            <input required className='form-control' placeholder='E-mail' name='email'
                                             type='email'
                                            value={this.state.username} onChange={this.handleUsernameChange}/>
                                        </div>
                                        <div className='form-group'>
                                            <input required className='form-control' placeholder='Password' name='password' type='password'
                                         value={this.state.password} onChange={this.handlePasswordChange}  />
                                        </div>
                                       <input type='submit' disabled={!this.state.usernameValid ||!this.state.passwordValid } className='btn btn-sm btn-success pull-right' value='submit'/>
                                    </fieldset>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}
