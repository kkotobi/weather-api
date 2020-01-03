/**
 * This shouldn't be manipulated directly, please use measurement-model to access anything inside this object!!!
 * Object which holds the entire state of our app in-memory while it's running.
 * @type {{init: (function(): store), measurements: null}}
 */
const store = {
  init: function () {
    this.measurements = new Map();
    return this;
  },
  measurements: null,
};

export default store;