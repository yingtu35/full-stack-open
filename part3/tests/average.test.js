const average = require("../utils/for_testing").average

describe("average", () => {
    test("of one value is the value itself", () => {
        expect(average([1])).toEqual(1)
    })

    test("of many is calculated correctly", () => {
        expect(average([1, 2, 3, 4, 5])).toEqual(3)
    })

    test("of empty array is zero", () => {
        expect(average([])).toEqual(0)
    })
})