import React from "react";
import SignUserToggler from "./SignUserToggler";
import { connect } from "react-redux";
import {
  setSignin,
  setUser,
  setUserData,
  setUserOwerview,
} from "../../../store/SingUserToggler/actions";

class SignUserTogglerContainer extends React.Component {
  render() {
    return (
      <SignUserToggler
        setUser={this.props.setUser}
        setSignin={this.props.setSignin}
        signin_user={this.props.signin_user}
        setUserData={this.props.setUserData}
        last_name={this.props.last_name}
        first_name={this.props.first_name}
        user_image={this.props.user_image}
        user_id = {this.props.user_id}
        setUserOwerview={this.props.setUserOwerview}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    signin_user: state.signtouser.signin_user,
    last_name: state.signtouser.last_name,
    first_name: state.signtouser.first_name,
    user_image: state.signtouser.user_image,
    user_id : state.signtouser.user_id,
  };
};

const mapDispatchToProps = {
  setUser,
  setSignin,
  setUserData,
  setUserOwerview,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUserTogglerContainer);
