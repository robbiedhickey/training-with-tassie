var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Test App</h1>
        <div>This is my test!</div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));

module.exports = App;
