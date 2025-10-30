import React from "react";
import { components } from "react-select";
import "./Option.css"
const CustomOption = (props) => {
  console.log(props.innerProps);
  const { handleOnChange, handleOnSelect } = props.selectProps.selectProps;
  return (
    <components.Option className="option" {...props}>
      <div
        {...props.innerProps}
        onClick={() => handleOnSelect(props.data.id, 1)}
        onMouseOver={() => handleOnChange(props.data.id, 1)}
      >
        {props.children}
      </div>
    </components.Option>
  );
};

export default CustomOption;
