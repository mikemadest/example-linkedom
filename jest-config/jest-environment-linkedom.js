const { parseHTML } = require("linkedom");
const NodeEnvironment = require("jest-environment-node");
const getComputedStyle = require("./get-computed-style-polyfill");
const getRootNode = require("./get-root-node-polyfill");

 const localStorage = {
  data: {},
  setItem(id, val) {
    this.data[id] = String(val);
    return true;
  },
  getItem(id) {
    // eslint-disable-next-line no-prototype-builtins
    return this.data.hasOwnProperty(id) ? this.data[id] : undefined;
  },
  removeItem(id) {
    return delete this.data[id];
  },
  clear() {
    this.data = {};
    return true;
  },
};


/**
 * source:
 *  https://gist.github.com/stephenh/056a500708243e2ea43246c28d19d3ae
 * */
class LinkedomEnvironment extends NodeEnvironment {
  constructor(config, options) {
    super(config, options);
    const dom = parseHTML(
      '<!doctype html><html lang="en"><head /><body /></html>'
    );

    // linkedom don't define window.location
    if (!dom.location) {
      Object.defineProperty(dom, "location", {
        value: { protocol: "http" },
      });
    }

    if (!dom.localStorage) {
      Object.defineProperty(dom, 'localStorage', {
        value: localStorage,
      });
    }

    // to be removed when this is fixed in linkedom
    Object.defineProperty(dom.Node.prototype, "getRootNode", {
      enumerable: false,
      configurable: false,
      value: getRootNode,
    });

    if (!dom.getComputedStyle) {
      Object.defineProperty(dom, "getComputedStyle", {
        value: getComputedStyle,
      });
    }

    this.global.window = dom;
    this.global.document = dom.document;
    this.global.navigator = dom.navigator;
  }
}

module.exports = LinkedomEnvironment;
