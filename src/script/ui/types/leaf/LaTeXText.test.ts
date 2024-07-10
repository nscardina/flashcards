import assert from "node:assert";
import { describe, test } from "node:test";
import { LaTeXText } from "./LaTeXText";

describe("LaTeXText.isLaTeXText()", () => {
    test("should return false when passed a string", () => {
        assert.strictEqual(false, LaTeXText.isLaTeXText("test string"));
    });

    test("should return false when passed a number", () => {
        assert.strictEqual(false, LaTeXText.isLaTeXText(1000));
    });

    test("should return false when passed null", () => {
        assert.strictEqual(false, LaTeXText.isLaTeXText(null));
    });

    const testObject1 = {
        text: "test string",
    };
    test(`should return false when passed ${JSON.stringify(testObject1)}`, () => {
        assert.strictEqual(false, LaTeXText.isLaTeXText(testObject1));
    });

    const testObject2 = {
        type: "latex_text",
        text: "test_string",
    }
    test(`should return true when passed ${JSON.stringify(testObject2)}`, () => {
        assert.strictEqual(true, LaTeXText.isLaTeXText(testObject2));
    });

    [1000, null].map(text => ({
        type: "latex_text",
        text: text,
    })).forEach(testObject => {
        test(`should return false when passed ${JSON.stringify(testObject)}`, () => {
            assert.strictEqual(false, LaTeXText.isLaTeXText(testObject));
        });
    });
});