'use strict';

var ReactTools = require('react-tools');

module.exports = {
  process: function (src, path) {
    if (!path.match(/\.(js|jsx)$/))
      return src;

    return ReactTools.transform(src, {harmony: true});
  }
};
