import React from "react";
import Switch, { Case, Default } from "react-switch-case";
import Register from "./Registration/Registration";
import LoginContainer from "./Login/LoginContainer";

class Auth extends React.Component {
    state = {
        toggleForm: "login",
        classname:"show",
        disp:"none"
      };
    
      handleChange = event => {
        this.setState({ toggleForm: "registration" });
      };
    
      handleChange1 = event => {
        this.setState({ toggleForm: "login" });
      };
      
    render() {
      return (
        <div
          class={`modal fade ${this.state.classname}`}
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-backdrop="true"
          style={{display: `${this.state.disp}`}}
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content shadow">
              <Switch condition={this.state.toggleForm}>
                <Case value="login">
                  <LoginContainer handleChange={this.handleChange} userChange={this.props.userChange} putuserdata={this.props.putuserdata}/>
                </Case>
                <Case value="registration">
                  <Register handleChange1={this.handleChange1}/>
                </Case>
                <Default>
                  <span>Nothing!</span>
                </Default>
              </Switch>
            </div>
            <div class="modal-footer"></div>
          </div>
          </div>
      );
    }
  }
  
  export default Auth;