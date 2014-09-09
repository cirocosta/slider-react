/**
 * @jsx React.DOM
 */

'use strict';

require('./Slider.css');
var React = require('react');

/**
 * Auxiliary functions for getting the positions
 * of the slider.
 */
var DragUtils = {
	getMaxLeft: (e) => e.target.parentNode.offsetLeft,
	getMaxRight: (e, w, h) => e.target.parentNode.offsetLeft + w - h,
	normalize: (e) => e.clientX - e.target.parentNode.offsetLeft,
	exceedsLeft: (pos) => pos < 0,
	exceedsRight: (pos, w, h) => pos > w - h
};

/**
 * The slider component
 */
var Slider = React.createClass({
	propTypes: {
		points: React.PropTypes.array.isRequired,
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
    onPointTime: React.PropTypes.func
	},

	getInitialState () {
		return {
			position: 0
		}
	},

  // componentWillMount () {
  //   this.props.points
  // },

	handleDrag (e) {
		var pos = DragUtils.normalize(e);
		var w = this.props.width;
		var h = this.props.height;

		if (DragUtils.exceedsLeft(pos) ||
				DragUtils.exceedsRight(pos, w, h))
			return;

		this.setState({
			position: pos
		});
	},

	render () {
		var sliderStyle = {
			width: this.props.width,
			height: this.props.height
		};

		var selectorStyle = {
			transform: 'translate(' + this.state.position + 'px, 0px)',
			height: this.props.height,
			width: this.props.height
		};

		return (
			<div className="Slider" style={sliderStyle}>
				<span draggable="true"
							style={selectorStyle}
							onDragStart={this.handleDragStart}
							onDrag={this.handleDrag}
							onDragEnd={this.handleDrag}>
				</span>
			</div>
		);
	}
});

module.exports = Slider;
