import {
  SIGNIN_TO_USER_CHANGE,
  PUT_USER_DATA,
  USER_TO_SIGNIN_CHANGE,
  SET_SHOW_MODAL_3D,
  SET_SHOW_MODAL_VIDEO,
  SET_PROPERTY,
  SET_USER_OWERVIEW,
} from "./actions";

const defaultState = {
  signin_user: "signin",
  last_name: "",
  first_name: "",
  user_image: null,
  showModal3D: false,
  showModalVideo: false,
  phone: null,
  property: null,
  user_id:null,
};

const signtouserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SIGNIN_TO_USER_CHANGE:
      return {
        ...state,
        login: action.payload.login,
        signin_user: action.payload.signin_user,
      };
    case USER_TO_SIGNIN_CHANGE:
      return {
        ...state,
        login: action.payload.login,
        signin_user: action.payload.signin_user,
      };
    case PUT_USER_DATA:
      return {
        ...state,
        last_name: action.payload.last_name,
        first_name: action.payload.first_name,
        user_image: action.payload.user_image,
        phone: action.payload.phone,
      };

    case SET_SHOW_MODAL_3D:
      return {
        ...state,
        showModal3D: action.payload.showModal3D,
      };
    case SET_SHOW_MODAL_VIDEO:
      return {
        ...state,
        showModalVideo: action.payload.showModalVideo,
      };
    case SET_PROPERTY:
      return {
        ...state,
        property: action.payload.property,
      };
      case SET_USER_OWERVIEW:
      return {
        ...state,
        user_id: action.payload.user_id,
      };

    default:
      return state;
  }
};

export default signtouserReducer;
