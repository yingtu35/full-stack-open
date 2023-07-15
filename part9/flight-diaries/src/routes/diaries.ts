import express from "express";
import diaryServices from "../services/diaryServices";
import toNewDiaryEntry from "../utils/toNewDiaryEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diaryServices.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const diary = diaryServices.getEntryById(Number(req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.status(404).end();
  }
});

router.post("/", (req, res) => {
  try {
    // Proofing requests, making sure the data passed into addEntry is a correct type
    const newEntry = toNewDiaryEntry(req.body);
    res.json(diaryServices.addEntry(newEntry));
  } catch (error: unknown) {
    let message = "Something went wrong. ";
    if (error instanceof Error) {
      message += error.message;
    }
    res.status(400).send({ error: message });
  }
});

export default router;
