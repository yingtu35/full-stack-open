import { NewDiaryEntry } from "../../types";

// TODO: Add type guards to validate the object
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  console.log(object);
  const newEntry: NewDiaryEntry = {
    date: "2023-06-30",
    weather: "sunny",
    visibility: "good",
    comment: "This is a fake entry",
  };

  return newEntry;
};

export default toNewDiaryEntry;
