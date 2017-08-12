import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='app-wrapper'>
        {this.props.children}
      </div>
    );
  }
}

export default AppComponent;
