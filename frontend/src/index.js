import React from "react";
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import generationReducer from "./slices/generationSlice";
import dragonReducer from "./slices/dragonSlice";
import accountReducer from "./slices/accountSlice";
import accountDragonsReducer from "./slices/accountDragonsSlice";
import accountInfoReducer from "./slices/accountInfoSlice";
import publicDragonsReducer from "./slices/publicDragons";

import Root from "./components/Root";
import AccountDragons from "./components/AccountDragons";

import { fetchAuthenticated } from "./slices/accountSlice";

import "./index.css";

const store = configureStore({
  reducer: {
    account: accountReducer,
    dragon: dragonReducer,
    generation: generationReducer,
    accountDragons: accountDragonsReducer,
    accountInfo: accountInfoReducer,
    publicDragons: publicDragonsReducer,
  },
});

// store.subscribe(() => console.log(store.getState()));

const AuthRoute = ({ component, path }) => {
  if (!store.getState().account.loggedIn) {
    return <Redirect to="/" />;
  }

  return <Route path={path} component={component} />;
};

store.dispatch(fetchAuthenticated()).then(() => {
  render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Root} />
          <AuthRoute exact path="/account-dragons" component={AccountDragons} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});
