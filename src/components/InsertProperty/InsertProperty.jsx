import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Dropzone from "react-dropzone";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { uploadProperty } from "../UserFunction/UserFunction";

export default function InsertProperty(props) {
  const [uploadedFile, setUploadedFile] = useState();
  const [mainPhoto, setMainPhoto] = useState();
  const { register, handleSubmit } = useForm();
  const [pathFile, setPathFile] = useState();
  const [sketch3D, setSketch3D] = useState("");
  const [video, setVideo] = useState("");
  const [typeProperty, setTypeProperty] = useState("Выбрать");
  const [countApartment, setCountApartment] = useState("");

  const handleOnDrop = (files, rejectedFiles) => {
    if (!uploadedFile) {
      setUploadedFile(files);
      let pathfiles = [];
      for (var i = 0, f; (f = files[i]); i++) {
        pathfiles.push(URL.createObjectURL(f));
      }
      pathfiles.push("img/Group3.png");
      setPathFile(pathfiles);
      setMainPhoto(pathfiles[0]);
    } else {
      let updateFiles = uploadedFile;
      for (var i = 0, f; (f = files[i]); i++) {
        updateFiles.push(f);
      }

      setUploadedFile(updateFiles);
      console.log(`пути файлов ${pathFile}`);
      let pathfiles = pathFile;
      pathfiles.splice(pathfiles.length - 1, 1);
      for (var i = 0, f; (f = files[i]); i++) {
        pathfiles.push(URL.createObjectURL(f));
      }
      pathfiles.push("img/Group3.png");
      setPathFile(null);
      setPathFile(pathfiles);
    }
  };
  const handleClose3D = () => {
    props.setShowModal3D(false);
    setSketch3D(null);
  };
  const handleSave3D = () => {
    props.setShowModal3D(false);
  };
  const handleSaveVideo = () => {
    props.setShowModalVideo(false);
  };
  const handleShow3D = () => props.setShowModal3D(true);

  const handleCloseVideo = () => {
    props.setShowModalVideo(false);
    setVideo(null);
  };
  const handleShowVideo = () => props.setShowModalVideo(true);

  const onSubmit = (data, event) => {
    event.preventDefault();

    if (!sessionStorage.getItem("accesstoken")) {
      alert("Авторизуйтесь!");
      return;
    }

    var decoded = jwt_decode(sessionStorage.getItem("accesstoken"));

    if (!uploadedFile) {
      alert("Загрузите фото");
      return;
    }
    if (typeProperty === "Выбрать") {
      alert("Выберите тип недвижимости");
      return;
    }

    const formData = new FormData();
    const updateFilesArray = uploadedFile;
    for (let i = 0; i < pathFile.length; i++) {
      if (pathFile[i] === mainPhoto) {
        let revers = uploadedFile[0];
        updateFilesArray[0] = updateFilesArray[i];
        updateFilesArray[i] = revers;
      }
    }
    for (let i = 0; i < updateFilesArray.length; i++) {
      formData.append("files[]", updateFilesArray[i]);
    }

    formData.append("typeProperty", typeProperty);
    formData.append("countApartment", countApartment);
    formData.append("House", data.House);
    if (data.Apartaments) {
      formData.append("Apartaments", data.Apartaments);
    } else {
      formData.append("Apartaments", "");
    }
    formData.append("Place", data.Place);
    formData.append("Street", data.Street);
    formData.append("Space", data.Space);
    formData.append("Title", data.Title);
    formData.append("phone", props.phone);
    formData.append("last_name", props.last_name);
    formData.append("first_name", props.first_name);
    formData.append("user_image", props.user_image);
    formData.append("sketch3D", sketch3D);
    formData.append("video", video);
    uploadProperty(formData);
    formData.append("user_id", decoded.user_id);
    console.log("Новая запись");
    alert("Недвижимость выставлена!");
  };

  const handleTypeProperty = (e) => {
    setTypeProperty(e.target.value);
  };
  const handleCountApartment = (e) => {
    if (e.target.value) setCountApartment(e.target.value);
    else {
      setCountApartment("");
    }
  };

  const onChange3D = (e) => {
    if (e.target.value.slice(0, 21) === "https://sketchfab.com") {
      setSketch3D(`${e.target.value}/embed`);
    } else {
      setSketch3D("");
    }
  };
  const onChangeVideo = (e) => {
    if (e.target.value.slice(0, 23) === "https://www.youtube.com")
      setVideo(`https://www.youtube.com/embed/${e.target.value.slice(32)}`);
    else {
      setVideo("");
    }
  };
  const handleMainPhoto = (photo) => {
    setMainPhoto(photo);
  };
  const deletevideo = () => {
    setVideo("");
  };
  const delete3d = () => {
    setSketch3D("");
  };
  const deletePhoto = (photo) => {
    const updateFiles = uploadedFile;
    const pathfiles = pathFile;
    for (var i = pathfiles.length - 1; i >= 0; i--) {
      if (pathfiles[i] === photo) {
        pathfiles.splice(i, 1);
        updateFiles.splice(i, 1);
      }
    }

    if (mainPhoto === photo) setMainPhoto(pathfiles[0]);

    if (pathfiles.length === 1) {
      setPathFile(undefined);
      setUploadedFile(undefined);
    } else {
      setPathFile(pathfiles);
      setUploadedFile(updateFiles);   
    }
  };

  return (
    <section className="content  ">
      {localStorage.getItem("loginmethod") ? (
        console.log("local")
      ) : sessionStorage.getItem("loginmethod") ? (
        console.log("session")
      ) : (
        <Redirect to="/" />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row headerIP d-flex justify-content-between align-items-center ">
          <div title_ned>ЗАГРУЗИТЬ НЕДВИЖИМОСТЬ</div>
          <button type="submit" className="header__btn ">
            СОХРАНИТЬ
          </button>
        </div>

        <div class="row Insertform shadow">
          <div class="col-8">
            <div className="col-12">
              <label>Тип недвижимости</label>
            </div>
            <div className="col-12">
              <div class="btn-group dropright">
                <button
                  type="button"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {typeProperty}
                </button>
                <div class="dropdown-menu shadow">
                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-6"
                        type="radio"
                        name="radio2"
                        onChange={handleTypeProperty}
                        value="Квартира"
                      />
                      <label for="radio-6">Квартира</label>
                    </div>
                    <div class="form_radio_btn">
                      <input
                        id="radio-7"
                        type="radio"
                        name="radio2"
                        onChange={handleTypeProperty}
                        value="Дом"
                      />
                      <label for="radio-7">Дом</label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-8"
                        type="radio"
                        name="radio2"
                        onChange={handleTypeProperty}
                        value="Часть Дома"
                      />
                      <label for="radio-8">Часть Дома</label>
                    </div>
                    <div class="form_radio_btn">
                      <input
                        id="radio-9"
                        type="radio"
                        name="radio2"
                        onChange={handleTypeProperty}
                        value="Таунхаус"
                      />
                      <label for="radio-9">Таунхаус</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-10"
                        type="radio"
                        name="radio2"
                        value="Дуплекс"
                        onChange={handleTypeProperty}
                      />
                      <label for="radio-10">Дуплекс</label>
                    </div>
                    <div class="form_radio_btn">
                      <input
                        id="radio-11"
                        type="radio"
                        name="radio2"
                        value="Офисное помещение"
                        onChange={handleTypeProperty}
                      />
                      <label for="radio-11">Офисное помещение</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-12"
                        type="radio"
                        name="radio2"
                        value="Торговое помещение"
                        onChange={handleTypeProperty}
                      />
                      <label for="radio-12">Торговое помещение</label>
                    </div>
                    <div class="form_radio_btn">
                      <input
                        id="radio-13"
                        type="radio"
                        name="radio2"
                        value="Складское помещение"
                        onChange={handleTypeProperty}
                      />
                      <label for="radio-13">Складское помещение</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div class="form_radio_btn">
                      <input
                        id="radio-14"
                        type="radio"
                        name="radio2"
                        value="Готовый бизнес"
                        onChange={handleTypeProperty}
                      />
                      <label for="radio-14">Готовый бизнес</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 adress">
              <label>Адрес</label>
            </div>
            <div className="col-12 adress_items">
              <input
                type="text"
                className="col-4"
                name="Street"
                ref={register}
                placeholder="УЛИЦА/ПРОСПЕКТ"
              />
              <input
                type="text"
                className="col-3"
                name="House"
                ref={register}
                placeholder="НОМЕР ДОМА"
              />
              {typeProperty === "Квартира" ? (
                <input
                  type="text"
                  className="col-2"
                  name="Apartaments"
                  ref={register}
                  placeholder="КВАРТИРА"
                />
              ) : null}
            </div>
            {typeProperty === "Квартира" ||
            typeProperty === "Дом" ||
            typeProperty === "Часть Дома" ||
            typeProperty === "Таунхаус" ||
            typeProperty === "Дуплекс" ? (
              <>
                <div className="col-12">
                  <label>Количество комнат</label>
                </div>
                <div className="col-12">
                  {typeProperty === "Квартира" ? (
                    <div class="form_radio_btn">
                      <input
                        id="radio-1"
                        type="radio"
                        name="radio"
                        onChange={handleCountApartment}
                        value="Студия"
                      />
                      <label for="radio-1">Студия</label>
                    </div>
                  ) : null}

                  <div class="form_radio_btn">
                    <input
                      id="radio-2"
                      type="radio"
                      name="radio"
                      onChange={handleCountApartment}
                      value="1"
                    />
                    <label for="radio-2">1</label>
                  </div>

                  <div class="form_radio_btn">
                    <input
                      id="radio-3"
                      type="radio"
                      name="radio"
                      onChange={handleCountApartment}
                      value="2"
                    />
                    <label for="radio-3">2</label>
                  </div>
                  <div class="form_radio_btn">
                    <input
                      id="radio-4"
                      type="radio"
                      name="radio"
                      onChange={handleCountApartment}
                      value="3"
                    />
                    <label for="radio-4">3</label>
                  </div>
                  <div class="form_radio_btn">
                    <input
                      id="radio-5"
                      type="radio"
                      name="radio"
                      onChange={handleCountApartment}
                      value="4"
                    />
                    <label for="radio-5">4+</label>
                  </div>
                </div>
              </>
            ) : null}

            <div className="col-12 Sap">
              <label className="col-6">Площадь</label>
              <label className="col-6">Цена</label>
            </div>
            <div className="col-12 SaP_items">
              <input
                className="col-4"
                placeholder="м/кв"
                type="text"
                name="Space"
                ref={register}
                id=""
              />
              <input
                className="col-4"
                placeholder="₽"
                type="text"
                name="Place"
                ref={register}
                id=""
              />
            </div>

            <div className="col-12 mt-5">
              <label>Описание</label>
              <textarea
                name="Title"
                id=""
                cols="70"
                rows="15"
                maxlength="800"
                ref={register}
              ></textarea>
            </div>
          </div>

          {!pathFile ? (
            <Dropzone
              maxFiles="10"
              onDrop={handleOnDrop}
              maxSize="100000000"
              accept=".jpg,.png,.jpeg"
            >
              {({ getRootProps, getInputProps }) => (
                <div class="col-4 mt-5">
                  <span data-descr="" {...getRootProps()}>
                    <div className="col-12 mainphoto d-flex justify-content-center align-items-center">
                      <input {...getInputProps()} />
                      <div className="upmessage">
                        Нажмите, чтобы загрузить фотографии
                      </div>
                      <button type="button" className=""></button>
                    </div>
                  </span>
                </div>
              )}
            </Dropzone>
          ) : (
            <div class="col-4 mt-5">
              <span className="d-flex">
                <div className="col-12 d-flex mainimage justify-content-center align-items-center">
                  <span data-delete="">
                    <button type="button">
                      <img src={mainPhoto} class="d-block " alt="Природа"></img>
                    </button>
                  </span>
                </div>
              </span>
              <div className="col-12 caruselphoto">
                <div
                  id="sliderBigImages"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div class="carousel-inner">
                    {pathFile.map((item, index) => {
                      return index === 0 ? (
                        <div class="carousel-item active ">
                          <div className="row">
                            {pathFile.map((pathFile, index1, pathFileArray) => {
                              return index1 < 4 ? (
                                index1 !== pathFileArray.length - 1 ? (
                                  <div className="item" key={index1}>
                                    <button
                                      className="delbtn"
                                      type="button"
                                      onClick={() => deletePhoto(pathFile)}
                                    ></button>
                                    <div className="col-12"></div>
                                    <button
                                      type="button"
                                      onClick={() => handleMainPhoto(pathFile)}
                                    >
                                      <img
                                        src={pathFile}
                                        class="d-block "
                                        alt="Природа"
                                      ></img>
                                    </button>
                                  </div>
                                ) : (
                                  <Dropzone
                                    maxFiles="10"
                                    onDrop={handleOnDrop}
                                    maxSize="100000000"
                                    accept=".jpg,.png,.jpeg"
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <div
                                        className="item updatephoto"
                                        key={index1}
                                        {...getRootProps()}
                                      >
                                        <input {...getInputProps()} />
                                        <button type="button">
                                          <img
                                            src={pathFile}
                                            class="d-block "
                                            alt="Природа"
                                          ></img>
                                        </button>
                                      </div>
                                    )}
                                  </Dropzone>
                                )
                              ) : null;
                            })}
                          </div>
                        </div>
                      ) : index % 4 === 0 ? (
                        <div class="carousel-item ">
                          <div className="row">
                            {pathFile.map((pathFile, index2, pathFileArray) => {
                              return index2 >= index && index2 < index + 4 ? (
                                index2 !== pathFileArray.length - 1 ? (
                                  <div className="item" key={index2}>
                                    <button
                                      className="delbtn"
                                      onClick={() => deletePhoto(pathFile)}
                                      type="button"
                                    ></button>

                                    <button
                                      onClick={() => handleMainPhoto(pathFile)}
                                      type="button"
                                    >
                                      <img
                                        src={pathFile}
                                        class="d-block "
                                        alt="Природа"
                                      ></img>
                                    </button>
                                  </div>
                                ) : (
                                  <Dropzone
                                    maxFiles="4"
                                    onDrop={handleOnDrop}
                                    maxSize="100000"
                                    accept=".jpg,.png,.jpeg"
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <div
                                        className="item updatephoto"
                                        key={index2}
                                        {...getRootProps()}
                                      >
                                        <input {...getInputProps()} />
                                        <button type="button">
                                          <img
                                            src={pathFile}
                                            class="d-block "
                                            alt="Природа"
                                          ></img>
                                        </button>
                                      </div>
                                    )}
                                  </Dropzone>
                                )
                              ) : null;
                            })}
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
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
          )}
        </div>

        <div className="row Insertform">
          <div className="col-4 shadow upl3dmodel d-flex justify-content-center align-items-center">
            {props.showModal3D == false && sketch3D == "" ? (
              <button
                type="button"
                onClick={handleShow3D}
                className="header__btn m3dbtn"
              >
                Загрузить 3D Модель
              </button>
            ) : (
              <>
                <button
                  className="del3d"
                  type="button"
                  onClick={() => delete3d()}
                ></button>
                <div class="sketchfab-embed-wrapper item_3D  d-flex justify-content-center align-items-center">
                  <iframe
                    title="A 3D model"
                    width="200"
                    height="200"
                    src={sketch3D}
                    frameborder="0"
                    allow="autoplay; fullscreen; vr"
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                  ></iframe>
                </div>
              </>
            )}
          </div>

          <div className="col-1"></div>
          <div className="col-7 shadow uplvideo d-flex justify-content-center align-items-center">
            {props.showModalVideo == false && video == "" ? (
              <button
                onClick={handleShowVideo}
                type="button"
                className="header__btn videobtn"
              >
                Загрузить Видео
              </button>
            ) : (
              <>
                <button
                  className="delvideo"
                  type="button"
                  onClick={() => deletevideo()}
                ></button>
                <iframe
                  width="560"
                  height="250"
                  src={video}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen="true"
                ></iframe>
              </>
            )}
          </div>
        </div>
        <div className="row Insertform d-flex justify-content-center">
          <button type="submit" className="header__btn ">
            СОХРАНИТЬ
          </button>
        </div>
      </form>

      <Modal show={props.showModal3D} onHide={handleClose3D} centered={true}>
        <div className="shadow modal-content">
          <div className="container sketch">
            <div class="modal-header d-flex justify-content-center">
              <h5 class="modal-title">Загрузите 3D Модель</h5>
            </div>
            <div class="modal-body d-flex justify-content-center">
              <input
                type="text"
                onChange={onChange3D}
                name="3DModel"
                placeholder="Введите ссылку на 3D модель"
                ref={register}
              />
              <button tupe="button" onClick={handleSave3D}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={props.showModalVideo}
        onHide={handleCloseVideo}
        centered={true}
      >
        <div className="shadow modal-content">
          <div className="container sketch">
            <div class="modal-header d-flex justify-content-center">
              <h5 class="modal-title">Загрузите Видео</h5>
            </div>
            <div class="modal-body d-flex justify-content-center">
              <input
                type="text"
                name="Video"
                onChange={onChangeVideo}
                placeholder="Введите ссылку на видео"
                ref={register}
              />
              <button type="button" onClick={handleSaveVideo}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
