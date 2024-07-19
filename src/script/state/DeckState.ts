import { StateCreator } from "zustand";
import { Deck } from "../card/deck";
import { Card } from "../card/Card";
import { CardFace } from "../card/CardFace";
import { Side } from "../card/side";
import CardLayout from "../card/cardlayout";
import { Box, BoxNumber } from "../card/Box";

export type DeckState = {
    deck: Deck | null,
    setDeck: (newDeck: Deck | null) => void,
    setDeckName: (newDeckName: string) => void,
    setCards: (newCards: Card[]) => void,
    setCard: (indexInDeck: number, newCard: Card) => void,
    setFrontOfCard: (indexInDeck: number, newFront: CardFace) => void,
    setBackOfCard: (indexInDeck: number, newBack: CardFace) => void,
    setLayoutOfCardFace: (indexOfCardInDeck: number, face: Side, newLayout: CardLayout) => void,
    setBoxOnCardFace: (indexOfCardInDeck: number, side: Side, boxNumber: BoxNumber, box: Box) => void,
}

type OtherParams<F> = F extends (deck: Deck, ...params: infer P) => Deck ? P : never;

function callDeckFunc<F extends Function>(
    func: F,
    deck: Deck | null, 
    ...params: OtherParams<F>
): DeckState | Partial<DeckState> {
    if (deck === null) {
        return { deck: func(Deck.makeDefault(), ...params) };
    } else {
        return { deck: func(deck, ...params) };
    }
}

export const createDeckState: StateCreator<DeckState> = set => ({
    deck: null,
    setDeck: deck => set(_state => ({deck: deck})),
    setDeckName: newDeckName => set(state => callDeckFunc(
        Deck.setName, state.deck, newDeckName
    )),
    setCards: newCards => set(state => callDeckFunc(
        Deck.setCards, state.deck, newCards
    )),
    setCard: (indexInDeck, newCard) => set(state => callDeckFunc(
        Deck.setCard, state.deck, indexInDeck, newCard
    )),
    setFrontOfCard: (indexInDeck, newFront) => set(state => callDeckFunc(
        Deck.setFrontOfCard, state.deck, indexInDeck, newFront
    )),
    setBackOfCard: (indexInDeck, newBack) => set(state => callDeckFunc(
        Deck.setBackOfCard, state.deck, indexInDeck, newBack
    )),
    setLayoutOfCardFace: (indexOfCardInBack, face, side) => set(state => callDeckFunc(
        Deck.setLayoutOfCardFace, state.deck, indexOfCardInBack, face, side
    )),
    setBoxOnCardFace: (indexOfCardInDeck, side, boxNumber, box) => set(state => callDeckFunc(
        Deck.setBoxOnCardFace, state.deck, indexOfCardInDeck, side, boxNumber, box
    )),
})