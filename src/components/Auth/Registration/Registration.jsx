import React from "react";
import "./Registration";
import { register } from "../../UserFunction/UserFunction";

const emailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === "" && (valid = false);
  });

  return valid;
};

class Registration extends React.Component {
  constructor(props) {
    super();
    this.state = {
      last_name: "",
      first_name: "",
      email: "",
      password: "",
      replace_password: "",
      phone:"",
      formErrors: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        replace_password: ""
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "first_name":
        formErrors.first_name =
          value.length < 3 && value.length > 0
            ? "Минимум 3 символа"
            : (formErrors.first_name =
                value.length === 0 ? "Заполните поле" : "");
        break;
      case "last_name":
        formErrors.last_name =
          value.length < 3 && value.length > 0
            ? "Минимум 3 символа"
            : (formErrors.last_name =
                value.length === 0 ? "Заполните поле" : "");
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : (formErrors.email =
              value.length === 0 ? "Заполните поле" : "Не верный Email");
        break;
      case "password":
        formErrors.password =
          value.length < 6 && value.length > 0
            ? "Минимум 6 символов"
            : (formErrors.password =
                value.length === 0 ? "Заполните поле" : "");
        break;
      case "replace_password":
        formErrors.replace_password =
          value !== this.state.password && value.length > 0
            ? "Пароль не совпадает"
            : (formErrors.replace_password =
                value.length === 0 ? "Заполните поле" : "");
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  }
  onSubmit(e) {
    e.preventDefault();

    if (formValid(this.state)) {
      const user = {
        last_name: this.state.last_name,
        first_name: this.state.first_name,
        email: this.state.email,
        password: this.state.password,
        replace_password: this.state.replace_password,
        phone : this.state.phone,
        user_image : "img/load_user_avatar.png"
      };

      register(user).then(res => {
        if (res.error) {
          let formErrors = this.state.formErrors;
          formErrors.email =  res.error
          this.setState({ formErrors });
        } else {
          this.props.handleChange1();
        }
      });
    }
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="container">
        <div class="modal-header d-flex justify-content-center">
          <h5 class="modal-title ">Регистрация</h5>
        </div>
        <div class="modal-body">
          <form
            className="auth__active d-flex justify-content-center align-items-center"
            onSubmit={this.onSubmit}
          >
            <div>
              <input
                type="text"
                id="first_name_reg"
                className={`modal-body__item col-12 ${
                  formErrors.first_name.length > 0 ? "error" : null
                }`}
                name="first_name"
                value={this.state.first_name}
                noValidate
                placeholder="ИМЯ"
                onChange={this.onChange}
              />
              {formErrors.first_name.length > 0 && (
                <p className="errorMessage">{formErrors.first_name}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="last_name_reg"
                className={`modal-body__item col-12 ${
                  formErrors.last_name.length > 0 ? "error" : null
                }`}
                name="last_name"
                value={this.state.last_name}
                noValidate
                placeholder="ФАМИЛИЯ"
                onChange={this.onChange}
              />
              {formErrors.last_name.length > 0 && (
                <p className="errorMessage">{formErrors.last_name}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="phone_reg"
                className="modal-body__item col-12"
                name="phone"
                value={this.state.phone}
                noValidate
                placeholder="НОМЕР ТЕЛ."
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                type="email"
                id="email_reg"
                className={`modal-body__item col-12 ${
                  formErrors.email.length > 0 ? "error" : null
                }`}
                name="email"
                value={this.state.email}
                noValidate
                placeholder="E-MAIL"
                onChange={this.onChange}
              />
              {formErrors.email.length > 0 && (
                <p className="errorMessage">{formErrors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                id="password_reg"
                className={`modal-body__item col-12 ${
                  formErrors.password.length > 0 ? "error" : null
                }`}
                name="password"
                value={this.state.password}
                noValidate
                placeholder="ПАРОЛЬ"
                onChange={this.onChange}
              />
              {formErrors.password.length > 0 && (
                <p className="errorMessage">{formErrors.password}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                id="replace_password_reg"
                className={`modal-body__item col-12 ${
                  formErrors.replace_password.length > 0 ? "error" : null
                }`}
                name="replace_password"
                value={this.state.replace_password}
                noValidate
                placeholder="ПОДТВЕРДИТЕ ПАРОЛЬ"
                onChange={this.onChange}
              />
              {formErrors.replace_password.length > 0 && (
                <p className="errorMessage">{formErrors.replace_password}</p>
              )}
            </div>
            <button
              type="submit"
              className="header__btn modal-body__item btn-modal"
            >
              ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
            <button
              type="button"
              className="header__btn modal-body__item btn-modal"
              onClick={() => {
                this.props.handleChange1();
              }}
            >
              ВОЙТИ
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
