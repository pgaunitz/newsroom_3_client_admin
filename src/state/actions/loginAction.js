import {AUTHENTICATE} from "./actionTypes"
authentication = (email, password) => {
  try {
    e.preventDefault();
    let response = await auth.signIn(
     email,
     password
    );

    this.props.dispatch({
      type: AUTHENTICATE,
      payload: { authenticated: true, userEmail: response.data.email }
    });
  } catch (error) {
    console.log(error);
  }
};
