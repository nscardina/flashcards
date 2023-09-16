import { CardContentData } from "./CardContentData"
import { TextBox } from "./TextBox"

describe("TextBox.isTextBox() function", () => {

    const incompleteTextBox1 = {
        type: CardContentData.Type.TEXT
    }

    const incompleteTextBox2 = {
        text: "Test Text"
    }

    const completeTextBox = {
        type: CardContentData.Type.TEXT,
        text: "Test Text"
    }

    test("isTextBox(undefined) returns false", () => {
        expect(TextBox.isTextBox(undefined)).toBe(false)
    })

    test("isTextBox(3) returns false", () => {
        expect(TextBox.isTextBox(3)).toBe(false)
    })

    test("isTextBox({}) returns false", () => {
        expect(TextBox.isTextBox({})).toBe(false)
    })

    test("isTextBox(incompleteTextBox1) returns false", () => {
        expect(TextBox.isTextBox(incompleteTextBox1)).toBe(false)
    })

    test("isTextBox(incompleteTextBox2) returns false", () => {
        expect(TextBox.isTextBox(incompleteTextBox2)).toBe(false)
    })

    test("isTextBox(completeTextBox) returns true", () => {
        expect(TextBox.isTextBox(completeTextBox)).toBe(true)
    })
})