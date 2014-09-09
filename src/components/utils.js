'use strict';

module.exports = {
  /**
   * Given an interval time, the callback
   * function passed to this function factory
   * will just be called once within that
   * interval of time.
   */
  throttle (inter, cb) {
    var last = new Date((new Date()).getTime() - inter);

    return () => {
      if ((last.getTime() + inter) <= (new Date().getTime())) {
        last = new Date();

        return cb.apply(this, arguments);
      }
    }
  },

  /**
   * Obtains the slices that represent the
   * points in a given slider. E.G ([0----1---2]
   * would correspond to 0px, 50px, 100px if we
   * pass a width of 100px and 3 points to cut.)
   */
  getSlices (w, points) {
    var N = points.length;
    var increment = w /(N-1);
    var slices = [];

    if (N === 1)
      return [w/2|0];

    for (var i = 0; i < N; i++)
      slices.push(i * increment);

    return slices;
  },

  /**
   * Finds the nearest point given the current
   * distance.
   */
  getNearest (pos, points) {
    var c = points[0];

    for (var i = 0, N = points.length; i < N; i++)
      if (Math.abs(pos - points[i]) < Math.abs(pos - c))
        c = points[i];

    return c;
  },

  /**
   * Some utilities for dealing with
   * calculations regarding drag stuff.
   */
  Drag: {
    getMaxLeft: (e) => e.target.parentNode.offsetLeft,
    getMaxRight: (e, w, h) => e.target.parentNode.offsetLeft + w - h,
    normalize: (e) => e.clientX - e.target.parentNode.offsetLeft,
    exceedsLeft: (pos) => pos < 0,
    exceedsRight: (pos, w, h) => pos > w - h
  }
};
