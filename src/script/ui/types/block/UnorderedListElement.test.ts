import { test, describe } from "node:test"
import { UnorderedListElement } from "./UnorderedListElement"
import assert from "node:assert"

describe("Tests for UnorderedListElement.isUnorderedListElement() function", () => {
    test("Passing a string returns false", () => {
        assert.strictEqual(false, UnorderedListElement.isUnorderedListElement("test string"))
    })

    test("Passing a number returns false", () => {
        assert.strictEqual(false, UnorderedListElement.isUnorderedListElement(10000))
    })

    test("Passing null returns false", () => {
        assert.strictEqual(false, UnorderedListElement.isUnorderedListElement(null))
    })

    const testObject1 = {
        type: "unordered_list_element",
        children: [],
        alignment: "left"
    }
    test(`Passing ${JSON.stringify(testObject1)} returns true`, () => {
        assert.strictEqual(true, UnorderedListElement.isUnorderedListElement(testObject1))
    })

    // const testObject2: UnorderedListElement = {
    //     type: "unordered_list_element",
    //     children: [
    //         {
    //             type: "unordered_list_member",
    //             children: [
    //                 {
    //                     type: "paragraph",
    //                     alignment: "left",
    //                     children: [
    //                         {
    //                             type: "formatted_text",
    //                             text: "test",
    //                             bold: true
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ],
    //     alignment: "left"
    // }
    // test(`Passing ${JSON.stringify(testObject2)} returns true`, () => {
    //     expect(UnorderedListElement.isUnorderedListElement(testObject2)).toBe(true)
    // })
})

describe("Tests for UnorderedListMember.isUnorderedListMember() function", () => {
    // test("Passing a string returns false", () => {
    //     expect(UnorderedListMember.isUnorderedListMember("test string")).toBe(false)
    // })

    // test("Passing a number returns false", () => {
    //     expect(UnorderedListMember.isUnorderedListMember(10000)).toBe(false)
    // })

    // test("Passing null returns false", () => {
    //     expect(UnorderedListMember.isUnorderedListMember(null)).toBe(false)
    // })

    // const testObject1 = {
    //     type: "unordered_list_member",
    //     children: []
    // }
    // test(`Passing ${JSON.stringify(testObject1)} returns true`, () => {
    //     expect(UnorderedListMember.isUnorderedListMember(testObject1)).toBe(true)
    // })

    // const testObject2: UnorderedListMember = {
    //     type: "unordered_list_member",
    //     children: [
    //         {
    //             type: "paragraph",
    //             alignment: "left",
    //             children: [
    //                 {
    //                     text: "test",
    //                     bold: true,
    //                     type: "formatted_text"
    //                 }
    //             ]
    //         }
    //     ],
    // }
    // test(`Passing ${JSON.stringify(testObject2)} returns true`, () => {
    //     expect(UnorderedListElement.isUnorderedListElement(testObject2)).toBe(true)
    // })
    
})