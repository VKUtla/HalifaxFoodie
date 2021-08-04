import "./App.css";
import { React, useState } from "react";
import Login from "./components/user-profile/Login";
import Register from "./components/user-profile/Register";
import Profile from "./components/user-profile/Profile";
import ResetPassword from "./components/user-profile/ResetPassword";
import Home from "./components/pages/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "./navbar";
import WordCloud from "./components/dp/WordCloud";
import Chat from "./components/Chat/Chat";
import ML from "./components/ml/ml";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  return (
    <div className="App">
      <header>
        <NavigationBar></NavigationBar>
      </header>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <Route path="/profile">
          <Profile></Profile>
        </Route>
        <Route path="/reset">
          <ResetPassword></ResetPassword>
        </Route>
        <Route exact path="/wordcloud" component={WordCloud} />

        <Route exact path="/user">
          <Chat currentUserType="user" loggedInUserId="user1" />
        </Route>

        <Route exact path="/admin">
          <Chat currentUserType="admin" loggedInUserId="halifax_foodie" />
        </Route>

        <Route exact path="/ml" component={ML} />

        <Route>
          <h1>Invalid URL</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
