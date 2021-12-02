import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import history from "./history";
import TripsIndexContainer from "./TripsIndexContainer";
import TripShowContainer from "./TripShowContainer";

const App = () => {
  return (
  <div>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={TripsIndexContainer} />
        <Route exact path="/trips" component={TripsIndexContainer} />
        <Route exact path="/trips/:id" component={TripShowContainer} />
      </Switch>
    </Router>
  </div>
  );
}

export default App;