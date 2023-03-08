import React from "react";
import { CheckOutlined } from "@ant-design/icons";
// eslint-disable-next-line react/prop-types
const ButtonGroup = ({ name, isActive, onClick }) => {
  return (
    <button onClick={onClick} className={isActive ? "active-class" : ""}>
      {name} {isActive && <CheckOutlined color="#609966" />}
    </button>
  );
};

export default ButtonGroup;
