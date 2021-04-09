import React from "react";
import { connect } from "react-redux";
import InsertProperty from "./InsertProperty";
import {
  setShowModalVideo,
  setShowModal3D,
} from "../../store/SingUserToggler/actions";
class InsertPropertyContainer extends React.Component {
  render() {
    return (
      <InsertProperty
        setShowModal3D={this.props.setShowModal3D}
        setShowModalVideo={this.props.setShowModalVideo}
        showModalVideo={this.props.showModalVideo}
        showModal3D={this.props.showModal3D}
        user_image={this.props.user_image}
        last_name={this.props.last_name}
        first_name={this.props.first_name}
        phone={this.props.phone}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showModalVideo: state.signtouser.showModalVideo,
    showModal3D: state.signtouser.showModal3D,
    last_name: state.signtouser.last_name,
    first_name: state.signtouser.first_name,
    user_image: state.signtouser.user_image,
    phone: state.signtouser.phone,
  };
};

const mapDispatchToProps = {
  setShowModalVideo,
  setShowModal3D,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertPropertyContainer);
