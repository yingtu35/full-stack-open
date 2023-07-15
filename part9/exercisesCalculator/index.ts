import express from "express"
import { bmiCalculator } from "./bmiCalculator"
import { exerciseCalculator } from "./exerciseCalculator"
const app = express()

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack")
})

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  if (isNaN(height) || isNaN(weight) || height < 0 || weight < 0) {
    res.status(400).send({
      error: "malformatted parameters",
    })
  }
  const bmi = bmiCalculator(height, weight)
  res.json({
    height,
    weight,
    bmi,
  })
})

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body
  if (!target || !daily_exercises) {
    res.status(400).send({ error: "parameters missing" })
  }
  if (isNaN(Number(target))) {
    res.status(400).send({ error: "malformatted parameters" })
  }
  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((num) => isNaN(Number(num))) ||
    daily_exercises.some((num) => num < 0)
  ) {
    res.status(400).send({ error: "malformatted parameters" })
  }

  const result = exerciseCalculator(daily_exercises, Number(target))
  res.json({ result })
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`)
})
