export const fetchPersonsApi = async () => {
  try {
    const res = await fetch("https://swapi.dev/api/people/", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });
    const data = await res.json().then(data => data.results);
    return data;
  } catch (err) {
    return Promise.reject(err.message)
  }
};
