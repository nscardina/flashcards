import { CardContentData } from "./CardContentData"
import { LaTeXTextBox } from "./LaTeXTextBox"

const incompleteLaTeXTextBox1 = {
    type: CardContentData.Type.LATEX
}

const incompleteLaTeXTextBox2 = {
    latex_text: "Test Link Text"
}

const completeLaTeXTextBox = {
    type: CardContentData.Type.LATEX,
    latex_text: "Test Link Text"
}

describe("LaTeXTextBox.isLaTeXTextBox() function", () => {

    test("isLaTeXTextBox(undefined) returns false", () => {
        expect(LaTeXTextBox.isLaTeXTextBox(undefined)).toBe(false)
    })

    test("isLaTeXTextBox(3) returns false", () => {
        expect(LaTeXTextBox.isLaTeXTextBox(3)).toBe(false)
    })

    test("isTextBox({}) returns false", () => {
        expect(LaTeXTextBox.isLaTeXTextBox({})).toBe(false)
    })

    test("isLaTeXTextBox(incompleteLaTeXTextBox1) returns false", () => {
        expect(LaTeXTextBox.isLaTeXTextBox(incompleteLaTeXTextBox1)).toBe(false)
    })

    test("isLaTeXTextBox(incompleteLaTeXTextBox2) returns false", () => {
        expect(LaTeXTextBox.isLaTeXTextBox(incompleteLaTeXTextBox2)).toBe(false)
    })

    test("isTextBox(completeTextBox) returns true", () => {
        expect(LaTeXTextBox.isLaTeXTextBox(completeLaTeXTextBox)).toBe(true)
    })
})

describe("LaTeXTextBox.of() function", () => {
    test(`LaTeXTextBox.of("Test Link Text") is the same as completeTextBox`, 
    () => {
        const newLaTeXTextBox = LaTeXTextBox.of("Test Link Text")
        expect(newLaTeXTextBox).toMatchObject(completeLaTeXTextBox)
    })
})