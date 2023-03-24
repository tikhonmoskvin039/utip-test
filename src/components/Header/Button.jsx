import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import person from "../../store/person";
import { AppContext } from "../../context/AppContext";

const Button = observer(({ erase }) => {
  const { setLoading } = useContext(AppContext);


  return (
    <>
      {erase ? (
        <button
          disabled={person?.persons.length ? false : true}
          className="btn"
          onClick={() => person.eraseData()}
        >
          Erace Data
        </button>
      ) : (
        <button
          disabled={person?.persons.length ? true : false}
          className="btn"
          onClick={() => person.fetchPersons(setLoading)}
        >
          Fetch Data
        </button>
      )}
    </>
  );
});

export default Button;
