import { useEffect, useState } from "react";
import { GOOGLE_AUTH_LINK, LOGOUT_LINK } from "./constants";
// import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);

  const fetchUser = async() => {
    // const response = await axios.get("https://oauthserver.onrender.com/auth/google/callback", {
    //   withCredentials: true,
    // });
    // console.log(response);
    const token = Cookies.get("x-auth-cookie");
    if (token) {
      Cookies.remove("x-auth-cookie");
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      setUser(decodedToken);
    }
  };

  const handleLogout = (e) => {
    fetch(LOGOUT_LINK)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setUser(null);
      });
  };

  useEffect(() => fetchUser(), []);

  return user ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <a href={GOOGLE_AUTH_LINK}>Sign in with google</a>
  );
}

export default App;
