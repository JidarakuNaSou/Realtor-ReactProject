import React from "react";
import { connect } from "react-redux";
import House from './House';
import {setProperty} from "../../../store/SingUserToggler/actions"

class HouseContainer extends React.Component {
  render() {
    return (
      <House
      setProperty={this.props.setProperty}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = {
  setProperty,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseContainer);
