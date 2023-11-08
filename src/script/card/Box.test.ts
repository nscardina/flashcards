import { Box, getEditorTypeFromBoxType } from "./Box"
import { ImageBox } from "./ImageBox"
import { TextBox } from "./TextBox"
import fs from "fs"
import { LaTeXTextBox } from "./LaTeXTextBox"
import { Editor } from "../app/Editor"

describe("Box.isBox() method", () => {
    test("Box.isBox({}) returns false", () => {
        expect(Box.isBox({})).toBe(false)
    })

    test("Box.isBox(a TextBox) returns true", () => {
        expect(Box.isBox(TextBox.of("Test Text"))).toBe(true)
    })

    test("Box.isBox(an ImageBox) returns true", () => {
        expect(Box.isBox(ImageBox.of(fs.readFileSync(
            `${__dirname}/ImageBoxTestImage.png`,
            {encoding: "base64url"}
        )))).toBe(true)
    })

    test("Box.isBox(a VideoLinkBox) returns true", () => {
        expect(Box.isBox(LaTeXTextBox.of("Test Video Link"))).toBe(true)
    })
})

describe("getEditorTypeFromBoxType() method", () => {
    test("getEditorTypeFromBoxType({}) returns Editor.NONE", () => {
        expect(getEditorTypeFromBoxType({} as any)).toBe(Editor.NONE)
    })

    test("getEditorTypeFromBoxType(a TextBox) returns true", () => {
        expect(getEditorTypeFromBoxType(TextBox.of("Test"))).toBe(Editor.PLAIN_TEXT)
    })

    test("getEditorTypeFromBoxType(an ImageBox) returns true", () => {
        expect(getEditorTypeFromBoxType(ImageBox.of(fs.readFileSync(
            `${__dirname}/ImageBoxTestImage.png`,
            {encoding: "base64url"}
        )))).toBe(Editor.IMAGE)
    })

    test("getEditorTypeFromBoxType(a VideoLinkBox) returns true", () => {
        expect(getEditorTypeFromBoxType(LaTeXTextBox.of("Test Link")))
        .toBe(Editor.LATEX_TEST)
    })
})