import React from "react";
import { Link } from "react-router-dom";
import Table from "./Table";

const Body = () => {
  return (
    <div className="body-container">
      <Table />
      <Link to={"/addPerson"}>Add new person</Link>
    </div>
  );
};

export default Body;
