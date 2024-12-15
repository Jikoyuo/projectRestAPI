import axios from "axios";
import Cookies from "js-cookie";

const Login = async (email: string, password: string) => {
  try {
    console.log("inside Login");
    const response = await axios.post(
      "http://34.128.99.52:8081/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("inside Login1 ");
    Cookies.set("accessToken", response.data.data.tokenValue);

    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export default Login;
