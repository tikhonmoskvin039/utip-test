import { makeAutoObservable } from "mobx";
import { fetchPersonsApi } from "../api/swapiAPI";

class Person {
  persons = [];

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
    this.loadPersons();
  }

  loadPersons() {
    const savedPersons = localStorage.getItem("persons");
    if (savedPersons) {
      this.persons = JSON.parse(savedPersons);
    } else {
      this.fetchPersons();
    }
  }

  removePerson(name) {
    this.persons = this.persons.filter((p) => p.name !== name);
    localStorage.setItem("persons", JSON.stringify(this.persons));
  }

  addPerson(person) {
    this.persons.push(person);
    localStorage.setItem("persons", JSON.stringify(this.persons));
  }

  eraseData() {
    this.persons = [];
    localStorage.setItem("persons", JSON.stringify(this.persons));
  }

  async fetchPersons(setLoading) {
    try {
      setLoading(true);
      const data = await fetchPersonsApi();
      this.persons = [...this.persons, ...data];
      localStorage.setItem("persons", JSON.stringify(this.persons));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  sortBy(propName) {
    this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    if (propName === "height") {
      this.persons.sort((a, b) =>
        this.sortDirection === "asc"
          ? parseFloat(a.height) - parseFloat(b.height)
          : parseFloat(b.height) - parseFloat(a.height)
      );
    } else {
      this.persons.sort((a, b) =>
        this.sortDirection === "asc"
          ? a[propName].localeCompare(b[propName])
          : b[propName].localeCompare(a[propName])
      );
    }
    localStorage.setItem("persons", JSON.stringify(this.persons));
  }
}

export default new Person();
