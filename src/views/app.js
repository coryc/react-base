import React, { PropTypes } from 'react';
//import { Link, IndexLink } from 'react-router';


class App extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <div>nav</div>
        <div id="app-view">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
