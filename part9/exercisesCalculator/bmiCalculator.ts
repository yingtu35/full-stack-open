import { parseArgument } from "./bmiCalculatorParser"

export const bmiCalculator = (height: number, weight: number): string => {
    if (height < 0 || weight <= 0) throw new Error("Height and weight must be positive")
    height = height / 100

    const bmi = Number((weight / height**2).toFixed(1))
    if (bmi < 16.0) {
        return "Underweight (Severe thinness)"
    } else if (bmi < 16.9) {
        return "Underweight (Moderate thinness)"
    } else if (bmi < 18.4) {
        return "Underweight (Mild thinness)"
    } else if (bmi < 24.9) {
        return "Normal range"
    } else if (bmi < 29.9) {
        return "Overweight (Pre-obese)"
    } else {
        return "Obese"
    }
}

try {
    const { height, weight } = parseArgument(process.argv)
    console.log(bmiCalculator(height, weight))
} catch (error: unknown) {
    let errorMessage = "Something went wrong. "
    if (error instanceof Error) {
        console.log(errorMessage + error.message)
    }
}