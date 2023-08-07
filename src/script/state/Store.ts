import { Action, PayloadAction, configureStore } from "@reduxjs/toolkit";
import { Deck } from "../card/deck";
import { Side } from "../card/side";
import { EMPTY_CARD } from "../card/card";
import AppMode from "../app/AppMode";
import { DeckHistory } from "../card/DeckHistory";
import {  ShowSideProviderName } from "../ShowSideProvider";
import { ReviewOrder } from "../ReviewOrder";
import { Editor } from "../app/Editor";


/**
 * Type of data that will be stored in the data store for this app.
 */
export type AppStoreDataType = {
    appMode: AppMode,
    deck: Deck | null,
    deckHistory: DeckHistory,
    reviewOrder: ReviewOrder,
    showSideProviderName: ShowSideProviderName,
    visibleEditor: Editor,
    visibleCardIndex: number,
    visibleSide: Side,
}

/**
 * Value to use as an index of a card in a deck of cards when no card is 
 * currently focused.
 */
export const NO_CARD_FOCUSED: number = -1

/**
 * Initial state of the data store for this app.
 */
const INITIAL_STATE: AppStoreDataType = {
    appMode: AppMode.MANAGING_FILES,
    deck: null,
    deckHistory: {
        data: {
            name: "Untitled",
            cards: [structuredClone(EMPTY_CARD)]
        },
        events: []
    },
    reviewOrder: ReviewOrder.IN_ORDER,
    showSideProviderName: 'FRONT',
    visibleEditor: Editor.NONE,
    visibleCardIndex: NO_CARD_FOCUSED,
    visibleSide: Side.FRONT,
}

type EditorActions =
    Action<'editor/newCard'>

type AppActions = 
    PayloadAction<AppMode, 'app/appMode'> |
    PayloadAction<ReviewOrder, 'app/reviewOrder'> |
    PayloadAction<ShowSideProviderName, 'app/showSideProviderName'> |
    PayloadAction<Editor, 'app/visibleEditor'>


function appReducer(state = INITIAL_STATE, action: AppActions):
AppStoreDataType {
    switch (action.type) {
        case 'app/appMode': 
            return {
                ...state,
                appMode: action.payload
            }
        case 'app/reviewOrder':
            return {
                ...state,
                reviewOrder: action.payload
            }
        case 'app/showSideProviderName':
            return {
                ...state,
                showSideProviderName: action.payload
            }
        case 'app/visibleEditor':
            return {
                ...state,
                visibleEditor: action.payload
            }
        default: 
            return state
    }
}



function editorReducer(state = INITIAL_STATE, action: EditorActions):
AppStoreDataType {
    switch (action.type) {
        case 'editor/newCard':
            // If no deck is loaded yet, create a new empty DeckHistory
            if (state.deck === null) {
                return {
                    ...state,
                    deck: {
                        name: "Untitled",
                        cards: [structuredClone(EMPTY_CARD)],
                    },
                    appMode: AppMode.EDITING_DECK,
                    visibleCardIndex: 0,
                }
            } else {
                // If deck is loaded, create a new card and place it in the 
                // deck after the current card
                return {
                    ...state,
                    deck: {
                        name: state.deck.name,
                        cards: [
                            ...state.deck.cards.slice(
                                0, 
                                state.visibleCardIndex + 1
                            ),
                            structuredClone(EMPTY_CARD),
                            ...state.deck.cards.slice(
                                state.visibleCardIndex + 1, 
                                state.deck.cards.length
                            )
                        ]
                    }
                }
            }
            break
        
        default:
            return state
    }
}



function rootReducer(state = INITIAL_STATE, action: AppActions | EditorActions) {
    if (action.type.startsWith('editor/')) {
        return editorReducer(state, action as EditorActions)
    } 
    else if (action.type.startsWith('app/')) {
        return appReducer(state, action as AppActions)
    } else {
        return state
    }
}

export const selectAppMode = (state: AppStoreDataType) => state.appMode
export const selectDeck = (state: AppStoreDataType) => state.deck
export const selectDeckHistory = (state: AppStoreDataType) => state.deckHistory
export const selectReviewOrder = (state: AppStoreDataType) => state.reviewOrder
export const selectShowSideProviderName = 
    (state: AppStoreDataType) => state.showSideProviderName
export const selectVisibleCardIndex = 
    (state: AppStoreDataType) => state.visibleCardIndex
export const selectVisibleEditor = 
    (state: AppStoreDataType) => state.visibleEditor
export const selectVisibleSide = 
    (state: AppStoreDataType) => state.visibleSide
export const selectState = (state: AppStoreDataType) => state

export function addCard(): Action<'editor/newCard'> {
    return {
        type: 'editor/newCard'
    }
}

export function setAppMode(appMode: AppMode): 
PayloadAction<AppMode, 'app/appMode'> {
    return {
        type: 'app/appMode',
        payload: appMode
    }
}

export function setReviewOrder(order: ReviewOrder): 
PayloadAction<ReviewOrder, 'app/reviewOrder'> {
    return {
        type: 'app/reviewOrder',
        payload: order
    }
}

export function setShowSideProviderName(provider: ShowSideProviderName):
PayloadAction<ShowSideProviderName, 'app/showSideProviderName'> {
    return {
        type: 'app/showSideProviderName',
        payload: provider
    }
}

export function setVisibleEditor(editor: Editor):
PayloadAction<Editor, 'app/visibleEditor'> {
    return {
        type: 'app/visibleEditor',
        payload: editor
    }
}

export const appStore = configureStore({
    reducer: rootReducer
})