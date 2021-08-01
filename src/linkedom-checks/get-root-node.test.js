const { parseHTML } = require("linkedom");

    const { document } = parseHTML(`
    <html><head /><body>  
  <div class="js-parent">
  <div class="js-child"></div>
  </div>
  <div class="js-shadowHost"></div>
  </body></html>`);
  
    const parent = document.querySelector('.js-parent');
    const child = document.querySelector('.js-child');
    const shadowHost = document.querySelector('.js-shadowHost');
  
    console.log('should be document: ', parent.getRootNode().nodeName); // #document
    console.log('should be document: ', child.getRootNode().nodeName); // #document
  
  
    // create a ShadowRoot
    var shadowRoot = shadowHost.attachShadow({mode:'open'});
  
    shadowRoot.innerHTML = '<style>div{background:#2bb8aa;}</style>'
        + '<div class="js-shadowChild">content</div>';
    var shadowChild = shadowRoot.querySelector('.js-shadowChild');
  
    // The default value of composed is false
    console.log('shadowChild root should be shadow root: ', shadowChild.getRootNode() === shadowRoot); // true
    console.log('should be shadow root: ', shadowChild.getRootNode({composed:false}) === shadowRoot); // true
    console.log('shadowChild.getRootNode({composed:false}).nodeName = ', shadowChild.getRootNode({composed:false}).nodeName);
    console.log('should be document: ', shadowChild.getRootNode({composed:true}).nodeName); // #document