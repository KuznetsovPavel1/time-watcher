import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CustomInput = ({ label = "", value = "", type = "text", onChange }) => {
  const ref = useRef(null);
  const [placeholder, setPlaceholder] = useState("placeholder");

  useEffect(() => {
    if (value === "" && document.activeElement !== ref.current) {
      setPlaceholder("placeholder");
    } else {
      setPlaceholder("");
    }
  }, [value]);

  useEffect(() => {
    const el = ref.current;

    el.addEventListener("transitionstart", () => {
      if (value === "" && document.activeElement !== ref.current) {
        setPlaceholder("");
      }
    });

    return () =>
      el.removeEventListener("transitionstart", () => {
        setPlaceholder("");
      });
  }, [value]);

  return (
    <label className="custom-input">
      <input
        ref={ref}
        className="custom-input__text"
        type={type}
        onChange={onChange}
        onFocus={() => setPlaceholder("")}
        onBlur={() => {
          if (value === "") {
            setPlaceholder("placeholder");
          }
        }}
        value={value}
        autoComplete="off"
      />
      {label && (
        <span className={`custom-input__label ${placeholder}`}>{label}</span>
      )}
    </label>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomInput;
