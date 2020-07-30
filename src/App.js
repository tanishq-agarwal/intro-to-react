import React,{useState} from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import {Router, Link} from "@reach/router";
import Details from "./Details";
import ThemeContext from "./ThemeContext";


const App = () => {
/*  return React.createElement(
    //.createElement sees what kind of element it has
    "div", // here it is div element
    {id: "something-important"},
    [
      // empty object which lists all the attributes (like ids) that you want to give the component
      React.createElement("h1", {}, "Adopt Me!"), //here is h1 element   , // whatever child element passed into it
      React.createElement(Pet, {
        name: "Luna",
        animal: "Dog",
        breed: "Havanese",
      }),
      React.createElement(Pet, {
        name: "Pepper",
        animal: "Bird",
        breed: "Havanese",
      }),
      React.createElement(Pet, {
        name: "Doink",
        animal: "Cat",
        breed: "Mixed",
      }),
    ]
  );
};
render(
  //it blows out the line "not rendered" from DOM element and calls App function
  React.createElement(App), //its a composite component which is fancy way of saying a component that you and I created
  document.getElementById("root")
);
*/
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value = {theme}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>;
      </div>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
