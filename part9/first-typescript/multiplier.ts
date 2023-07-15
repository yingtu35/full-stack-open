interface MultiplyValues {
    value1: number
    value2: number
}

const parseArgument = (argv: string[]): MultiplyValues => {
    if (argv.length < 4) throw new Error("Arguments too short")

    if (isNaN(Number(argv[2])) || isNaN(Number(argv[3]))) throw new Error("Provided values are not numbers")
    return {
        value1: Number(argv[2]),
        value2: Number(argv[3])
    } 
}

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
}

try {
    const { value1, value2 } = parseArgument(process.argv)
    multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (error: unknown) {
    let errorMessage = "Something went wrong"
    if (error instanceof Error) {
        console.log(errorMessage + error.message)
    }
}