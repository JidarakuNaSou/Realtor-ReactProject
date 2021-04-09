import React, { useState, useEffect } from "react";
import Switch, { Case, Default } from "react-switch-case";
import { userdata } from "../../UserFunction/UserFunction";
import { NavLink } from "react-router-dom";
import AuthHook from "./../../Auth/AuthHook";
import jwt_decode from "jwt-decode";


export default function SignUserToggler(props) {
  const [show, setShow] = useState(false);
  const [toggleForm, setToggleForm] = useState("login");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut();
  };

  const userChange = () => {
    props.setUser("user", true);
  };
  const signinChange = () => {
    if (sessionStorage.getItem("loginmethod") === "Local") {
      props.setSignin("signin", false);
      localStorage.removeItem("loginmethod");
      sessionStorage.clear();
    }
    if (localStorage.getItem("loginmethod") === "Google") {
      props.setSignin("signin", false);
      signOut();
      localStorage.removeItem("loginmethod");
    }
  };

  const putuserdata = () => {
    const loginmethod = sessionStorage.getItem("loginmethod");
    
    if (loginmethod === "Local") {
      let user = userdata();
      user.then((res) => {
        if (res) {
          
          props.setUserData(
            res.last_name,
            res.first_name,
            res.user_image,
            res.phone
          );
        } else {
          signinChange();
        }
      });

      userChange();
    }
    if (!loginmethod) {
      signinChange();
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("loginmethod") === "Local") {
      putuserdata();
    }
  });
  const setUser=()=>{
    props.setUserOwerview(jwt_decode(sessionStorage.getItem("accesstoken")).user_id)
  }
  return (
    <div className="header__signin col col-sm-2 d-flex justify-content-end">
      <Switch condition={props.signin_user}>
        <Case value="signin">
          <div className="signin">
            <ul className="header__items justify-content-end">
              <li className="header__item">
                <button onClick={handleShow} className="header__btn videobtn">
                  Войти
                </button>
              </li>
            </ul>
          </div>
        </Case>
        <Case value="user">
          <div className="toggleruser">
            <div class="dropdown open">
              <button
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {props.user_image !== "img/load_user_avatar.png" ? (
                  <img
                    className="user_avatar"
                    src={`${props.user_image}`}
                    height="50"
                    width="50"
                    alt=""
                  />
                ) : (
                  <img
                    className="user_avatar"
                    src={`../${props.user_image}`}
                    height="50"
                    width="50"
                    alt=""
                  />
                )}
                {props.first_name} {props.last_name[0]}
              </button>
              <div
                class="dropdown-menu shadow dropdown-menu-center"
                aria-labelledby="dropdownMenuButton"
              >
                <NavLink to={`/Profile`}>
                  <button onClick={()=>setUser()} class="dropdown-item">ПРОФИЛЬ</button>
                </NavLink>

                <NavLink exact to="/InsertProperty">
                  <button class="dropdown-item">
                    ЗАГРУЗИТЬ <p className="mb-0">НЕДВИЖИМОСТЬ </p>{" "}
                  </button>
                </NavLink>
                <NavLink exact to="/Yuridinfo">
                  <button class="dropdown-item">
                    ЮРИДИЧЕСКАЯ <p className="mb-0">ИНФОРМАЦИЯ </p>
                  </button>
                </NavLink>
                <button
                  class="dropdown-item exit-btn"
                  onClick={() => signinChange()}
                >
                  ВЫЙТИ
                </button>
              </div>
            </div>
          </div>
        </Case>
        <Default>
          <span>Nothing!</span>
        </Default>
      </Switch>
      <AuthHook
        userChange={userChange}
        putuserdata={putuserdata}
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        toggleForm={toggleForm}
        setToggleForm={setToggleForm}
      />
    </div>
  );
}
