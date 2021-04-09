import React from "react";
import { NavLink } from "react-router-dom";
import { getPropertys } from "../../UserFunction/UserFunction";
import Fuse from "fuse.js";

class Etc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Propertys: null,
      filterlist: null,
      firstprice: "",
      lastprice: "",
      Street: "",
      firstspace: "",
      lastspace: "",
    };
    this.handleinputfiltr = this.handleinputfiltr.bind(this);
    this.filterListhandle = this.filterListhandle.bind(this);
  }

  filterListhandle(Propertys) {
    if (this.state.Street == "" || this.state.Street == null)
      this.setState({ filterlist: Propertys });
    else {
      const options = {
        shouldSort: true,
        threshold: 0.3,
        location: 1,
        distance: 10,
        includeScore: true,
        keys: ["fulladdres"],
      };
      const fuse = new Fuse(Propertys, options);

      const result = fuse.search(this.state.Street);
      const res = [];
      for (let index = 0; index < result.length; index++) {
        res[index] = result[index].item;
      }
      this.setState({ filterlist: res });
    }
  }

  componentDidMount() {
    getPropertys("Прочее").then((res) => {
      this.setState({ Propertys: res, filterlist: res });
      console.log(this.state.filterlist);
    });
  }

  handleinputfiltr(e) {
    this.setState({ [e.target.name]: e.target.value }, function () {
      if (this.state.Street != "") this.filterListhandle(this.state.Propertys);
      else {
        this.setState({ filterlist: this.state.Propertys });
      }
    });
  }

  selectproperty(property) {
    this.props.setProperty(property);
  }

  render() {
    return (
      <section className="content apartments">
        <div className="row">
          <span className="title_ned">ПРОЧЕЕ</span>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <div className="row">
              {this.state.filterlist
                ? this.state.filterlist.map((filterlist) => {
                    return (
                      ((parseInt(filterlist.Place) >=
                        parseInt(this.state.firstprice) &&
                        parseInt(filterlist.Place) <=
                          parseInt(this.state.lastprice)) ||
                      (parseInt(filterlist.Place) >=
                        parseInt(this.state.firstprice) &&
                        this.state.lastprice == "") ||
                      (this.state.firstprice == "" &&
                        parseInt(filterlist.Place) <=
                          parseInt(this.state.lastprice)) ||
                      (this.state.firstprice == "" &&
                        this.state.lastprice == "") && (

                        parseInt(filterlist.Space) >=
                          parseInt(this.state.firstspace) &&
                        parseInt(filterlist.Space) <=
                          parseInt(this.state.lastspace)) ||
                      (parseInt(filterlist.Space) >=
                        parseInt(this.state.firstspace) &&
                        this.state.lastspace == "") ||
                      (this.state.firstspace == "" &&
                        parseInt(filterlist.Place) <=
                          parseInt(this.state.lastspace))||
                      (this.state.firstspace == "" &&
                        this.state.lastspace == "") && 
                        filterlist.status === "Продается"? (
                        <div className="col-4 mx-6 d-flex justify-content-center">
                          <button
                            onClick={() => this.selectproperty(filterlist)}
                          >
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
                                    filterlist.Street != 'null' &&
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
                                      filterlist.Title != 'null' &&
                                      filterlist.Title != 'undefined'? (
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
                                    
                                    <div className="card__space row d-flex justify-content-center">
                                      {filterlist.Space != "" &&
                                      filterlist.Space != 'null' &&
                                      filterlist.Space != 'undefined' ? (
                                        <div>{`${filterlist.Space}м/кв`}</div>
                                      ) : (
                                        " Не указано"
                                      )}
                                    </div>
                                    <div className="card__place row d-flex justify-content-between align-items-center">
                                      <div>
                                        {filterlist.Place != "" &&
                                        filterlist.Place != "null" &&
                                        filterlist.Place != "undefined"
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
                      ) : null)
                    );
                  })
                : null}
            </div>
          </div>
          <div className="col-4 mt-3">
            <label className="col-4">Цена: </label>
            <div className="d-flex mt-3">
              <label className="col-2">От: </label>
              <input
                className="col-6"
                placeholder="₽"
                type="text"
                name="firstprice"
                onChange={this.handleinputfiltr}
                id=""
                value={this.state.firstprice}
              />
            </div>

            <div className="d-flex mt-3">
              <label className="col-2">До: </label>
              <input
                className="col-6"
                placeholder="₽"
                type="text"
                name="lastprice"
                onChange={this.handleinputfiltr}
                id=""
                value={this.state.lastprice}
              />
            </div>
            <hr />
            <label className="col-4">Площадь: </label>
            <div className="d-flex mt-3">
              <label className="col-2">От: </label>
              <input
                className="col-6"
                placeholder="м/кв"
                type="text"
                name="firstspace"
                onChange={this.handleinputfiltr}
                id=""
                value={this.state.firstspace}
              />
            </div>

            <div className="d-flex mt-3">
              <label className="col-2">До: </label>
              <input
                className="col-6"
                placeholder="м/кв"
                type="text"
                name="lastspace"
                onChange={this.handleinputfiltr}
                id=""
                value={this.state.lastspace}
              />
            </div>
            <hr />
            <div className="col-12 d-flex mt-3 px-0">
              <label className="col-3">Адрес: </label>
              <input
                className="col-5"
                placeholder=""
                type="text"
                name="Street"
                onChange={this.handleinputfiltr}
                id=""
                value={this.state.Street}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Etc;
