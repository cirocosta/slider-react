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
    var pip = utils.getSlices(this.props.width, this.props.points);
    pip[pip.length - 1] -= this.props.height;

		return {
			position: 0,
      pip: pip
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

    if (utils.Drag.exceedsLeft(pos) ||
        utils.Drag.exceedsRight(pos, w, h))
      return;

    var nearest = utils.getNearest(pos, this.state.pip);

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

    var points = this.state.pip.map((pxLeft) =>
      <span className="point"
            style={{
              transform: 'translate(' +
                          (pxLeft | 0) +
                        'px, 0px)'}}>
        {this.state.pip.indexOf(pxLeft)}
      </span>
    );

		return (
			<div className="Slider" style={sliderStyle}>
        <span draggable="true"
              style={selectorStyle}
              onDragStart={this.handleDragStart}
              onDrag={this.handleDrag}
              onDragEnd={this.handleDragEnd}>
        </span>
        {points}
			</div>
		);
	}
});

module.exports = Slider;
