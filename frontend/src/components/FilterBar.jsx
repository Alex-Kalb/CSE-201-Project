import { useEffect, useState } from "react";
import "./FilterBar.css";

function FilterBar(props) {
  const [userInput, setUserInput] = useState({});

  const handleChange = (evt, isSortField = false) => {
    setUserInput((prevUserInput) => {
      let newUserInput = null;
      if (!isSortField) {
        newUserInput = {
          ...prevUserInput,
          [evt.target.name]: evt.target.value,
        };
      } else {
        newUserInput = {
          ...prevUserInput,
          ["sortBy"]: {
            ...prevUserInput.sortBy,
            [evt.target.name]: evt.target.value,
          },
        };
      }

      return newUserInput;
    });
  };

  useEffect(() => {
    console.log(userInput);
    props.passFilterData(userInput);
  }, [userInput]);

  return (
    <div className="filter-container container-fluid">
      <div className="row sort-bar">
        <div className="col-5">
          <label htmlFor="name">Sort By Name</label>
          <select
            className="form-select"
            name="name"
            aria-label="Sort by Name"
            onChange={(evt) => handleChange(evt, true)}
          >
            <option selected="" value={0}>
              Not Selected
            </option>
            <option value={1}>Ascending Order</option>
            <option value={-1}>Descending Order</option>
          </select>
        </div>
        <div className="col-5">
          <label htmlFor="price">Sort By Price</label>
          <select
            className="form-select"
            name="price"
            aria-label="Sort by Price"
            onChange={(evt) => handleChange(evt, true)}
          >
            <option selected="" value={0}>
              Not Selected
            </option>
            <option value={1}>Ascending Order</option>
            <option value={-1}>Descending Order</option>
          </select>
        </div>
      </div>
      <div className="row search-bar">
        <label className="fw-bold" htmlFor="searchField">
          Search
        </label>
        <input
          type="text"
          className="form-control"
          id="searchField"
          placeholder="Search..."
          name="search"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default FilterBar;
