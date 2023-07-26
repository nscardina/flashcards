import { Action, configureStore } from "@reduxjs/toolkit";
import { Deck } from "./card/deck";

type DeckHistory = {
    currentVersion: number,
    lastSavedVersion: number,
    versions: Deck[]
}

const initialState: DeckHistory | null = null
function deckReducer(state = initialState, action: Action) {

    if (action.type === 'deck/newDeck') {
    
        // If a deck was loaded, check if there have been any edits (the current version is not equal to the 
        // lastSavedVersion). This means that a confirmation prompt needs to be displayed.
        if (state && state.currentVersion !== state.lastSavedVersion) {
            // TODO
        }

        // If no deck is loaded, or if a deck was loaded, and there were no edits, create an empty 
        // DeckHistory with no cards and the current version being -1 (as there 
        // are no cards to reference)
        return {
            currentVersion: -1,
            lastSavedVersion: -1,
            versions: []
        }
        
    }

    

    return state

}

export function newDeck(): Action {
    return {
        'type': 'deck/newDeck'
    }
}

export const deckStore = configureStore({reducer: deckReducer})

export const selectDeck = (state: DeckHistory | null) => state