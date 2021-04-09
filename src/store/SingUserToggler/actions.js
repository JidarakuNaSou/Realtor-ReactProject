export const SIGNIN_TO_USER_CHANGE = "SIGNIN_TO_USER_CHANGE"
export const USER_TO_SIGNIN_CHANGE = "USER_TO_SIGNIN_CHANGE"
export const PUT_USER_DATA = "PUT_USER_DATA"
export const SET_SHOW_MODAL_3D = "SET_SHOW_MODAL_3D"
export const SET_SHOW_MODAL_VIDEO = "SET_SHOW_MODAL_VIDEO"
export const SET_PROPERTY = "SET_PROPERTY"
export const SET_USER_OWERVIEW = "SET_USER_OWERVIEW"

export const setUser = (signin_user) => ({
    type: SIGNIN_TO_USER_CHANGE,
    payload: {
        signin_user,
    }
})
export const setUserOwerview = (user_id) => ({
    type: SET_USER_OWERVIEW,
    payload: {
        user_id,
    }
})

export const setSignin = (signin_user) => ({
    type: USER_TO_SIGNIN_CHANGE,
    payload: {
        signin_user,
    }
})

export const setUserData = (last_name,first_name,user_image,phone) => ({
    type: PUT_USER_DATA,
    payload: {
        last_name,
        first_name,
        user_image,
        phone
    } 
})
export const setShowModal3D = (showModal3D) => ({
    type: SET_SHOW_MODAL_3D,
    payload: {
        showModal3D,
    } 
})
export const setShowModalVideo = (showModalVideo) => ({
    type: SET_SHOW_MODAL_VIDEO,
    payload: {
        showModalVideo,
    } 
})
export const setProperty = (property) => ({
    type: SET_PROPERTY,
    payload: {
        property,
    } 
})