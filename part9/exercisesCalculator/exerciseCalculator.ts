import { parseArgument } from "./exerciseCalculatorParser"

const rateDescription = {
  1: "still a lot of room to improve",
  2: "not too bad but could be better",
  3: "great job! keep it up",
}

interface exerciseReport {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const exerciseCalculator = (
  exerciseData: number[],
  target: number
): exerciseReport => {
  const periodLength = exerciseData.length
  const trainingDays = exerciseData.filter((hours) => hours > 0).length
  const average = exerciseData.reduce((acc, val) => acc + val, 0) / periodLength

  if (exerciseData.some((num) => num < 0))
    throw new Error("Daily exercises hours should be non-negative")

  let rating: number
  let ratingDescription: string
  let success: boolean
  const ratio = target !== 0 ? average / target : 1

  if (ratio < 0.5) {
    rating = 1
    success = false
    ratingDescription = rateDescription[1]
  } else if (ratio < 1) {
    rating = 2
    success = false
    ratingDescription = rateDescription[2]
  } else {
    rating = 3
    success = true
    ratingDescription = rateDescription[3]
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const { target, exerciseData } = parseArgument(process.argv)
  console.log(exerciseCalculator(exerciseData, target))
} catch (error: unknown) {
  const errorMessage = "Something went wrong. "
  if (error instanceof Error) {
    console.log(errorMessage + error.message)
  }
}
