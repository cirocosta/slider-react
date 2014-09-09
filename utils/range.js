var generator = valueCb => {
  return () => {
    var i = 0;

    return {
      next : () => valueCb(i++);
    }
  }();
};

module.exports = generator;
