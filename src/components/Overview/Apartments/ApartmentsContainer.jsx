import React from "react";
import { connect } from "react-redux";
import Apartments from './Apartments';
import {setProperty} from "../../../store/SingUserToggler/actions"

class ApartmentsContainer extends React.Component {
  render() {
    return (
      <Apartments
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
)(ApartmentsContainer);
