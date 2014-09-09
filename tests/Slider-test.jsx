/**
 * @jsx React.DOM
 */

'use strict';

jest.dontMock('../src/components/Slider.jsx');

describe('Slider', function() {
  var React;
  var TestUtils;
  var Slider = require('../src/components/Slider.jsx');

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  it('be sane', function() {
    expect(!!Slider).toBe(true);
  });
});
