import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { useInput } from "../hooks/useInput";
import person from "../store/person";

const AddPersonPage = () => {
  const [successAddModalVisible, setSuccessAddModalVisible] = useState(false);

  const navigate = useNavigate();

  const name = useInput("", { isEmpty: true, minLength: 2 });
  const height = useInput("", {
    isEmpty: true,
    minLength: 1,
    isContentOnlyDigits: false,
  });
  const gender = useInput("", { isEmpty: true });
  const yearOfBirth = useInput("", {
    isEmpty: true,
    minLength: 4,
    startsWithDigit: true,
  });
  const eyeColor = useInput("", { isEmpty: true });

  const addPersonHandler = (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      height: e.target.height.value,
      gender: e.target.gender.value,
      birth_year: e.target.birth_year.value,
      eye_color: e.target.eye_color.value,
    };
    person.addPerson(data);
    setSuccessAddModalVisible(true);
  };

  return (
    <div className="body-container">
      <form className="form" onSubmit={(e) => addPersonHandler(e)}>
        <h2>Add person</h2>

        <div className="form_group">
          {name.isDirty && name.isEmpty && (
            <small className="field-error">Field is required.</small>
          )}
          {name.isDirty && name.minLengthError && (
            <small className="field-error">Min length is 2 symbols!</small>
          )}
          <input
            value={name.value}
            onChange={(e) => name.onChange(e)}
            onBlur={(e) => name.onBlur(e)}
            className="form_input"
            name="name"
            placeholder="Enter name"
          />
          <label className="form_label">Name</label>
        </div>
        <div className="form_group">
          {height.isDirty && height.isEmpty && (
            <small className="field-error">Field is required.</small>
          )}
          {height.isDirty && height.minLengthError && (
            <small className="field-error">Min length is 1 symbols!</small>
          )}
          {height.isDirty && height.heightError && (
            <small className="field-error">Must contain only digits!</small>
          )}
          <input
            value={height.value}
            onChange={(e) => height.onChange(e)}
            onBlur={(e) => height.onBlur(e)}
            className="form_input"
            name="height"
            placeholder="Enter height"
          />
          <label className="form_label">Height</label>
        </div>
        <div className="form_group">
          {gender.isDirty && gender.isEmpty && (
            <small className="field-error">
              Select is required. Chose options!
            </small>
          )}
          <div className="select">
            <select
              value={gender.value}
              onChange={(e) => gender.onChange(e)}
              onBlur={(e) => gender.onBlur(e)}
              name="gender"
            >
              <option value="" disabled>
                Choose a gender
              </option>
              <option value="n/a">N/a</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="form_group">
          {yearOfBirth.isDirty && yearOfBirth.isEmpty && (
            <small className="field-error">Field is required.</small>
          )}
          {yearOfBirth.isDirty && yearOfBirth.minLengthError && (
            <small className="field-error">Min length is 4 symbols!</small>
          )}
          {yearOfBirth.isDirty && yearOfBirth.yearOfBirthError && (
            <small className="field-error">Must starts with digit!</small>
          )}
          <input
            value={yearOfBirth.value}
            onChange={(e) => yearOfBirth.onChange(e)}
            onBlur={(e) => yearOfBirth.onBlur(e)}
            className="form_input"
            name="birth_year"
            placeholder="Enter year of birth"
          />
          <label className="form_label">Year of birth</label>
        </div>
        <div className="form_group">
          {eyeColor.isDirty && eyeColor.isEmpty && (
            <small className="field-error">
              Select is required. Chose options!
            </small>
          )}
          {eyeColor.isDirty && eyeColor.minLengthError && (
            <small>Min length is 1 symbols!</small>
          )}
          <div className="select">
            <select
              value={eyeColor.value}
              onChange={(e) => eyeColor.onChange(e)}
              onBlur={(e) => eyeColor.onBlur(e)}
              name="eye_color"
            >
              <option value="" disabled>
                Choose eye color
              </option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="brown">Brown</option>
              <option value="blue-gray">Blue-gray</option>
            </select>
          </div>
        </div>

        <button
          disabled={
            !name.inputValid ||
            !height.inputValid ||
            !gender.inputValid ||
            !yearOfBirth.inputValid ||
            !eyeColor.inputValid
          }
          type="submit"
          className="btn btn_green"
        >
          Create
        </button>
      </form>
      <Link to={"/"}>Back</Link>
      <Modal
        isVisible={successAddModalVisible}
        title={`Person is successfully added to list!`}
        setSuccessAddModalVisible={setSuccessAddModalVisible}
        onClose={() => navigate("/")}
      >
        <button className="btn btn_green" onClick={() => navigate("/")}>
          Ok
        </button>
      </Modal>
    </div>
  );
};

export default AddPersonPage;
