import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import "./Main.scss";
import { connect2WS, tokenName } from "../../api/api";

const Main = ({ history }) => {
  const isMounted = useRef(true);
  const [error, setError] = useState("");
  const [time, setTime] = useState("");
  const [connected, setConnected] = useState(false);

  const timer = useRef(null);
  const socketRef = useRef(null);

  const connect = async () => {
    try {
      const res = await connect2WS(history);

      if (res.url) {
        socketRef.current = new WebSocket(res.url);

        socketRef.current.onopen = () => {
          if (isMounted.current) {
            setConnected(true);
          }
        };

        socketRef.current.onclose = () => {
          if (isMounted.current) {
            setConnected(false);
          }
        };
      } else {
        if (isMounted.current) {
          setError(res);
        }
      }
    } catch (error) {
      if (isMounted.current) {
        setError("Connection error");
      }
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (isMounted.current) {
        setConnected(false);
      }
    }, 3000);
  }, [time]);

  useEffect(() => {
    if (!connected) {
      connect();
    } else {
      if (!socketRef.current) return;

      socketRef.current.onmessage = (message) => {
        if (connected && isMounted.current) {
          setTime(JSON.parse(message.data).server_time);
        }
      };
    }
  }, [connected]);

  const onSignOut = () => {
    localStorage.removeItem(tokenName);
  };

  return (
    <div className="form">
      {error && <div className="error-msg">{error}</div>}
      <h3 className="form__str">
        Server is{" "}
        <span className={`status ${connected ? "active" : ""}`}></span>
      </h3>

      <h3 className={`form__str ${!connected ? "text-hide" : ""}`}>
        {time && <time>{moment.unix(time).format("DD.MM.YYYY HH:mm:ss")}</time>}
      </h3>

      <Link className="form__btn" onClick={() => onSignOut()} to="/">
        Sign Out
      </Link>
    </div>
  );
};

export default withRouter(Main);
