import React from "react";
// import styles from "./styles.modules.css";
import { Switch, Route } from "react-router-dom";
import { Meme } from "../Meme/Meme";
import { MemeGenerated } from "../MemeGenerated/MemeGenerated";
export const App = () => {
  return (
    <div>
      <h1>Memezan </h1>
      <Switch>
        <Route exact path="/">
          <Meme />
        </Route>
        <Route path="/generated">
          <MemeGenerated />
        </Route>
      </Switch>
    </div>
  );
};
