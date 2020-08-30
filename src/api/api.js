import axios from "axios";

export const tokenName = "x-test-app-jwt-token";

export const signIn = async (data, i = 0) => {
  try {
    const res = await axios.post("https://work.vint-x.net/api/login", data);

    localStorage.setItem(tokenName, res.headers[tokenName]);

    return res.data;
  } catch (error) {
    if (![400, 401].includes(error?.response?.status) && i < 3) {
      return signIn(data, i + 1);
    }

    return error?.response?.data;
  }
};

export const connect2WS = async (history) => {
  try {
    let token = localStorage.getItem(tokenName);

    if (token) {
      const res = await axios.get("https://work.vint-x.net/api/subscribe", {
        headers: { [tokenName]: token },
      });

      return res.data;
    } else {
      history.push("/login");
    }
  } catch (error) {
    return "Something went wrong";
  }
};
