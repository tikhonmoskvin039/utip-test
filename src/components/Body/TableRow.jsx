import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import person from "../../store/person";
import Modal from "../Modal/Modal";

const TableRow = observer(({ persons }) => {
  const [data, setData] = useState(persons);
  const [isModal, setModal] = useState(false);
  const [openRecord, setOpenRecord] = useState(null);

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    e.currentTarget.style.backgroundColor = "yellow";
  };

  const onDrop = (e, index) => {
    const sourceIndex = e.dataTransfer.getData("index");
    const newData = [...data];
    const draggedItem = newData[sourceIndex];
    newData.splice(sourceIndex, 1);
    newData.splice(index, 0, draggedItem);
    setData(newData);
    localStorage.setItem("persons", JSON.stringify(newData));
    const changedPersons = localStorage.getItem("persons");
    person.persons = JSON.parse(changedPersons);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "white";
  };

  const onDragEnd = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "white";
  };

  return (
    <>
      {persons.map((el, idx) => (
        <tr
          draggable
          onDragStart={(e) => onDragStart(e, idx)}
          onDrop={(e) => onDrop(e, idx)}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDragEnd={onDragEnd}
          key={el.name}
        >
          <td>{el.name}</td>
          <td>{el.height}</td>
          <td>{el.gender}</td>
          <td>{el.birth_year}</td>
          <td>{el.eye_color}</td>
          <td>
            <button
              className="btn btn_small_red"
              onClick={() => {
                setModal(true);
                setOpenRecord(el.name);
              }}
            >
              Delete
            </button>
            <Modal
              openRecord={openRecord}
              name={el.name}
              isVisible={isModal}
              title={`Are you sure to delete ${openRecord} from list?`}
              onClose={() => setModal(false)}
            >
              <button
                className="btn btn_gray"
                onClick={() => {
                  setModal(false);
                  setOpenRecord(null);
                }}
              >
                Cancel
              </button>{" "}
              <button
                className="btn btn_red"
                onClick={() => {
                  person.removePerson(openRecord);
                  setModal(false);
                  setOpenRecord(null);
                }}
              >
                Delete
              </button>
            </Modal>
          </td>
        </tr>
      ))}
    </>
  );
});

export default TableRow;
