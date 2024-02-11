import React from "react";
import { Route, Switch } from "react-router-dom";
import ActivityListPage from "./list";
import ActivityPage from "./view";

const Auth = () => {
  return (
    <Switch>
      <Route path="/activity/:id" component={ActivityPage} />
      <Route path="/" component={ActivityListPage} />
    </Switch>
  );
};

export default Auth;
