import React from 'react'
import { render } from 'react-dom'

const Context = React.createContext();

function Parent() {
  return (
    <div>
      <h1>Parent</h1>
      <Child />
    </div>
  );
}

function Child() {
  return (
    <div>
      <h1>Child</h1>
      <GrandChild />
    </div>
  );
}

function GrandChild() {
  return (
    <Context.Consumer>
      {(name) => (
        <div>
          <h1>GrandChild</h1>
          <h3>Name: {name}</h3>
        </div>
      )}
    </Context.Consumer>
  );
}

class App extends React.Component {
  render() {
    const name = "Enea";
    return (
      <Context.Provider value={name}>
        <Parent />
      </Context.Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
