import assert from "node:assert"
import { test, describe } from "node:test"
import { LaTeXTextSpan } from "./LaTeXTextSpan"
import { LaTeXText } from "../leaf/LaTeXText";

describe("LaTeXTextSpan.isLaTeXTextSpan()", () => {
    ["test string", 1000, null].forEach(value => {
        test(`should return false when passed a ${typeof(value)} value`, () => {
            assert.strictEqual(false, LaTeXTextSpan.isLaTeXTextSpan(value));
        });
    });

    const testObject1 = {
        type: "wrong type",
        children: []
    };
    test(`should return false when passed ${JSON.stringify(testObject1)}`, () => {
        assert.strictEqual(false, LaTeXTextSpan.isLaTeXTextSpan(testObject1));
    });

    const testObject2 = {
        type: "latex_text_span",
        children: []
    };
    test(`should return true when passed ${JSON.stringify(testObject2)}`, () => {
        assert.strictEqual(true, LaTeXTextSpan.isLaTeXTextSpan(testObject2));
    });

    ["test string", 1000, null].map(value => ({
        type: "latex_text_span",
        children: [value]
    })).forEach(testObject => {
        test(`should return false when passed ${JSON.stringify(testObject)}`, () => {
            assert.strictEqual(false, LaTeXTextSpan.isLaTeXTextSpan(testObject));
        });
    });

    const testObject4 = {
        type: "latex_text_span",
        children: [LaTeXText.makeDefault()],
    };
    test(`should return true when passed ${JSON.stringify(testObject4)}`, () => {
        assert.strictEqual(true, LaTeXTextSpan.isLaTeXTextSpan(testObject4));
    });
})
