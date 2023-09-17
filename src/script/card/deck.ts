import { Card } from "./Card"

export type Deck = {
    readonly name: string,
    readonly cards: Card[]
}

const DEFAULT_DECK = {
    name: "Untitled",
    cards: [Card.makeDefault()]
}

export namespace Deck {
    export function isDeck(object: unknown) {
        return (
            typeof(object) === "object" && 
            object !== null && 
            "name" in object && typeof(object.name) === "string" && 
            "cards" in object && Array.isArray(object.cards) && 
            object.cards.every(arrayMember => Card.isCard(arrayMember))
        )
    }

    export function makeDefault(): Deck {
        return structuredClone(DEFAULT_DECK)
    }
}