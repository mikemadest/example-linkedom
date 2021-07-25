const { parseHTML } = require("linkedom");
const NodeEnvironment = require("jest-environment-node");
const getComputedStyle = require("./get-computed-style-polyfill");

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

    if (!dom.getComputedStyle) {
      Object.defineProperty(dom, "getComputedStyle", {
        value: getComputedStyle,
      });
    }

    // if (!dom.Node.getRootNode) {
    //   Object.defineProperty(dom.Node.prototype, "getRootNode", {
    //     enumerable: false,
    //     configurable: false,
    //     value: getRootNode,
    //   });
    // }

    this.global.window = dom;
    this.global.document = dom.document;
    this.global.navigator = dom.navigator;
  }
}

module.exports = LinkedomEnvironment;
