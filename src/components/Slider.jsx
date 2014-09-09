/**
 * @jsx React.DOM
 */

'use strict';

require('./Slider.css');
var React = require('react');
var utils = require('./utils');

/**
 * The slider component
 */
var Slider = React.createClass({
	propTypes: {
		points: React.PropTypes.array.isRequired,
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
    onPoint: React.PropTypes.func
	},

	getInitialState () {
		return {
			position: 0
		}
	},

	handleDrag (e) {
		var pos = utils.Drag.normalize(e);
		var w = this.props.width;
		var h = this.props.height;

		if (utils.Drag.exceedsLeft(pos) ||
				utils.Drag.exceedsRight(pos, w, h))
			return;

		this.setState({
			position: pos
		});
	},

  handleDragEnd (e) {
    var pos = utils.Drag.normalize(e);
    var w = this.props.width;
    var h = this.props.height;
    var pip = utils.getSlices(w, this.props.points);
    pip[pip.length - 1] -= h;

    if (utils.Drag.exceedsLeft(pos) ||
        utils.Drag.exceedsRight(pos, w, h))
      return;

    var nearest = utils.getNearest(pos, pip);

    if (this.props.onPoint)
      this.props.onPoint(pip.indexOf(nearest));

    this.setState({
      position: nearest
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
							onDragEnd={this.handleDragEnd}>
				</span>
			</div>
		);
	}
});

module.exports = Slider;
