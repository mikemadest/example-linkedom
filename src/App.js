import logo from "./logo.svg";
import Content from "./Content/Content";
import "./App.css";

function App() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Content
        onAction={() => {
          setIsOpen(true);
        }}
      />
      {isOpen && <p>notification is here!</p>}
    </div>
  );
}

export default App;
