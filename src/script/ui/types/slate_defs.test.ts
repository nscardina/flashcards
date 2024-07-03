import { FormattedText } from "./slate_defs"

describe("Tests for FormattedText.isFormattedText() function", () => {
    test("Passing string data returns false", () => {
        expect(FormattedText.isFormattedText("test string")).toBe(false)
    })

    test("Passing number data returns false", () => {
        expect(FormattedText.isFormattedText(1000)).toBe(false)
    })

    test("Passing null returns false", () => {
        expect(FormattedText.isFormattedText(null)).toBe(false)
    })

    const testObject1 = {
        text: "test text"
    }
    test(`Passing ${JSON.stringify(testObject1)} returns true`, () => {
        expect(FormattedText.isFormattedText(testObject1)).toBe(true)
    })

    const testObject2 = {
        text: 1000
    }
    test(`Passing ${JSON.stringify(testObject2)} returns false`, () => {
        expect(FormattedText.isFormattedText(testObject2)).toBe(false)
    })

    const testObject3 = {
        ...testObject1, 
        bold: true
    }
    test(`Passing ${JSON.stringify(testObject3)} returns true`, () => {
        expect(FormattedText.isFormattedText(testObject3)).toBe(true)
    })

    const testObject4 = {
        ...testObject1,
        bold: false
    }
    test(`Passing ${JSON.stringify(testObject4)} returns false`, () => {
        expect(FormattedText.isFormattedText(testObject4)).toBe(false)
    })

    const testObject5 = {
        ...testObject1, 
        italic: true
    }
    test(`Passing ${JSON.stringify(testObject5)} returns true`, () => {
        expect(FormattedText.isFormattedText(testObject5)).toBe(true)
    })

    const testObject6 = {
        ...testObject1,
        italic: false
    }
    test(`Passing ${JSON.stringify(testObject6)} returns false`, () => {
        expect(FormattedText.isFormattedText(testObject6)).toBe(false)
    })

    const testObject7 = {
        ...testObject1, 
        underlined: true
    }
    test(`Passing ${JSON.stringify(testObject7)} returns true`, () => {
        expect(FormattedText.isFormattedText(testObject7)).toBe(true)
    })

    const testObject8 = {
        ...testObject1,
        underlined: false
    }
    test(`Passing ${JSON.stringify(testObject8)} returns false`, () => {
        expect(FormattedText.isFormattedText(testObject8)).toBe(false)
    })

    const testObject9 = {
        ...testObject1, 
        strikethrough: true
    }
    test(`Passing ${JSON.stringify(testObject9)} returns true`, () => {
        expect(FormattedText.isFormattedText(testObject9)).toBe(true)
    })

    const testObject10 = {
        ...testObject1,
        strikethrough: false
    }
    test(`Passing ${JSON.stringify(testObject10)} returns false`, () => {
        expect(FormattedText.isFormattedText(testObject10)).toBe(false)
    })

    const testObject11 = {
        ...testObject1, 
        superscript: true
    }
    test(`Passing ${JSON.stringify(testObject11)} returns true`, () => {
        expect(FormattedText.isFormattedText(testObject11)).toBe(true)
    })

    const testObject12 = {
        ...testObject1,
        superscript: false
    }
    test(`Passing ${JSON.stringify(testObject12)} returns false`, () => {
        expect(FormattedText.isFormattedText(testObject12)).toBe(false)
    })

    const testObject13 = {
        ...testObject1, 
        subscript: true
    }
    test(`Passing ${JSON.stringify(testObject13)} returns true`, () => {
        expect(FormattedText.isFormattedText(testObject13)).toBe(true)
    })

    const testObject14 = {
        ...testObject1,
        subscript: false
    }
    test(`Passing ${JSON.stringify(testObject14)} returns false`, () => {
        expect(FormattedText.isFormattedText(testObject14)).toBe(false)
    })
})