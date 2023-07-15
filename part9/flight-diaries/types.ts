export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string; // optional field
}

export type Weather = "sunny" | "windy" | "cloudy" | "rainy" | "stormy";

export type Visibility = "good" | "ok" | "poor";

// Pick and Omit construct a type that pick or omit certaing fields from a type
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
