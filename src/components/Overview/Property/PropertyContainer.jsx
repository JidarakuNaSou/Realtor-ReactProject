import Property from "./Property"
import React from "react";
import { connect } from "react-redux";
import {setUserOwerview} from "../../../store/SingUserToggler/actions"

class PropertyContainer extends React.Component {
  render() {
    return (
      <Property
      property={this.props.property}
      setUserOwerview={this.props.setUserOwerview}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    property : state.signtouser.property
  };
};

const mapDispatchToProps = {
  setUserOwerview,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyContainer);
