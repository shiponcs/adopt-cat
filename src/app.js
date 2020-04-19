import React, { useState } from "react";
import ReactDOM from "react-dom";
import SearchBoards from "./SearchBoard";
import Details from "./Details";
import { Router, Link } from "@reach/router";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("skyblue");

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <header>
          <Link to="/">
            <h1>Adopt Cat</h1>
          </Link>
        </header>
        <Router>
          <SearchBoards path="/" />
          <Details path="details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
