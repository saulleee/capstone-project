import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import TripsIndexContainer from "./TripsIndexContainer";

const App = (props) => {
  return (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TripsIndexContainer} />
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;