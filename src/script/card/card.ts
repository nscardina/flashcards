import CardLayout from "./cardlayout"
import { Box, isBox } from "./box"

/**
 * Type representing the data needed to render the side of a flashcard.
 */
export type SideOfCardData = {
    layout: CardLayout
    box1: Box<any> | null
    box2: Box<any> | null
    box3: Box<any> | null
    box4: Box<any> | null
}

/**
 * Default {@linkcode SideOfCardData} object, used to construct new blank 
 * {@linkcode Card}s.
 */
export const DEFAULT_SIDE_OF_CARD_DATA = {
    layout: CardLayout.ONE_BOX,
    box1: null,
    box2: null,
    box3: null,
    box4: null,
}

/**
 * Determines whether an object is a valid {@linkcode SideOfCardData} object.
 * @param object object to check.
 * @returns whether the object is a valid `SideOfCardData` object.
 */
export function isSideOfCardData(object: unknown): object is SideOfCardData {
    return typeof(object) === "object" && !!object &&
        "layout" in object && 
        (Object.values(CardLayout) as unknown[]).includes(object.layout) &&
        "box1" in object && isBox(object.box1) &&
        "box2" in object && isBox(object.box2) &&
        "box3" in object && isBox(object.box3) &&
        "box4" in object && isBox(object.box4) 
}

/**
 * Type that represents the data needed to represent a flashcard (that is, the 
 * two sides of the card).
 */
export type Card = {
    front: SideOfCardData
    back: SideOfCardData
}

/**
 * Default {@linkcode Card} object used for creating new blank cards.
 */
export const EMPTY_CARD: Card = {
    front: structuredClone(DEFAULT_SIDE_OF_CARD_DATA),
    back: structuredClone(DEFAULT_SIDE_OF_CARD_DATA),
}

/**
 * Determines whether an object is a valid `Card` object.
 * @param object object to check.
 * @returns whether the object is a valid `Card`.
 */
export function isCard(object: unknown): object is Card {
    return typeof(object) === "object" && !!object &&
        "front" in object && isSideOfCardData(object.front) &&
        "back" in object && isSideOfCardData(object.back)
}