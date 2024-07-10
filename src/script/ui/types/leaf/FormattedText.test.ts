import assert from "node:assert"
import { test, describe } from "node:test"
import { isFormattedText } from "./FormattedText"

describe("isFormattedText()", () => {
    test("should return false when passed a string", () => {
        assert.strictEqual(false, isFormattedText("test string"));
    });

    test("should return false when passed a number", () => {
        assert.strictEqual(false, isFormattedText(1000));
    });

    test("should return false when passed null", () => {
        assert.strictEqual(false, isFormattedText(null));
    });

    const testObject1 = {
        text: "test text",
    };
    test(`should return false when passed ${JSON.stringify(testObject1)}`, () => {
        assert.strictEqual(false, isFormattedText(testObject1));
    });

    const testObject2 = {
        type: "formatted_text",
        text: "test text",
    };
    test(`should return true when passed ${JSON.stringify(testObject2)}`, () => {
        assert.strictEqual(true, isFormattedText(testObject2));
    });

    const testObject3 = {
        type: "formatted_text",
        text: 1000,
    };
    test(`should return false when passed ${JSON.stringify(testObject3)}`, () => {
        assert.strictEqual(false, isFormattedText(testObject3));
    });

    const testObject4 = {
        type: "formatted_text",
        text: "test text",
        bold: true,
    };
    test(`should return true when passed ${JSON.stringify(testObject4)}`, () => {
        assert.strictEqual(true, isFormattedText(testObject4));
    });

    const testObject5 = {
        type: "formatted_text",
        text: "test text",
        bold: false,
    };
    test(`should return false when passed ${JSON.stringify(testObject5)}`, () => {
        assert.strictEqual(false, isFormattedText(testObject5));
    });

    const testObject6 = {
        type: "formatted_text",
        text: "test text",
        italic: true,
    };
    test(`should return true when passed ${JSON.stringify(testObject6)}`, () => {
        assert.strictEqual(true, isFormattedText(testObject6));
    });

    const testObject7 = {
        type: "formatted_text",
        text: "test text",
        italic: false,
    };
    test(`should return false when passed ${JSON.stringify(testObject7)}`, () => {
        assert.strictEqual(false, isFormattedText(testObject7));
    });

    const testObject8 = {
        type: "formatted_text",
        text: "test text",
        underlined: true,
    };
    test(`should return true when passed ${JSON.stringify(testObject8)}`, () => {
        assert.strictEqual(true, isFormattedText(testObject8));
    });

    const testObject9 = {
        type: "formatted_text",
        text: "test text",
        underlined: false,
    };
    test(`should return false when passed ${JSON.stringify(testObject9)}`, () => {
        assert.strictEqual(false, isFormattedText(testObject9));
    });

    const testObject10 = {
        type: "formatted_text",
        text: "test text",
        strikethrough: true,
    };
    test(`should return true when passed ${JSON.stringify(testObject10)}`, () => {
        assert.strictEqual(true, isFormattedText(testObject10));
    });

    const testObject11 = {
        type: "formatted_text",
        text: "test text",
        strikethrough: false,
    };
    test(`should return false when passed ${JSON.stringify(testObject11)}`, () => {
        assert.strictEqual(false, isFormattedText(testObject11));
    });

    const testObject12 = {
        type: "formatted_text",
        text: "test text",
        superscript: true,
    };
    test(`should return true when passed ${JSON.stringify(testObject12)}`, () => {
        assert.strictEqual(true, isFormattedText(testObject12));
    });

    const testObject13 = {
        type: "formatted_text",
        text: "test text",
        superscript: false,
    };
    test(`should return false when passed ${JSON.stringify(testObject13)}`, () => {
        assert.strictEqual(false, isFormattedText(testObject13));
    });

    const testObject14 = {
        type: "formatted_text",
        text: "test text",
        subscript: true,
    };
    test(`should return true when passed ${JSON.stringify(testObject14)}`, () => {
        assert.strictEqual(true, isFormattedText(testObject14));
    });

    const testObject15 = {
        type: "formatted_text",
        text: "test text",
        subscript: false,
    };
    test(`should return false when passed ${JSON.stringify(testObject15)}`, () => {
        assert.strictEqual(false, isFormattedText(testObject15));
    });

    const testObject16 = {
        type: "formatted_text",
        text: "test text",
        fontFamily: "test string",
    };
    test(`should return true when passed ${JSON.stringify(testObject16)}`, () => {
        assert.strictEqual(true, isFormattedText(testObject16));
    });

    const testObject17 = {
        type: "formatted_text",
        text: "test text",
        fontFamily: 1000,
    };
    test(`should return false when passed ${JSON.stringify(testObject17)}`, () => {
        assert.strictEqual(false, isFormattedText(testObject17));
    });

    ["xx-small", "x-small", "small", "medium" , "large" , "x-large" , "xx-large" , "xxx-large"]
    .map(fontSize => ({
        type: "formatted_text",
        text: "test text",
        fontSize: fontSize,
    }))
    .forEach(testObject => {
        test(`should return true when passed ${JSON.stringify(testObject)}`, () => {
            assert.strictEqual(true, isFormattedText(testObject));
        })
    });

    ["test string", 1000, null]
    .map(fontSize => ({
        type: "formatted_text",
        text: "test text",
        fontSize: fontSize,
    }))
    .forEach(testObject => {
        test(`should return false when passed ${JSON.stringify(testObject)}`, () => {
            assert.strictEqual(false, isFormattedText(testObject));
        })
    });
});