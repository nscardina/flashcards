import assert from "node:assert"
import { test, describe } from "node:test"
import { FormattedTextSpan } from "./FormattedTextSpan"
import { makeDefaultFormattedText } from "../leaf/FormattedText";

describe("FormattedTextSpan.isFormattedTextSpan()", () => {
    ["test string", 1000, null].forEach(value => {
        test(`should return false when passed a ${typeof(value)} value`, () => {
            assert.strictEqual(false, FormattedTextSpan.isFormattedTextSpan(value));
        });
    });

    const testObject1 = {
        type: "wrong type",
        children: []
    };
    test(`should return false when passed ${JSON.stringify(testObject1)}`, () => {
        assert.strictEqual(false, FormattedTextSpan.isFormattedTextSpan(testObject1));
    });

    const testObject2 = {
        type: "formatted_text_span",
        children: []
    };
    test(`should return true when passed ${JSON.stringify(testObject2)}`, () => {
        assert.strictEqual(true, FormattedTextSpan.isFormattedTextSpan(testObject2));
    });

    ["test string", 1000, null].map(value => ({
        type: "formatted_text_span",
        children: [value]
    })).forEach(testObject => {
        test(`should return false when passed ${JSON.stringify(testObject)}`, () => {
            assert.strictEqual(false, FormattedTextSpan.isFormattedTextSpan(testObject));
        });
    });

    const testObject4 = {
        type: "formatted_text_span",
        children: [makeDefaultFormattedText()],
    };
    test(`should return true when passed ${JSON.stringify(testObject4)}`, () => {
        assert.strictEqual(true, FormattedTextSpan.isFormattedTextSpan(testObject4));
    });
});