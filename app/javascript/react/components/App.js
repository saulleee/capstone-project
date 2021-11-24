import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import TripsIndexContainer from "./TripsIndexContainer";
import TripShowContainer from "./TripShowContainer";

const App = () => {
  return (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TripsIndexContainer} />
        <Route exact path="/trips/:id" component={TripShowContainer} />
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;