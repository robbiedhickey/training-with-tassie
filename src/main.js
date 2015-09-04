var React = require('react');

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Test App</h1>
        <div>es6</div>
      </div>
    );
  }
}

React.render(<App />, document.getElementById('app'));
