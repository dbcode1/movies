import React, { useState } from "react";
import Select from "react-select";
import CustomOption from "./Option";

const options = [
  { id: 28, value: "Action", label: "Action" },
  { id: 12, value: "Adventure", label: "Adventure" },
  { id: 16, value: "Animation", label: "Animation" },

  { id: 80, value: "Crime", label: "Crime" },
  { id: 99, value: "Documentary", label: "Documentary" },
  { id: 18, value: "Drama", label: "Drama" },
  { id: 10751, value: "Family", label: "Family" },
  { id: 14, value: "Fantasy", label: "Fantasy" },
  { id: 36, value: "History", label: "History" },
  { id: 27, value: "Horror", label: "Horror" },
  { id: 10402, value: "Music", label: "Music" },
  { id: 9648, value: "Mystery", label: "Mystery" },
  { id: 10749, value: "Romance", label: "Romance" },
  { id: 878, value: "Science Fiction", label: "Science Fiction" },
  { id: 53, value: "Thriller", label: "Thriller" },
  { id: 10752, value: "War", label: "War" },
  { id: 37, value: "Western", label: "Western" },
];

function SelectComponent(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnChange = props.selectProps.handleOnChange;

  const handleOnSelect = props.selectProps.handleOnSelect;

  return (
    <div className="select">
      <Select
        options={options}
        onChange={setSelectedOption}
        value={selectedOption}
        components={{ Option: CustomOption }}
        selectProps={{ handleOnChange, handleOnSelect }}
        menuPortalTarget={document.body}
        menuPosition={"fixed"}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          container: (provided) => ({
            ...provided,
            position: "fixed",
            width: 10 + "em",
            top: 120,
            left: 40,
          }),
        }}
      />
    </div>
  );
}

export default SelectComponent;
