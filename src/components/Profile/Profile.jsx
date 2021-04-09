import React from "react";
import Dropzone from "react-dropzone";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  updateUserInfo,
  getUserPropertys,
  userdata,
  getUserOwerview,
} from "../UserFunction/UserFunction";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last_name: null,
      first_name: null,
      phone: null,
      user_image: null,
      user_id: this.props.user_id,
      uploadedFile: null,
      pathFile: null,
      login: true,
      salePropertys: [],
      soldPropertys: [],
      status: "Просмотр",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user_id !== this.props.user_id) {
      this.setState({ user_id: this.props.user_id });

      window.history.replaceState(
        null,
        null,
        `/Profile/getUserOwerview?user_id=${this.props.user_id}`
      );
      getUserOwerview(this.props.user_id).then((res) => {
        console.log(res)
        this.setState({
          last_name: res.last_name,
          first_name: res.first_name,
          phone: res.phone,
          user_image: res.user_image,
        });
      });
      getUserPropertys(this.props.user_id).then((res) => {
        const salePropertys = [];
        const soldPropertys = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].status === "Продается") {
            salePropertys.push(res[i]);
          } else {
            soldPropertys.push(res[i]);
          }
        }
        this.setState({
          salePropertys,
          soldPropertys,
        });
      });
    }
  }

  componentDidMount() {
    if (this.props.user_id !== undefined && this.props.user_id !== null) {
      this.setState({ user_id: this.props.user_id });
      console.log(`user_id : ${this.props.user_id}`);
      window.history.replaceState(
        null,
        null,
        `/Profile/getUserOwerview?user_id=${this.props.user_id}`
      );
      getUserOwerview(this.props.user_id).then((res) => {
        this.setState({
          last_name: res.last_name,
          first_name: res.first_name,
          phone: res.phone,
          user_image: res.user_image,
        });
      });
      getUserPropertys(this.props.user_id).then((res) => {
        const salePropertys = [];
        const soldPropertys = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].status === "Продается") {
            salePropertys.push(res[i]);
          } else {
            soldPropertys.push(res[i]);
          }
        }
        this.setState({
          salePropertys,
          soldPropertys,
        });
      });
    } else {
      console.log(`user_id : ${this.props.user_id}`);
      const user_id = new URLSearchParams(this.props.location.search).get(
        "user_id"
      );

      getUserOwerview(user_id).then((res) => {
        this.setState({
          last_name: res.last_name,
          first_name: res.first_name,
          phone: res.phone,
          user_image: res.user_image,
        });
        this.props.setUserOwerview(user_id);
      });
      getUserPropertys(user_id).then((res) => {
        const salePropertys = [];
        const soldPropertys = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].status === "Продается") {
            salePropertys.push(res[i]);
          } else {
            soldPropertys.push(res[i]);
          }
        }
        this.setState({
          salePropertys,
          soldPropertys,
        });
      });
    }
  }

  selectproperty(property) {
    this.props.setProperty(property);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChangeStatus = (e) => {
    if (this.state.status === "Просмотр")
      this.setState({
        status: "Редактирование",
        last_name: this.props.last_name,
        first_name: this.props.first_name,
        phone: this.props.phone,
        user_image: this.props.user_image,
      });
    else if (this.state.status === "Редактирование") {
      this.setState({ status: "Просмотр" });
    }
  };
  handleOnDrop = (file, rejectedFiles) => {
    if (!this.state.uploadedFile) {
      this.setState({ uploadedFile: file });
      let pathfiles = [];
      pathfiles.push(URL.createObjectURL(file[0]));
      this.setState({ pathFile: pathfiles });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    var decoded = jwt_decode(sessionStorage.getItem("accesstoken"));

    this.handleChangeStatus();
    const formData = new FormData();

    formData.append("last_name", this.state.last_name);

    formData.append("first_name", this.state.first_name);
    formData.append("phone", this.state.phone);
    if (this.state.uploadedFile) {
      formData.append("file", this.state.uploadedFile[0]);
    }
    formData.append("user_id", decoded.user_id);
    updateUserInfo(formData).then((res) => {
      userdata().then((res) => {
        console.log(res);
        this.props.setUserData(
          res.last_name,
          res.first_name,
          res.user_image,
          res.phone
        );
        console.log(res)
        this.setState({
          last_name: res.last_name,
          first_name: res.first_name,
          user_image: res.user_image,
          phone: res.phone,
        });
      });
    });
  };

  render() {
    return (
      <section className="content">
        <div className="row">
          <div className="container">
            <div className="col d-flex justify-content-between">
              <h2>ПРОФИЛЬ</h2>
              {sessionStorage.getItem("accesstoken") &&
              jwt_decode(sessionStorage.getItem("accesstoken")).user_id ===
                this.props.user_id ? (
                <NavLink exact to="/InsertProperty">
                  <button className="header__btn  py-2 px-4 ml-5">
                    Загрузить недвижимость
                  </button>
                </NavLink>
              ) : null}
            </div>
            <div className="profile shadow ">
              <div className="col ml-4 pt-3">
                <span>Информация</span>
              </div>
              {this.state.status === "Просмотр" ? (
                <div className="user  d-flex justify-content-around align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      className="avatar"
                      src={
                        this.state.user_image === "img/load_user_avatar.png"
                          ? this.state.user_image
                            ? `../${this.state.user_image}`
                            : `../${this.props.user_image}`
                          : this.state.user_image
                          ? `${this.state.user_image}`
                          : `${this.props.user_image}`
                      }
                      alt=""
                    />
                  </div>
                  <div className=" align-items-center ">
                    <div className="col d-flex justify-content-end ">
                      <h1>
                        {this.state.first_name
                          ? this.state.first_name
                          : this.props.first_name}{" "}
                        {this.state.last_name
                          ? this.state.last_name
                          : this.props.last_name}
                      </h1>
                    </div>
                    <div className="col d-flex justify-content-end ">
                      <h4>
                        {this.state.phone ? this.state.phone : this.props.phone}
                      </h4>
                    </div>
                  </div>
                  <div className="d-flex align-items-center ">
                    {sessionStorage.getItem("accesstoken") &&
                    jwt_decode(sessionStorage.getItem("accesstoken"))
                      .user_id === this.props.user_id ? (
                      <button
                        type="button"
                        onClick={this.handleChangeStatus}
                        className="header__btn py-2 px-4"
                      >
                        Изменить
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : (
                <form
                  className="user  d-flex justify-content-around align-items-center"
                  onSubmit={this.onSubmit}
                >
                  {!this.state.uploadedFile ? (
                    <Dropzone
                      maxFiles="4"
                      onDrop={this.handleOnDrop}
                      maxSize="100000"
                      accept=".jpg,.png,.jpeg"
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="d-flex align-items-center">
                          <span data-descr="" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img
                              className="avatar"
                              src={
                                this.state.user_image ===
                                "img/load_user_avatar.png"
                                  ? `../${this.state.user_image}`
                                  : this.state.user_image
                              }
                              alt=""
                            />
                          </span>
                        </div>
                      )}
                    </Dropzone>
                  ) : (
                    <>
                      <div className="d-flex align-items-center">
                        <img
                          className="avatar"
                          src={this.state.pathFile}
                          alt=""
                        />
                      </div>
                    </>
                  )}
                  <div className=" align-items-center ">
                    <div className="col d-flex justify-content-end ">
                      <>
                        <label htmlFor="">{`Имя: `}</label>
                        <input
                          value={this.state.first_name}
                          onChange={this.onChange}
                          name="first_name"
                          type="text"
                        />
                        <label htmlFor="">{`Фамилия: `}</label>
                        <input
                          value={this.state.last_name}
                          onChange={this.onChange}
                          name="last_name"
                          type="text"
                        />
                      </>
                    </div>
                    <div className="col d-flex justify-content-end ">
                      <>
                        <label
                          className="mt-3"
                          htmlFor=""
                        >{`Ном.телефона: `}</label>
                        <input
                          className="mt-3"
                          value={this.state.phone}
                          type="text"
                          onChange={this.onChange}
                          name="phone"
                        />
                      </>
                    </div>
                  </div>
                  <div className="d-flex align-items-center ">
                    <button type="submit" className="header__btn py-2 px-4">
                      Сохранить
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="client shadow">
              <div className="row ml-4 pt-3">
                <span>Текущая продажа</span>
                <div className="col-12"></div>
                {this.state.salePropertys.length !== 0 ? (
                  this.state.salePropertys.map((filterlist) => {
                    return filterlist.status === "Продается" ? (
                      <div className="col-4 d-flex justify-content-center">
                        <button onClick={() => this.selectproperty(filterlist)}>
                          <NavLink exact to="/Property">
                            <span data-descr="">
                              <div className="card shadow d-flex align-items-center">
                                <div className="main_img">
                                  {filterlist.uploadedFile ? (
                                    <img
                                      src={"/" + filterlist.uploadedFile[0].destination.slice(9) + "/" + filterlist.uploadedFile[0].filename}
                                      alt=""
                                    />
                                  ) : null}
                                </div>
                                <div className="card__street">
                                  {filterlist.Street != "" &&
                                  filterlist.Street != null &&
                                  filterlist.Street != "undefined" ? (
                                    <div>
                                      {`${filterlist.Street}`}
                                      <p></p>
                                      {`${filterlist.House}`}
                                      {filterlist.Apartaments != ""
                                        ? `, кв ${filterlist.Apartaments}`
                                        : null}
                                    </div>
                                  ) : (
                                    " Не указано"
                                  )}
                                </div>
                                <div className="card-body">
                                  <div className="card__title row d-flex justify-content-center">
                                    {filterlist.Title != "" &&
                                    filterlist.Title != null &&
                                    filterlist.Title != undefined ? (
                                      <div>
                                        {` ${filterlist.Title.substring(
                                          0,
                                          80
                                        )}`}
                                        {filterlist.Title.length > 80
                                          ? "..."
                                          : null}
                                      </div>
                                    ) : (
                                      " Не указано"
                                    )}
                                  </div>
                                  <div className="card__coap row d-flex justify-content-center ">
                                    {filterlist.countApartment != "" &&
                                    filterlist.countApartment != null &&
                                    filterlist.countApartment != "undefined" ? (
                                      <div>{` ${filterlist.countApartment}`}</div>
                                    ) : (
                                      " Не указано"
                                    )}
                                  </div>
                                  <div className="card__space row d-flex justify-content-center">
                                    {filterlist.Space != "" &&
                                    filterlist.Space != null &&
                                    filterlist.Space != undefined ? (
                                      <div>{`${filterlist.Space}м/кв`}</div>
                                    ) : (
                                      " Не указано"
                                    )}
                                  </div>
                                  <div className="card__place row d-flex justify-content-between align-items-center">
                                    <div>
                                      {filterlist.Place != "" &&
                                      filterlist.Place != null &&
                                      filterlist.Place != undefined
                                        ? ` ${filterlist.Place} ₽`
                                        : " Не указано"}
                                    </div>
                                    <div className="col-3">
                                      <img src={filterlist.user_image} alt="" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </span>
                          </NavLink>
                        </button>
                      </div>
                    ) : null;
                  })
                ) : (
                  <div className="noneproperty"> Нет записей</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="client shadow">
              <div className="row ml-4 pt-3">
                <span>История продаж</span> <div className="col-12"></div>
                {this.state.soldPropertys.length !== 0 ? (
                  this.state.soldPropertys.map((filterlist) => {
                    return filterlist.status === "Продано" ? (
                      <div className="col-4 d-flex justify-content-center">
                        <button onClick={() => this.selectproperty(filterlist)}>
                          <NavLink exact to="/Property">
                            <span data-descr="">
                              <div className="card shadow d-flex align-items-center">
                                <div className="main_img">
                                  {filterlist.uploadedFile ? (
                                    <img
                                      src={"/" + filterlist.uploadedFile[0].destination.slice(9) + "/" + filterlist.uploadedFile[0].filename}
                                      alt=""
                                    />
                                  ) : null}
                                </div>
                                <div className="card__street">
                                  {filterlist.Street != "" &&
                                  filterlist.Street != null &&
                                  filterlist.Street != "undefined" ? (
                                    <div>
                                      {`${filterlist.Street}`}
                                      <p></p>
                                      {`${filterlist.House}`}
                                      {filterlist.Apartaments != ""
                                        ? `, кв ${filterlist.Apartaments}`
                                        : null}
                                    </div>
                                  ) : (
                                    " Не указано"
                                  )}
                                </div>
                                <div className="card-body">
                                  <div className="card__title row d-flex justify-content-center">
                                    {filterlist.Title != "" &&
                                    filterlist.Title != null &&
                                    filterlist.Title != undefined ? (
                                      <div>
                                        {` ${filterlist.Title.substring(
                                          0,
                                          80
                                        )}`}
                                        {filterlist.Title.length > 80
                                          ? "..."
                                          : null}
                                      </div>
                                    ) : (
                                      " Не указано"
                                    )}
                                  </div>
                                  <div className="card__coap row d-flex justify-content-center ">
                                    {filterlist.countApartment != "" &&
                                    filterlist.countApartment != null &&
                                    filterlist.countApartment != "undefined" ? (
                                      <div>{` ${filterlist.countApartment}`}</div>
                                    ) : (
                                      " Не указано"
                                    )}
                                  </div>
                                  <div className="card__space row d-flex justify-content-center">
                                    {filterlist.Space != "" &&
                                    filterlist.Space != null &&
                                    filterlist.Space != undefined ? (
                                      <div>{`${filterlist.Space}м/кв`}</div>
                                    ) : (
                                      " Не указано"
                                    )}
                                  </div>
                                  <div className="card__place row d-flex justify-content-between align-items-center">
                                    <div>
                                      {filterlist.Place != "" &&
                                      filterlist.Place != null &&
                                      filterlist.Place != undefined
                                        ? ` ${filterlist.Place} ₽`
                                        : " Не указано"}
                                    </div>
                                    <div className="col-3">
                                      <img src={filterlist.user_image} alt="" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </span>
                          </NavLink>
                        </button>
                      </div>
                    ) : null;
                  })
                ) : (
                  <div className="noneproperty"> Нет записей</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Profile);
