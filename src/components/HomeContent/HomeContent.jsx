import React from "react";
import { NavLink } from "react-router-dom";

class HomeContent extends React.Component {
  render() {
    return (
      <section className="content homecontent">
        <div id="skySlider" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div className="row">
                <div className="illustration col-7 d-flex align-items-center justify-content-center">
                  <img
                    src="img/1.svg"
                    class="d-block"
                    alt="Природа"
                    height="300"
                    width="400"
                  ></img>
                </div>
                <div className="title col d-flex justify-content-center align-items-start flex-column">
                  <div className="title__item">
                    <h1>КВАРТИРЫ </h1>
                    <h3>ПОКУПКА И АРЕНДА</h3>
                    <h6>Демонстрация жилых вариантов</h6>
                    <NavLink to="/Apartments">
                      <div className="title__btn btn"> ОБЗОР </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div className="row">
                <div className="illustration col-7 d-flex align-items-center justify-content-center">
                  <img
                    src="img/Office.svg"
                    class="d-block"
                    alt="Природа"
                    height="300"
                    width="400"
                  ></img>
                </div>
                <div className="title col d-flex justify-content-center align-items-start flex-column">
                  <div className="title__item">
                    <h1>ОФИСЫ </h1>
                    <h3>ПОКУПКА И АРЕНДА</h3>
                    <h6>Офисные и рабочие помещения</h6>
                    <NavLink to="/Office">
                    <div className="title__btn btn"> ОБЗОР</div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div className="row">
                <div className="illustration col-7 d-flex align-items-center justify-content-center">
                  <img
                    src="img/2.svg"
                    class="d-block"
                    alt="Природа"
                    height="300"
                    width="400"
                  ></img>
                </div>
                <div className="title col d-flex justify-content-center align-items-start flex-column">
                  <div className="title__item">
                    <h1>ЗАГОРОДНЫЕ ДОМА </h1>
                    <h3>ПОКУПКА И АРЕНДА</h3>
                    <h6>Загородные жилые и нежелые здания</h6>
                    <NavLink to="/House">
                    <div className="title__btn btn"> ОБЗОР</div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div className="row">
                <div className="illustration col-7 d-flex align-items-center justify-content-center">
                  <img
                    src="img/3.svg"
                    class="d-block"
                    alt="Природа"
                    height="300"
                    width="400"
                  ></img>
                </div>
                <div className="title col d-flex justify-content-center align-items-start flex-column">
                  <div className="title__item">
                    <h1>ПРОЧЕЕ </h1>
                    <h3>ПОКУПКА И АРЕНДА</h3>
                    <h6>Помещения для бизнеса и придомовые территории</h6>
                    <NavLink to="/Etc">
                    <div className="title__btn btn"> ОБЗОР</div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ol class="carousel-indicators ">
            <li data-target="#skySlider" data-slide-to="0" class="active"></li>
            <li data-target="#skySlider" data-slide-to="1"></li>
            <li data-target="#skySlider" data-slide-to="2"></li>
            <li data-target="#skySlider" data-slide-to="3"></li>
          </ol>
        </div>
      </section>
    );
  }
}

export default HomeContent;
