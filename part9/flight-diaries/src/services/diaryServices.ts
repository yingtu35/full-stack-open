import diaryData from "../../data/diaryentries";
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "../../types";

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const getEntryById = (id: number): DiaryEntry | undefined => {
  return diaries.find((diary) => diary.id === id);
};

const addEntry = (entry: NewDiaryEntry) => {
  const newEntry: DiaryEntry = {
    id: Math.max(...diaries.map((diary) => diary.id)) + 1,
    ...entry,
  };
  diaries.push(newEntry);
  return newEntry;
};

export default { getEntries, getNonSensitiveEntries, addEntry, getEntryById };
