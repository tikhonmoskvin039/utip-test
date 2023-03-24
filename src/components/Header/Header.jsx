import React from "react";
import person from "../../store/person";
import Button from "./Button";

const Header = () => {
  return (
    <div className="header">
      <h1>Test task for Utip</h1>
          <Button />
          <Button erase={person} onClick={() => person.eraseData()} />
    </div>
  );
};

export default Header;
