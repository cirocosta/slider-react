/**
 * @jsx React.DOM
 */

var React = require('react');
var Slider = require('./components/Slider.jsx');

React.renderComponent(
	<Slider points={[1,2,3,4]} width={500} height={30} />,
	document.querySelector("#react-slider")
);
