import React from "react";
import { Modal } from "react-bootstrap";
import LoginContainer from "./Login/LoginContainer";
import Switch, { Case, Default } from "react-switch-case";
import Register from "./Registration/Registration";

export default function AustHook(props) {
  const handleChange = () => props.setToggleForm("registration");

  const handleChange1 = () => props.setToggleForm("login");

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered={true}>
        <div className="shadow modal-content">
          <Switch condition={props.toggleForm}>
            <Case value="login">
              
                <LoginContainer
                  handleChange={handleChange}
                  userChange={props.userChange}
                  putuserdata={props.putuserdata}
                  handleClose={props.handleClose}
                />
             
            </Case>
            <Case value="registration">
              <Register className="reg" handleChange1={handleChange1} />
            </Case>
            <Default>
              <span>Nothing!</span>
            </Default>
          </Switch>
        </div>
      </Modal>
    </>
  );
}
