import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import injectTapEventPlugin from 'react-tap-event-plugin';

import LoginState from './states/login/component';
import ContactsState from './states/contacts/component';
//import LogoutState from './states/logout/component';
//import DashboardState from './states/dashboard/component';
//import TalkingPointsState from './states/dashboard/states/talking-points/component';
//import TalkingPointState from './states/dashboard/states/talking-point/component';
//import TermsState from './states/dashboard/states/terms/component';
//import TermState from './states/dashboard/states/term/component';
//import ReasoningCirclesState from './states/dashboard/states/reasoning-circles/component';
//import ReasoningCircleState from './states/dashboard/states/reasoning-circle/component';

import * as config from './app.config';
import AppComponent from './app.component';

//injectTapEventPlugin(); // for onTouchTap()

// bootstrap react
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
