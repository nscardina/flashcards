import { Card, isCard, makeEmptyCard } from "./card"

/**
 * Type representing a deck of cards.
 */
export type Deck = {
    /**
     * Name of this deck of cards.
     */
    name: string,
    /**
     * Cards contained in this deck.
     */
    cards: Card[]
}

/**
 * Determines whether an object is a valid `Deck` object.
 * @param object object to check.
 * @returns whether the object is a valid `Deck`.
 */
export function isDeck(object: unknown): object is Deck {
    return typeof(object) === "object" && object !== null &&
        "name" in object && typeof(object.name) === "string" && 
        "cards" in object && Array.isArray(object.cards) && 
        object.cards.every(card => isCard(card))
}

/**
 * Creates a default unique `Deck` object.
 * @returns default `Deck` object
 */
export function makeEmptyDeck(): Deck {
    return {
        name: "Untitled",
        cards: [makeEmptyCard()]
    }
}