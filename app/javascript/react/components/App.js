import React from 'react'
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"
import SearchBar from "./SearchBar"

const App = (props) => {
  return (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SearchBar} />
      </Switch>
    </BrowserRouter>
  </div>
  )
}

export default App