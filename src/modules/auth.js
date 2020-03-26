 
import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: "http://localhost:3000",
  prefixUrl: "/api/v1"
});

const onLogin = (event, dispatch) => {
  event.preventDefault()
  auth.signIn(event.target.elements.email.value, event.target.elements.password.value)
    .then(response => {
      dispatch({ type: 'AUTHENTICATE', payload: { authenticated: true, userEmail: response.data.email } })
      // dispatch({ type: 'CHANGE_GREETING', payload: `Welcome ${response.data.email}` })
    })
    .catch(error => {
      let errorMessage = error.response.data.errors[0]
      dispatch({ type: '', payload: errorMessage })
    });
}

const onLogout = (dispatch) => {
  auth.signOut().then(() => {
    dispatch({ type: 'AUTHENTICATE', payload: { authenticated: false, userEmail: null } })
    dispatch({ type: '', payload: `See ya!` })
  })
}

export { auth, onLogin, onLogout };