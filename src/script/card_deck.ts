// import { Action, PayloadAction, configureStore } from "@reduxjs/toolkit";
// import { Deck } from "./card/deck";
// import { EMPTY_CARD } from "./card/card";
// import { TextEditorPayloadAction } from "./TextEditor";
// import { Boxes, Side } from "./card/side";
// import { useDispatch, useSelector } from "react-redux";

// type DeckHistory = {
//     currentVersion: number,
//     lastSavedVersion: number,
//     versions: Deck[]
// }

// const initialState: DeckHistory | null = null
// export function deckReducer(state = initialState, action: 
//     Action<'deck/newDeck'> | 
//     PayloadAction<FileList, 'deck/openDeckFile'> |
//     Action<'deck/newCard'> |
//     TextEditorPayloadAction
    
//     ) {

//     if (action.type === 'deck/newDeck') {
    
//         // If a deck was loaded, check if there have been any edits (the current version is not equal to the 
//         // lastSavedVersion). This means that a confirmation prompt needs to be displayed.
//         if (state && state.currentVersion !== state.lastSavedVersion) {
//             // TODO
//         }

//         // If no deck is loaded, or if a deck was loaded, and there were no edits, create an empty 
//         // DeckHistory with no cards and the current version being -1 (as there 
//         // are no cards to reference)
//         return {
//             currentVersion: -1,
//             lastSavedVersion: -1,
//             versions: []
//         }
        
//     }

//     else if (action.type === 'deck/openDeckFile') {
//         console.log(action.payload)
//     }

//     else if (action.type === 'deck/newCard') {
//         // If no deck is loaded, create a new deck with a blank card.
//         if (!state) {
//             return {
//                 currentVersion: 0,
//                 lastSavedVersion: -1,
//                 versions: [{
//                     name: 'Untitled',
//                     cards: [structuredClone(EMPTY_CARD)]
//                 }]
//             }
//         }

//         return {
//             currentVersion: state.currentVersion + 1,
//             lastSavedVersion: state.lastSavedVersion,
//             versions: [...state.versions, {
//                 name: state.versions[state.currentVersion].name,
//                 cards: [...state.versions[state.currentVersion].cards, structuredClone(EMPTY_CARD)]
//             }]
//         }
//     }

//     else if (action.type === 'deck/editCard') {
        
//         if (!state) {
//             throw new Error("Illegal state")
//         }

//         // const editingState = useSelector(selectEditingState)
//         // const dispatch = useDispatch()

//         // const editingState: EditingState = appStore.getState().edit

        

//         const currentCards = state.versions[state.currentVersion].cards
//         const cardBeingEdited = state.versions[state.currentVersion].cards.at(state.currentVersion)
//         if (cardBeingEdited === undefined) {
//             throw new Error("Illegal state")
//         }
//         let newCard: Card = {
//             frontFace: (action.payload.face === Side.BACK) ? cardBeingEdited.frontFace : 
//                 {
//                     layout: cardBeingEdited.frontFace.layout,
//                     box1: (action.payload.box === Boxes.BOX_1) ? { type: CardContentType.TEXT, content: { text: action.payload.text } } : cardBeingEdited.frontFace.box1,
//                     box2: (action.payload.box === Boxes.BOX_2) ? { type: CardContentType.TEXT, content: { text: action.payload.text } } : cardBeingEdited.frontFace.box2,
//                     box3: (action.payload.box === Boxes.BOX_3) ? { type: CardContentType.TEXT, content: { text: action.payload.text } } : cardBeingEdited.frontFace.box3,
//                     box4: (action.payload.box === Boxes.BOX_4) ? { type: CardContentType.TEXT, content: { text: action.payload.text } } : cardBeingEdited.frontFace.box4
//                 },
//             backFace: (action.payload.face === Side.BACK) ? cardBeingEdited.backFace : 
//                 {
//                     layout: cardBeingEdited.backFace.layout,
//                     box1: (action.payload.box === Boxes.BOX_1) ? { type: CardContentType.TEXT, content: { text: action.payload.text } } : cardBeingEdited.backFace.box1,
//                     box2: (action.payload.box === Boxes.BOX_2) ? { type: CardContentType.TEXT, content: { text: action.payload.text } } : cardBeingEdited.backFace.box2,
//                     box3: (action.payload.box === Boxes.BOX_3) ? { type: CardContentType.TEXT, content: { text: action.payload.text } } : cardBeingEdited.backFace.box3,
//                     box4: (action.payload.box === Boxes.BOX_4) ? { type: CardContentType.TEXT, content: { text: action.payload.text } } : cardBeingEdited.backFace.box4
//                 }
//         } 

//         // appStore.dispatch(setEditingState(newCard, action.payload.face, action.payload.box))

//         return {
//             currentVersion: state.currentVersion + 1,
//             lastSavedVersion: state.lastSavedVersion,
//             versions: [...state.versions, {
//                 name: state.versions[state.currentVersion].name,
//                 cards: [
//                     ...currentCards.slice(0, state.currentVersion),
//                     newCard,
//                     ...currentCards.slice(state.currentVersion + 1)
//                 ]
//             }]
//         }
//     }

    

//     return state

// }

// export function newDeck(): Action {
//     return {
//         type: 'deck/newDeck'
//     }
// }

// export function openDeckFile(files: FileList): PayloadAction<FileList> {
//     return {
//         type: 'deck/openDeckFile',
//         payload: files
//     }
// }

// export function newCard(): Action {
//     return {
//         type: 'deck/newCard'
//     }
// }

// export function editCard(face: Side, box: Boxes, text: string): TextEditorPayloadAction {
//     return {
//         type: 'deck/editCard',
//         payload: {
//             face: face,
//             box: box,
//             text: text
//         }

//     }
// }

// // export const deckStore = configureStore({reducer: deckReducer})

// export const selectDeck = (state: DeckHistory | null) => state