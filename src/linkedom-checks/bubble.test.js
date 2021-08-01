const { parseHTML } = require("linkedom");

    const { document, Event } = parseHTML(`<html>
    <head />
    <body>
      <div id="container">
        <div id="parent">
          <button id="target" type="button">Click Me!</button>
        </div>
      </div>
    </body>
  </html>`);

  const container = document.getElementById("container");
  const parent = document.getElementById("parent");
  const target = document.getElementById("target");

  const showCompose = (path) => {
      return path.map(element => `${element.nodeName}${element.id ? `#${element.id}`: ''}`);
  }

  const listener = (event) => {
    console.log('----------------------');
    console.log("event.currentTarget = ", event.currentTarget.nodeName);
    console.log("event.target = ", event?.target?.nodeName);
    console.log("event.composedPath = ", event?.composedPath && showCompose(event?.composedPath()));
  };

  target.addEventListener("click", listener);
  parent.addEventListener("click", listener);
  container.addEventListener("click", listener);
  document.body.addEventListener("click", listener);
  document.addEventListener("click", listener);

  target.dispatchEvent(new Event("click", { bubbles: true }));