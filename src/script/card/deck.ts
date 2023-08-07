import { Card } from "./card"

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