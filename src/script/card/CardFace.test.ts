import { CardFace } from "./CardFace";
import CardLayout from "./cardlayout";

const incompleteCardFace = {
    layout: CardLayout.ONE_BOX
}

const completeCardFace = {
    layout: CardLayout.ONE_BOX,
    box: {
        "1": null,
        "2": null,
        "3": null,
        "4": null
    }
}

// describe("CardFace.isCardFace() methods", () => {
//     test("CardFace.isCardFace(null) returns false", () => {
//         expect(CardFace.isCardFace(null)).toBe(false)
//     })

//     test("CardFace.isCardFace(incompleteCardFace) returns false", () => {
//         expect(CardFace.isCardFace(incompleteCardFace)).toBe(false)
//     })

//     test("CardFace.isCardFace(completeCardFace) returns true", () => {
//         expect(CardFace.isCardFace(completeCardFace)).toBe(true)
//     })
// })