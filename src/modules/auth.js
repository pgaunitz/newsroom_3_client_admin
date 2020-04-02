import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  // host: "https://newsroom3api.herokuapp.com",
  host: "http://localhost:3000",
  prefixUrl: "/api/v1"
});

export default auth;