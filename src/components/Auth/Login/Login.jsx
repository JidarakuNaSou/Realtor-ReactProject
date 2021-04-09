import React from "react";
import jwt_decode from "jwt-decode";
import { login } from "../../UserFunction/UserFunction";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErrors: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    login(user).then((res) => {
      if (res.error === null) {
        this.props.userChange();
        this.props.putuserdata();
        sessionStorage.setItem("loginmethod", "Local");
        this.props.handleClose();
        this.props.setUserOwerview(jwt_decode(res.tokens.accessToken).user_id)
      } else {
        this.setState({ loginErrors: res.error });
      }
    });
  }

  render() {
    const loginErrors = this.state.loginErrors;
    return (
      <div className="container login">
        <div class="modal-header d-flex justify-content-center">
          <h5 class="modal-title">Авторизация</h5>
        </div>
        <div class="modal-body d-flex justify-content-center">
          <form className="auth__active " onSubmit={this.onSubmit}>
            <div>
              {loginErrors.length > 0 && (
                <p className="errorMessagelog">{loginErrors}</p>
              )}
              <input
                type="email"
                id="email_log"
                name="email"
                value={this.state.email}
                placeholder="E-MAIL"
                className="modal-body__item col-12"
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                type="password"
                id="password_log"
                name="password"
                value={this.state.password}
                placeholder="ПАРОЛЬ"
                className="modal-body__item col-12"
                onChange={this.onChange}
              />
            </div>
            <button
              type="submit"
              className="header__btn modal-body__item btn-modal"
            >
              ВОЙТИ
            </button>
            <button
              type="button"
              className="header__btn modal-body__item btn-modal"
              onClick={() => this.props.handleChange()}
            >
              ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
