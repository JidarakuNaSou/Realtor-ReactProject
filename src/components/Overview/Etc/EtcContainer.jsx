import React from "react";
import { connect } from "react-redux";
import Etc from './Etc';
import {setProperty} from "../../../store/SingUserToggler/actions"

class EtcContainer extends React.Component {
  render() {
    return (
      <Etc
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
)(EtcContainer);
