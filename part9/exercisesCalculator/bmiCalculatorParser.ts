interface bmiValues {
    height: number,
    weight: number
}

export const parseArgument = (argv: string[]): bmiValues => {
    if (argv.length < 4) throw new Error("Arguments too short")

    if (isNaN(Number(argv[2])) || isNaN(Number(argv[3]))) throw new Error("Provided values are not numbers")
    return {
        height: Number(argv[2]),
        weight: Number(argv[3])
    } 
}