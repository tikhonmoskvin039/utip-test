import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import person from "../../store/person";
import TableRow from "./TableRow";
import { AppContext } from "../../context/AppContext";
import Spinner from "../Spinner/Spinner";

const filters = [
  { title: "Name", filterField: "name" },
  { title: "Height", filterField: "height" },
  { title: "Gender", filterField: "gender" },
  { title: "Birth year", filterField: "birth_year" },
  { title: "Eye color", filterField: "eye_color" },
];

const Table = observer(() => {
  const { loading } = useContext(AppContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {person.persons.length ? (
            <table className="table">
              <thead>
                <tr>
                  {filters.map((f, idx) => (
                    <th key={idx}>
                      <button
                        className="btn btn_table"
                        onClick={() => person.sortBy(f.filterField)}
                      >
                        {f.title}
                      </button>
                    </th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <TableRow persons={person.persons} />
              </tbody>
            </table>
          ) : (
            <h2>No persons, please click "FETCH DATA"</h2>
          )}
        </>
      )}
    </>
  );
});

export default Table;
