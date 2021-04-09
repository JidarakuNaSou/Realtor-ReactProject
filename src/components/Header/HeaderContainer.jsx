import React from "react";
import { connect } from "react-redux";
import { setUserData,setUser} from "../../store/SingUserToggler/actions";
import Header from "./Header"
class HeaderContainer extends React.Component {
  render() {
    return <Header setUserData={this.props.setUserData} setUser={this.props.setUser}/>;
  }
}
const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = {
  setUserData,
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
