import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getProperty,propertyStatus } from "../../UserFunction/UserFunction";

class Property extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: this.props.property,
      status: "Просмотр",
      statusProperty: "",
    };
  }

  componentDidMount() {
    if (this.props.property) {
      this.setState({ property: this.props.property });
      this.setState({ statusProperty: this.props.property.status });

      window.history.replaceState(
        null,
        null,
        `/Property/getProperty?propertyId=${this.state.property.propertyId}`
      );
    } else {
      const propertyId = new URLSearchParams(this.props.location.search).get(
        "propertyId"
      );
      getProperty(propertyId).then((res) => {
        this.setState({ property: res[0] });
        this.setState({ statusProperty: res[0].status });
        console.log(res[0])
        console.log(res[0].uploadedFile[0].destination.slice(9) + "/" + res[0].uploadedFile[0].filename)
      });
    }
    
  }
  selectuser = (user_id) => {
    this.props.setUserOwerview(user_id);
  };

  handleStatus = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    propertyStatus(e.target.value,this.state.property.propertyId)
  };

  render() {
    return this.state.property ? (
      <section className="Property">
        <div className="col px-0  mt-5 d-flex justify-content-between title-street">
          <h1>
            {`${this.state.property.Street} ${this.state.property.House}`}
            {this.state.property.Apartaments != ""
              ? `, кв ${this.state.property.Apartaments}`
              : null}
          </h1>
          {sessionStorage.getItem("accesstoken") &&
          jwt_decode(sessionStorage.getItem("accesstoken")).user_id ===
            this.state.property.user_id ? (
            <form>
              <div class="btn-group dropleft statusdropdown">
                <button
                  type="button"
                  class="dropdown-toggle header__btn"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.state.statusProperty}
                </button>
                <div class="dropdown-menu shadow">
                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-15"
                        type="radio"
                        name="statusProperty"
                        onChange={this.handleStatus}
                        value="Продано"
                      />
                      <label for="radio-15">Продано</label>
                    </div>
                    <div class="form_radio_btn">
                      <input
                        id="radio-16"
                        type="radio"
                        name="statusProperty"
                        onChange={this.handleStatus}
                        value="Продается"
                      />
                      <label for="radio-16">Продается</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <button type="button" className="header__btn status_btn">
              {this.state.property.status}
            </button>
          )}
        </div>

        <div className="mt-3">
          <div className="row shadow infoproperty m-4">
            <div className="col-7">
              <div className="row description">
                {this.state.property.Title ? (
                  this.state.property.Title
                ) : (
                  <h3>Нет описания</h3>
                )}
              </div>
              <div className="row">
                <div className="col-4 user">
                  <div className="col-3 d-flex align-items-center">
                    <button
                      onClick={() =>
                        this.selectuser(this.state.property.user_id)
                      }
                    >
                      <NavLink exact to="/Profile">
                        <span data-descr="">
                          {this.state.property.user_image ===
                          "img/load_user_avatar.png" ? (
                            <img
                              src={`../${this.state.property.user_image}`}
                              alt=""
                            />
                          ) : (
                            <img src={this.state.property.user_image} alt="" />
                          )}
                        </span>
                      </NavLink>
                    </button>
                  </div>
                  <div className="col-9 ml-3 d-flex align-items-center">
                    <div className="row">
                      <div className="col-12 user_info">
                        <h6>{`${this.state.property.first_name} ${this.state.property.last_name}`}</h6>
                      </div>
                      <div className="col-12 user_info">
                        <h6>{this.state.property.phone}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 d-flex d-flex align-items-center countapart">
                  <div className="col-12">
                    <div className="d-flex justify-content-center countapart">
                      {this.state.property.countApartment === "" ||
                      this.state.property.countApartment === "undefined" ? (
                        ""
                      ) : this.state.property.countApartment === "Студия" ? (
                        this.state.property.countApartment
                      ) : (
                        <>
                          <div className="col-12 d-flex align-items-center">{`${this.state.property.countApartment} `}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-center space">
                  <div className="col-12">
                    <div className="d-flex justify-content-center ">
                      {this.state.property.Space === ""
                        ? ""
                        : `${this.state.property.Space}м/кв`}
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex d-flex align-items-center price">
                  <div className="col-12">
                    <h1 className="d-flex justify-content-center ">
                      {this.state.property.Place === ""
                        ? ""
                        : `${this.state.property.Place}₽`}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5 d-flex align-items-center">
              <div className="col-12 caruselphoto">
                <div
                  id="sliderBigImages"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div class="carousel-inner d-flex align-items-center">
                    {this.state.property.uploadedFile.map(
                      (uploadedFile, index) => {
                        return index == 0 ? (
                          <div class="carousel-item active">
                            <div className="row d-flex justify-content-center">
                              <div className="item" key={index}>
                                <span data-delete="">
                                  <img
                                    src={"/" + uploadedFile.destination.slice(9) + "/" + uploadedFile.filename}
                                    class="d-block "
                                    alt="Природа"
                                  ></img>
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div class="carousel-item">
                            <div className="row d-flex justify-content-center">
                              <div className="item" key={index}>
                                <span data-delete="">
                                  <img
                                    src={"/" + uploadedFile.destination.slice(9) + "/" + uploadedFile.filename}
                                    class="d-block "
                                    alt="Природа"
                                  ></img>
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <ol class="carousel-indicators">
                  {this.state.property.uploadedFile.map(
                    (uploadedFile, index) => {
                      return index === 0 ? (
                        <li
                          data-target="#sliderBigImages"
                          data-slide-to={`${index}`}
                          key={index}
                        ></li>
                      ) : (
                        <li
                          data-target="#sliderBigImages"
                          data-slide-to={`${index}`}
                          key={index}
                        ></li>
                      );
                    }
                  )}
                </ol>
                <a
                  class="carousel-control-prev"
                  href="#sliderBigImages"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#sliderBigImages"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div className="row  media m-4">
            <div className="col-4 model3D shadow">
              <div class="sketchfab-embed-wrapper ">
                {this.state.property.sketch3D === "" ||
                this.state.property.sketch3D === "null" ||
                this.state.property.sketch3D === null ? (
                  <h3>3D модель не загружена</h3>
                ) : (
                  <iframe
                    title="A 3D model"
                    width="200"
                    height="200"
                    src={this.state.property.sketch3D}
                    frameborder="0"
                    allow="autoplay; fullscreen; vr"
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                  ></iframe>
                )}
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-7 video shadow d-flex justify-content-center align-items-center">
              {this.state.property.video === "" ||
              this.state.property.video === "null" ||
              this.state.property.video === null ? (
                <h3>Видео не загружено</h3>
              ) : (
                <iframe
                  width="560"
                  height="250"
                  src={this.state.property.video}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen="true"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </section>
    ) : null;
  }
}
export default withRouter(Property);
