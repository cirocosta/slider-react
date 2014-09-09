/**
  * @jsx React.DOM
  */

'use strict';

var React = require('react');
var Controls = React.createClass({
  render () {
    return (
      <div className="Controls">
        <span>PREV</span>
        <span>NEXT</span>
      </div>
    );
  }
});

module.exports = Controls;
