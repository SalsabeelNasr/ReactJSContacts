import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginState from './states/login/component';
import ContactsState from './states/contacts/component';

import * as config from './app.config';
import AppComponent from './app.component';
 
render((
  <MuiThemeProvider>
    <Router history={ browserHistory }>
      {/* Main Route */}
      <Route path='/' component={ AppComponent }>
        <IndexRedirect to='/login' />

        <Route
          path='login'
          name='login'
          component={ LoginState }>
        </Route>

        <Route
          path='contacts'
          name='contacts'
          component={ ContactsState }>
        </Route>

      </Route>
    </Router>
  </MuiThemeProvider>
), document.getElementsByTagName('AppRoot')[0]);
