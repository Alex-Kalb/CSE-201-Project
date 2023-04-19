import React from "react";

function Dashboard({ setSortOrder }) {
  const buttonNames = ["Newest", "Name", "Price"];

  const handleClick = (name) => {
    console.log(`You clicked ${name}`);
    if (name === "Name") {
      setSortOrder("name");
    } else if (name === "Price") {
      setSortOrder("price");
    } else {
      setSortOrder(null);
    }
  };

  return (
    <div className="Dashboard">
      <h2>Sort Products By</h2>
      <div className="button-row">
        {buttonNames.map((name) => (
          <button key={name} onClick={() => handleClick(name)}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;