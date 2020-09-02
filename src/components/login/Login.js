import React, { useState } from "react";
import CustomInput from "../common/CustomInput/CustomInput";
import Spinner from "../common/Spinner/Spinner";
import { signIn } from "../../api/api";

const Login = ({ history }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onClick = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError("");

      const res = await signIn({ username: login, password: password });

      if (res?.status === "OK") {
        history.push("/");
      } else if (res?.description) {
        setLoading(false);
        setError(res.description);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <form className="form" onSubmit={(e) => onClick(e)}>
      {error && <div className="error-msg">{error}</div>}
      <CustomInput
        label="Username"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        autoFocus={true}
      />
      <CustomInput
        label="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="form__btn" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default Login;
