import { Request, setToken } from "../services"
import { navigate } from "../services/navigator"

export const welcomeDone = () => async (dispatch) => {
  return dispatch({ type: "WELCOME_DONE", payload: true })
}

export const login = (req) => async (dispatch) => {
  return await Request('post', "users/login", req)
    .then(async (res) => {
      if (res.status) {
        await setToken(res.authToken)
        dispatch({ type: "AUTHTOKEN", payload: res.authToken })
        dispatch({ type: "LOGIN", payload: res.user })
      } else {
        alert(res.message)
      }
    })
}

export const Register = (req) => async (dispatch) => {
  return await Request('post', "users/register", req)
    .then(async (res) => {
      if (res.status) {
        await setToken(res.authToken)
        dispatch({ type: "AUTHTOKEN", payload: res.authToken })
        dispatch({ type: "LOGIN", payload: res.user })
      } else {
        alert(res.message)
      }
    })
}

export const sendMail = (req) => async (dispatch) => {
  return await Request('post', "users/sendmail", req)
    .then(async (res) => {
      if (res.status) {
        dispatch({ type: "MEIL_DATA", payload: req.email })
        navigate('VerificationScreen')
      } else {
        alert(res.message)
      }
    })
}

export const forgetPassword = (token) => async (dispatch, getState) => {
  let req = { token, email: getState().auth.email }
  return await Request('post', "users/forgetpassword", req)
    .then(async (res) => {
      if (res.status) {
        navigate('ResetpasswordScreen')
      } else {
        alert(res.message)
      }
    })
}

export const resetPassword = (password) => async (dispatch, getState) => {
  let req = { password, email: getState().auth.email }
  return await Request('post', "users/resetpassword", req)
    .then(async (res) => {
      if (res.status) {
        navigate('LoginScreen')
      } else {
        alert(res.message)
      }
    })
}


export const logOut = () => async (dispatch) => {
  setToken('')
  return dispatch({ type: "LOGOUT" })
}

export const userinfoLoad = (req) => async (dispatch) => {
  return await Request('get', `users/${req.id}`)
    .then(res => {
      dispatch({ type: "LOGIN", payload: res })
    })
    .catch(err => console.log(err))
}