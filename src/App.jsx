import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";
import Login from "./components/login/Login";
import Main from "./components/main/Main";
import NotFound from "./components/not-found/NotFound";
import { tokenName } from "./api/api";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              localStorage[tokenName] ? <Main /> : <Redirect to="/login" />
            }
          />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
