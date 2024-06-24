import { Box, BoxNumber } from "./Box"
import { Card } from "./Card"
import { CardFace } from "./CardFace"
import CardLayout from "./cardlayout"
import { Side } from "./side"

export type Deck = {
    readonly name: string,
    readonly cards: Card[]
}

const DEFAULT_DECK = {
    name: "Untitled",
    cards: [Card.makeDefault()]
}

export namespace Deck {
    export function isDeck(object: unknown): object is Deck {
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

    /**
     * Returns a new `Deck` object that is identical to the 
     * one passed in aside from the `name` field, which has 
     * the value specified in the `newName` parameter.
     * @param deck existing `Deck` object.
     * @param newName new name.
     * @returns new `Deck` object.
     */
    export function setName(
        deck: Deck,
        newName: string,
    ): Deck {
        return {
            ...deck,
            name: newName
        }
    }

    /**
     * Returns a new `Deck` object that is identical to the 
     * one passed in aside from the `cards` field, which has
     * the value specified in the `newCards` parameter.
     * @param deck existing `Deck` object.
     * @param newCards new array of cards.
     * @returns new `Deck` object.
     */
    export function setCards(
        deck: Deck,
        newCards: Card[]
    ): Deck {
        return {
            ...deck,
            cards: newCards 
        }
    }

    /**
     * Returns a new `Deck` object that is identical to the 
     * one passed in aside from one card, which takes the 
     * value specified in the `newCard` parameter and is at
     * the specified index.
     * @param deck existing `Deck` object.
     * @param indexInDeck index of card to replace in deck.
     * @param newCard new card.
     * @returns new `Deck` object.
     */
    export function setCard(
        deck: Deck,
        indexInDeck: number,
        newCard: Card
    ): Deck {
        const newCards = [
            ...deck.cards.slice(0, indexInDeck),
            newCard,
            ...deck.cards.slice(indexInDeck + 1)
        ]
        return setCards(deck, newCards)
    }

    /**
     * Returns a new `Deck` object that is identical to the 
     * one passed in aside from one card, which is identical to
     * the existing card at the specified index aside from its
     * front side, which is specified by `newFront`.
     * @param deck existing `Deck` object.
     * @param indexInDeck index of card to alter in deck.
     * @param newFront new front side of card.
     * @returns new `Deck` object.
     */
    export function setFrontOfCard(
        deck: Deck,
        indexInDeck: number,
        newFront: CardFace
    ): Deck {
        const newCard: Card = {
            ...deck.cards[indexInDeck],
            front: newFront,
        }
        return setCard(deck, indexInDeck, newCard)
    }

    /**
     * Returns a new `Deck` object that is identical to the 
     * one passed in aside from one card, which is identical to
     * the existing card at the specified index aside from its
     * back side, which is specified by `newBack`.
     * @param deck existing `Deck` object.
     * @param indexInDeck index of card to alter in deck.
     * @param newBack new back side of card.
     * @returns new `Deck` object.
     */
    export function setBackOfCard(
        deck: Deck,
        indexInDeck: number,
        newBack: CardFace
    ): Deck {
        const newCard: Card = {
            ...deck.cards[indexInDeck],
            back: newBack,
        }
        return setCard(deck, indexInDeck, newCard)
    }

    /**
     * Returns a new `Deck` object that is identical to the 
     * one passed in aside from one card, which is identical to
     * the existing card at the specified index aside from the 
     * layout of one of its faces, as specified by the parameters.
     * @param deck existing `Deck` object.
     * @param indexOfCardInDeck index of card to alter in deck.
     * @param face face of card to alter.
     * @param newLayout new layout of the specified face.
     * @returns new `Deck` object.
     */
    export function setLayoutOfCardFace(
        deck: Deck,
        indexOfCardInDeck: number,
        face: Side,
        newLayout: CardLayout
    ): Deck {
        const newCardFace = CardFace.setLayout(
            deck.cards[indexOfCardInDeck][face],
            newLayout
        )
        if (face === Side.FRONT) {
            return setFrontOfCard(deck, indexOfCardInDeck, newCardFace)
        } else {
            return setBackOfCard(deck, indexOfCardInDeck, newCardFace)
        }
    }

    /**
     * Returns a new `Deck` object that is identical to the 
     * one passed in aside from one card, which is identical to
     * the existing card at the specified index aside from one of
     * the boxes on one of its faces, as specified by the parameters.
     * @param deck existing `Deck` object.
     * @param indexOfCardInDeck index of the card to be altered in the
     * deck.
     * @param side side of the card to be altered.
     * @param boxNumber number of the box to be altered.
     * @param box new box.
     * @returns new `Deck` object.
     */
    export function setBoxOnCardFace(
        deck: Deck,
        indexOfCardInDeck: number,
        side: Side,
        boxNumber: BoxNumber,
        box: Box,
    ): Deck {
        const newBoxes = deck.cards[indexOfCardInDeck][side].box
        newBoxes[boxNumber] = box
        
        const newFace: CardFace = {
            ...deck.cards[indexOfCardInDeck][side],
            box: newBoxes
        }

        if (side === Side.FRONT) {
            return setFrontOfCard(deck, indexOfCardInDeck, newFace)
        } else {
            return setBackOfCard(deck, indexOfCardInDeck, newFace)
        }
    }

    
}