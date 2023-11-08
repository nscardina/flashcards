import { CardContentData } from "./CardContentData"
import { LaTeXTextBox } from "./LaTeXTextBox"

const incompleteVideoLinkBox1 = {
    type: CardContentData.Type.LATEX
}

const incompleteVideoLinkBox2 = {
    link: "Test Link Text"
}

const completeVideoLinkBox = {
    type: CardContentData.Type.LATEX,
    link: "Test Link Text"
}

describe("VideoLinkBox.isVideoLinkBox() function", () => {

    test("isVideoLinkBox(undefined) returns false", () => {
        expect(VideoLinkBox.isVideoLinkBox(undefined)).toBe(false)
    })

    test("isVideoLinkBox(3) returns false", () => {
        expect(VideoLinkBox.isVideoLinkBox(3)).toBe(false)
    })

    test("isTextBox({}) returns false", () => {
        expect(VideoLinkBox.isVideoLinkBox({})).toBe(false)
    })

    test("isVideoLinkBox(incompleteVideoLinkBox1) returns false", () => {
        expect(VideoLinkBox.isVideoLinkBox(incompleteVideoLinkBox1)).toBe(false)
    })

    test("isVideoLinkBox(incompleteVideoLinkBox2) returns false", () => {
        expect(VideoLinkBox.isVideoLinkBox(incompleteVideoLinkBox2)).toBe(false)
    })

    test("isTextBox(completeTextBox) returns true", () => {
        expect(VideoLinkBox.isVideoLinkBox(completeVideoLinkBox)).toBe(true)
    })
})

describe("VideoLinkBox.of() function", () => {
    test(`VideoLinkBox.of("Test Link Text") is the same as completeTextBox`, 
    () => {
        const newVideoLinkBox = VideoLinkBox.of("Test Link Text")
        expect(newVideoLinkBox).toMatchObject(completeVideoLinkBox)
    })
})