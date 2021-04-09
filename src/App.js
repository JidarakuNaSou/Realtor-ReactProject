import React from "react";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import HomeContent from "./components/HomeContent/HomeContent";
import LoginContainer from "./components/Auth/Login/LoginContainer";
import EtcContainer from "./components/Overview/Etc/EtcContainer";
import HouseContainer from "./components/Overview/House/HouseContainer";
import OfficeContainer from "./components/Overview/Office/OfficeContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import ApartmentsContainer from "./components/Overview/Apartments/ApartmentsContainer";
import PropertyContainer from "./components/Overview/Property/PropertyContainer";
import InsertPropertyContainer from "./components/InsertProperty/InsertPropertyContainer";
import Yuridinfo from"./components/Yuridinfo/Yuridinfo";

class App extends React.Component {
  render() {
    return (
      
        <BrowserRouter>
          <div className="container-fluid">
            <Route path="/" component={HeaderContainer} />

            <Route exact path="/" component={HomeContent} />
            <Route exact path="/Login" component={LoginContainer} />
            <Route exact path="/Apartments" component={ApartmentsContainer} />
            <Route exact path="/Etc" component={EtcContainer} />
            <Route exact path="/House" component={HouseContainer} />
            <Route exact path="/Office" component={OfficeContainer} />
            <Route path="/Profile" component={ProfileContainer} />
            <Route path="/Property" component={PropertyContainer} />
            <Route exact path="/InsertProperty" component={InsertPropertyContainer} />
            <Route exact path="/Yuridinfo" component={Yuridinfo} />
          </div>
        </BrowserRouter>
      
    );
  }
}
export default App;
