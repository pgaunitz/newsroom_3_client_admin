import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: "https://newsroom3api.herokuapp.com",
  prefixUrl: "/api/v1"
});

export default auth;