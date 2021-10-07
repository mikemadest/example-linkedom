const { parseHTML } = require("linkedom");
const NodeEnvironment = require("jest-environment-node");
const VM = require("vm");

class LinkedomEnvironment extends NodeEnvironment {
  constructor(config, options) {
    super(config, options);
    const { window } = parseHTML(
      '<!doctype html><html lang="en"><head /><body /></html>'
    );
    this.global = window;
    VM.createContext(this.global);
  }

  async setup() {}

  async teardown() {
    this.global = null;
  }

  runScript(script) {
    return script.runInContext(this.global);
  }

  getVmContext() {
    return this.global;
  }
}
module.exports = LinkedomEnvironment;
