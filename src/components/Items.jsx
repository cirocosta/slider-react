/**
 * @jsx React.DOM
 */

'use strict';

require('./Items.css');
var React = require('react/addons');

var Item = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    number: React.PropTypes.number.isRequired
  },

  componentDidUpdate: function (prevProps) {
    var elem = this.getDOMNode();

    elem.classList.remove('highlight');

    if (prevProps.number !== this.props.number) {
      elem.classList.add('highlight-yellow');
      setTimeout(() => {
        elem.classList.add('highlight');
        elem.classList.remove('highlight-yellow')
      },0);
    }
  },

  render: function () {
    return (
      <li className="Item" key={this.props.id}>{this.props.number}</li>
    );
  }
});

var Items = React.createClass({
  getInitialState: function () {
    return {
      items: [1, 2, 3, 4]
    }
  },

  handleClick: function () {
    var items = this.state.items.slice();
    items[Math.random () * items.length | 0] = Math.random() * 100 | 0;

    this.setState({
      items: items
    });
  },

  render: function () {
    var items = this.state.items.map((item, i) => <Item id={i} key={i} number={item} />);

    return (
      <div>
        <button onClick={this.handleClick}>Update!</button>
        <ul>
          {items}
        </ul>
      </div>
    )
  }
});

module.exports = Items;
