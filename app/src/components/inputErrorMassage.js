import React from "react";

const InputErrorMessage = ({ children }) => {
  return <div className="text-red-500 text-sm">{children}</div>;
};

export default InputErrorMessage;
