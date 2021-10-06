const { parseHTML } = require("linkedom");
const { ModuleMocker } = require("jest-mock");
const NodeEnvironment = require("jest-environment-node");
const JestUtil = require("jest-util");
const VM = require("vm");

class LinkedomEnvironment extends NodeEnvironment {
  constructor(config, options) {
    super(config, options);
    const { window } = parseHTML(
      '<!doctype html><html lang="en"><head /><body /></html>'
    );
    this.global = window;

    window.location = {};

    Object.defineProperty(window.Node.prototype, "getRootNode", {
      enumerable: false,
      configurable: false,
      value: function () {
        let root = this;
        while (root.parentNode) root = root.parentNode;
        return root;
      },
    });

    this.moduleMocker = new ModuleMocker(this.global);
    VM.createContext(this.global);
    JestUtil.installCommonGlobals(this.global, config.globals);
  }

  async setup() {}

  async teardown() {
    this.global = null;
    this.moduleMocker = null;
  }

  runScript(script) {
    return script.runInContext(this.global);
  }

  getVmContext() {
    return this.global;
  }
}
module.exports = LinkedomEnvironment;
