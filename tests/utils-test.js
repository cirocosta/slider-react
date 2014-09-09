'use strict';

jest.dontMock('../src/components/utils');

describe('utils', () => {
  var utils;

  beforeEach(() => {
    utils = require('../src/components/utils');
  });

  describe('throttle', () => {
    var throttle;

    beforeEach(() => {
      throttle = utils.throttle;
    });

    it('be defined', () => {
      expect(!!throttle).toBe(true);
    });

    it('call once if other calls happen in the interval', () => {
      var mock = jest.genMockFunction();
      var tfunc = throttle(500, mock);

      tfunc();
      tfunc();
      tfunc();

      expect(mock.mock.calls.length).toEqual(1);
    });

    it('call twice if other execution happens after the interval', (done) => {
      var mock = jest.genMockFunction();
      var tfunc = throttle(100, mock);

      tfunc();
      tfunc();
      setTimeout(() => {
        tfunc();

        expect(mock.mock.calls.length).toEqual(2);
        done();
      }, 100);
    });
  });

  describe('getNearest', () => {
    var getNearest;

    beforeEach(() => {
      getNearest = utils.getNearest;
    });

    it('be defined', () => {
      expect(!!getNearest).toBe(true);
    });

    it('return the same point if only one', () => {
      var actual = getNearest(10, [5]);
      var expected = 5;

      expect(actual).toEqual(expected);
    });

    it('return the max if nearer to the max', () => {
      var actual = getNearest(10, [1, 13]);
      var expected = 13;

      expect(actual).toEqual(expected);
    });

    it('return the min if nearer to the min', () => {
      var actual = getNearest(3, [1, 13]);
      var expected = 1;

      expect(actual).toEqual(expected);
    });
  });

  describe('getSlices', () => {
    var getSlices;

    beforeEach(() => {
      getSlices = utils.getSlices;
    });

    it('be defined', () => {
      expect(!!getSlices).toBe(true);
    });

    it('return mid point if only one points', () => {
      var w = 100;
      var p = [1];

      var actual = getSlices(w, p);
      var expected = [50];

      expect(actual).toEqual(expected);
    });

    it('return extreme points if two points', () => {
      var w = 100;
      var p = [1, 2];

      var actual = getSlices(w, p);
      var expected = [0, 100];

      expect(actual).toEqual(expected);
    });

    it('return extreme and mid if three points', () => {
      var w = 100;
      var p = [1, 2, 3];

      var actual = getSlices(w, p);
      var expected = [0, 50, 100];

      expect(actual).toEqual(expected);
    });
  });
});
