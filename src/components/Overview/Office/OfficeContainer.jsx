import React from "react";
import { connect } from "react-redux";
import Office from './Office';
import {setProperty} from "../../../store/SingUserToggler/actions"

class OfficeContainer extends React.Component {
  render() {
    return (
      <Office
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
)(OfficeContainer);
