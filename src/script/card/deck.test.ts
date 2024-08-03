import { Card } from "./Card";
import { Deck } from "./deck"

describe("Tests for Deck.isDeck() function", () => {
    test("Returns false when number passed", () => {
        expect(Deck.isDeck(10)).toBe(false);
    });

    test("Returns false when string passed", () => {
        expect(Deck.isDeck("test string")).toBe(false);
    });

    test("Returns false when null passed", () => {
        expect(Deck.isDeck(null)).toBe(false);
    });

    test("Returns true when deck with empty array of cards is passed", () => {
        const testDeck: Deck = {
            name: "test deck name",
            cards: []
        };
        expect(Deck.isDeck(testDeck)).toBe(true);
    });

    test("Returns true when deck with 3 cards is passed", () => {
        const testDeck: Deck = {
            name: "test deck name",
            cards: [
                Card.makeDefault(),
                Card.makeDefault(),
                Card.makeDefault(),
            ]
        };
        expect(Deck.isDeck(testDeck)).toBe(true);
    });

    test("Returns false when deck with non-card objects is passed", () => {
        const notAValidDeck = {
            name: "test deck name",
            cards: [
                35,
                "test string",
                null
            ]
        };
        expect(Deck.isDeck(notAValidDeck)).toBe(false);
    });

    test("Returns false when deck with non-string name is passed", () => {
        const notAValidDeck = {
            name: 35,
            cards: [
                Card.makeDefault(),
                Card.makeDefault(),
                Card.makeDefault(),
            ]
        };
        expect(Deck.isDeck(notAValidDeck)).toBe(false);
    });
});