var React = require('react');
var ReactDom = require('react-dom');
var App = require('./components/App');
var css = require('./css/styles.scss');

if(typeof window !== 'undefined') {
ReactDom.render(
  <App />,
  document.getElementById("app")
);
}
