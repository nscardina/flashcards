import CardLayout from "./cardlayout"
import { CardFace } from "./CardFace"

export type Card = {
    readonly front: CardFace,
    readonly back: CardFace
}

const DEFAULT_CARD: Card = Object.freeze({
    front: Object.freeze({
        layout: CardLayout.ONE_BOX,
        box: Object.freeze({
            "1": null,
            "2": null,
            "3": null,
            "4": null,
        })
    }),
    back: Object.freeze({
        layout: CardLayout.ONE_BOX,
        box: Object.freeze({
            "1": null,
            "2": null,
            "3": null,
            "4": null,
        })
    })
})

export namespace Card {
    export function isCard(variable: unknown): variable is Card {
        return (
            typeof(variable) === "object" && 
            variable !== null && 
            "front" in variable && CardFace.isCardFace(variable.front) && 
            "back" in variable && CardFace.isCardFace(variable.back)
        )
    }

    export function makeDefault(): Card {
        return structuredClone(DEFAULT_CARD)
    }
}