import { useEffect, useState } from "react";

export const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [yearOfBirthError, setYearOfBirthError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value?.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case "startsWithDigit":
          const validYear = /\d+/g;
          validYear.test(String(value))
            ? setYearOfBirthError(false)
            : setYearOfBirthError(true);
          break;
        case "isContentOnlyDigits":
          const validHeight = /[0-9]/g;
          validHeight.test(String(value))
            ? setHeightError(false)
            : setHeightError(true);
          break;
        default:
          break;
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (isEmpty || minLengthError || yearOfBirthError || heightError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, yearOfBirthError, heightError]);
  
  return {
    isEmpty,
    minLengthError,
    inputValid,
    yearOfBirthError,
    heightError,
  };
};
