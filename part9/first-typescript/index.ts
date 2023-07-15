import express from "express"
import { calculator, Operation } from "./calculator"
const app = express()

app.get("/ping", (_req, res) => {
  res.send("pong")
})

app.post("/calculator", (req, res) => {
  //   console.log(req)
  const { value1, value2, op } = req.body

  if (!value1 || isNaN(Number(value1))) {
    res.status(400).send({ error: "malformatted parameters" })
  }
  if (!value2 || isNaN(Number(value2))) {
    res.status(400).send({ error: "malformatted parameters" })
  }

  const result = calculator(Number(value1), Number(value2), op as Operation)
  res.send({ result })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`)
})
