import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./components/Register";
import EditProfile from "./pages/EditProfile";
import Feed from "./pages/Feed";
import Users from "./pages/Users";


function App() {
  return (
    <div className="container-md pt-4">
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route path={"/"} exact component={Home}/>
                <Route path={"/feed"} exact component={Feed}/>
                <Route path="/profile/:userId" component={Profile}/>
                <Route path={"/register"} component={Register}/>
                <Route path={"/editprofile"} component={EditProfile}/>
                <Route path={"/users"} component={Users}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
