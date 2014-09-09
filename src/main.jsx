/**
 * @jsx React.DOM
 */

var React = require('react');
var Slider = require('./components/Slider.jsx');
var Items = require('./components/Items.jsx');

React.renderComponent(
  <div>
    <Slider points={[1,3,3,4]}
            width={500}
            height={30} />
    <Items />
  </div>,
	document.querySelector("#react-slider")
);
