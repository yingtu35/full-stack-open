interface exerciseValues {
    target: number
    exerciseData: number[]
}

export const parseArgument = (argv: string[]): exerciseValues => {
    if (argv.length < 4) throw new Error("Arguments too short")

    if (isNaN(Number(argv[2]))) throw new Error("Provided values are not numbers")
    if (argv.slice(3).some(num => isNaN(Number(num)))) throw new Error("Provided values are not numbers")
    return {
        target: Number(argv[2]),
        exerciseData: argv.slice(3).map(num => Number(num))
    } 
}