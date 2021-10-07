const { parseHTML } = require("linkedom");
const NodeEnvironment = require("jest-environment-node");

class LinkedomEnvironment extends NodeEnvironment {
  constructor(config, options) {
    super(config, options);
    const dom = parseHTML(
      '<!doctype html><html lang="en"><head /><body /></html>'
    );

    dom.location = {};

    Object.defineProperty(dom.Node.prototype, "getRootNode", {
      value: function () {
        let root = this;
        while (root.parentNode) root = root.parentNode;
        return root;
      },
    });

    this.global.window = dom;
    this.global.document = dom.document;
    this.global.navigator = dom.navigator;
  }
}
module.exports = LinkedomEnvironment;
