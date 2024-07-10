import { test, describe } from "node:test"
import assert from "node:assert"
import { ParagraphElement } from "./ParagraphElement"


const testTypes: [string, boolean][] = [
    [ "paragraph", true ],
    [ "notAParagraph", false ],
]

const testChildren = [
    [ [], true ], 
]

const horizontalAlignments = [
    [ "left", true ],
    [ "center", true ],
    [ "right", true ],
    [ "justified", true ],
    [ "notAHorizontalAlignment", false ],
]

const testObjects = testTypes
    .map(testType => [{type: testType[0]}, testType[1]] as [{type: string}, boolean])
    .flatMap(object => Object.values(testChildren)
        .map(testChild => [{...(object[0]), children: testChild[0]}, object[1] && testChild[1]] as [{type: string, children: any}, boolean]))
    .flatMap(object => Object.values(horizontalAlignments)
        .map(alignment => [{...(object[0]), alignment: alignment[0]}, object[1] && alignment[1]] as [{type: string, children: any, alignment: string}, boolean]))
    
describe(`ParagraphElement.isParagraphElement()`, () => {
    for (const testObject of testObjects) {
        test(`should return ${testObject[1]} when passing ${JSON.stringify(testObject[0])}`, () => {
            assert.strictEqual(testObject[1], ParagraphElement.isParagraphElement(testObject[0]));
        });
    };
});

// describe("Tests for ParagraphElement.isParagraphElement() function", () => {

//     test.each(testObjects)(
//         "test", (object, expected) => {
//             expect(ParagraphElement.isParagraphElement(object)).toBe(expected)
//         }
//     )

// })