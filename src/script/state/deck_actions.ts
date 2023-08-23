import { Action, PayloadAction } from "@reduxjs/toolkit"
import { Boxes, CardContentDataType, CardContentType } from "../card/box"
import { Side } from "../card/side"
import { AppStoreDataType, NO_CARD_FOCUSED } from "./Store"
import { Deck, isDeck, makeEmptyDeck } from "../card/deck"
import AppMode from "../app/AppMode"
import { Card, makeEmptyCard } from "../card/card"
import { Editor } from "../app/Editor"
import Dialog from "../app/Dialog"
import CardLayout from "../card/cardlayout"



/**
 * Action type to create a new card after the currently visible card in the 
 * deck.
 */
type CreateNewCardAction = Action<"editor/createNewCard">

/**
 * Payload type used by {@linkcode EditCardAction} objects. Contains the face, 
 * box, and data used to set the new value of the object.
 */
type EditCardPayload<T extends CardContentType> = {
  face: Side,
  box: Boxes
} & CardContentDataType<T>

/**
 * Action type to create edit a card, specifying the side, box, and new content 
 * to assign to the currently visible card.
 */
type EditCardAction = PayloadAction<EditCardPayload<any>, "editor/editCard">

/**
 * Action type to delete a particular card, identified by its index in the deck.
 */
type DeleteCardAction = PayloadAction<number, "editor/deleteCard">

/**
 * Action type to create a new deck and display appropriate confirmation 
 * messages so that the user does not lose data.
 */
type CreateNewDeckAction = Action<"editor/newDeck">

/**
 * Action type to simply delete the currently open deck without saving it.
 */
type DeleteDeckAction = Action<"editor/deleteDeck">

/**
 * Action type to delete the currently open deck and create another one without 
 * checking to see whether a deck is open or whether the data should be saved.
 */
type DeleteDeckAndCreateNewDeckAction = 
  Action<"editor/deleteDeckAndCreateNewDeck">

/**
 * Action type to rename the current deck. The new name is the payload.
 */
type RenameDeckAction = PayloadAction<string, "editor/renameDeck">

/**
 * Action type to change the current editor, specifying the editor to use and 
 * the box that should be edited on the currently visible side of the currently 
 * visible card.
 */
type ChangeEditorAction = 
  PayloadAction<{editor: Editor, box: Boxes}, "editor/changeEditor">

/**
 * Action type to change the layout of the currently visible side of the 
 * currently visible card to another layout.
 */
type ChangeCardLayoutAction = 
  PayloadAction<CardLayout, "editor/changeCardLayout">

/**
 * Action type to view the previous card in the deck.
 */
type ViewPreviousCardAction = Action<"editor/viewPreviousCard">

/**
 * Action type to view the next card in the deck.
 */
type ViewNextCardAction = Action<"editor/viewNextCard">


// Export all previously declared types
export type {
  CreateNewCardAction,
  EditCardPayload,
  EditCardAction,
  DeleteCardAction,
  CreateNewDeckAction,
  DeleteDeckAction,
  DeleteDeckAndCreateNewDeckAction,
  RenameDeckAction,
  ChangeEditorAction,
  ChangeCardLayoutAction,
  ViewPreviousCardAction,
  ViewNextCardAction,
}



/**
 * Returns a {@linkcode CreateNewCardAction} object.
 * @returns new `CreateNewCardAction` object.
 */
function createNewCard(): CreateNewCardAction {
  return {
    type: "editor/createNewCard"
  }
}

/**
 * Returns a {@linkcode EditCardAction} object, given a particular `face`, 
 * `box`, and `data` to use for the action.
 * @param face face of the card to modify.
 * @param box box on the face to modify.
 * @param data new data to add to the card's face.
 * @returns new `EditCardAction` object.
 */
function editCard<T extends CardContentType>(
  face: Side,
  box: Boxes,
  data: CardContentDataType<T>
): EditCardAction {
  return {
    type: "editor/editCard",
    payload: {
      face: face,
      box: box,
      ...data
    }
  }
}

/**
 * Returns a {@linkcode DeleteCardAction} object to delete a card at a specific 
 * `index` in the current deck.
 * @param index index of the card to delete.
 * @returns `DeleteCardAction`.
 */
function deleteCard(index: number): DeleteCardAction {
  return {
    type: "editor/deleteCard",
    payload: index
  }
}

/**
 * Returns a {@linkcode CreateNewDeckAction} object to create a new deck.
 * @returns `CreateNewDeckAction`.
 */
function createNewDeck(): CreateNewDeckAction {
  return {
    type: "editor/newDeck"
  }
}

/**
 * Returns a {@linkcode DeleteDeckAction} object to delete the currently open 
 * deck, if there is one.
 * @returns `DeleteDeckAction`.
 */
function deleteDeck(): DeleteDeckAction {
  return {
    type: "editor/deleteDeck"
  }
}

/**
 * Returns a {@linkcode DeleteDeckAndCreateNewDeckAction} object to delete the 
 * currently open deck, if there is one, without asking the user whether the 
 * data should be saved.
 * @returns `DeleteDeckAndCreateNewDeckAction`.
 */
function deleteDeckAndCreateNewDeck(): DeleteDeckAndCreateNewDeckAction {
  return {
    type: "editor/deleteDeckAndCreateNewDeck"
  }
}

/**
 * Returns a {@linkcode RenameDeckAction} object to rename the current deck, 
 * given a new `name` for it.
 * @param name new name for the deck.
 * @returns `RenameDeckAction`.
 */
function renameDeck(name: string): RenameDeckAction {
  return {
    type: "editor/renameDeck",
    payload: name
  }
}

/**
 * Returns a {@linkcode ChangeEditorAction} object to change the current editor,
 * given an `editor` to change to and a `box` to edit.
 * @param editor {@linkcode Editor} to switch to.
 * @param box {@linkcode Boxes box} to edit.
 * @returns `ChangeEditorAction`.
 */
function changeEditor(editor: Editor, box: Boxes): ChangeEditorAction {
  return {
    type: "editor/changeEditor",
    payload: {
      editor: editor,
      box: box
    }
  }
}

/**
 * Returns a {@linkcode ChangeCardLayoutAction} object to change the card 
 * layout of the currently visible side of the currently visible card.
 * @param layout layout to switch to.
 * @returns `ChangeCardLayoutAction`.
 */
function changeCardLayout(layout: CardLayout): ChangeCardLayoutAction {
  return {
    type: "editor/changeCardLayout",
    payload: layout
  }
}

/**
 * Returns a {@linkcode ViewPreviousCardAction} object to view the previous 
 * card in the deck, if there is one.
 * @returns `ViewPreviousCardAction`.
 */
function viewPreviousCard(): ViewPreviousCardAction {
  return {
    type: "editor/viewPreviousCard"
  }
}

/**
 * Returns a {@linkcode ViewNextCardAction} object to view the next card in the 
 * deck, if there is one.
 * @returns `ViewNextCardAction`.
 */
function viewNextCard(): ViewNextCardAction {
  return {
    type: "editor/viewNextCard"
  }
}



// Export previously declared actions
export {
  createNewCard,
  editCard,
  deleteCard,
  createNewDeck,
  deleteDeck,
  deleteDeckAndCreateNewDeck,
  renameDeck,
  changeEditor,
  changeCardLayout,
  viewPreviousCard,
  viewNextCard,
}



/**
 * Reducer function to create a new card.
 * @param state existing state.
 * @param action {@linkcode CreateNewCardAction} to use to change the state.
 * @returns new state.
 */
function createNewCardReducer(
  state: AppStoreDataType,
  _: CreateNewCardAction
): AppStoreDataType {
  // If no deck is loaded yet, create a new empty deck
  if (!isDeck(state.deck)) {
    // Create an empty deck, set the app mode to EDITING_DECK, set the only 
    // card in the deck to be visible.
    return {
      ...state,
      deck: makeEmptyDeck(),
      appMode: AppMode.EDITING_DECK,
      visibleCardIndex: 0
    }
  } else {

    // Create a deck containing all existing cards, and insert a new blank card 
    // after the currently visible card. Set the new card as the currently 
    // visible card.
    return {
      ...state,
      deck: {
        name: state.deck.name,
        cards: [
          ...state.deck.cards.slice(0, state.visibleCardIndex + 1),
          makeEmptyCard(),
          ...state.deck.cards.slice(state.visibleCardIndex + 1)
        ]
      },
      boxBeingEdited: null,
      visibleEditor: Editor.NONE,
      visibleCardIndex: state.visibleCardIndex + 1
    }
  }
}

/**
 * Reducer function to edit a card in the deck.
 * @param state existing state.
 * @param action {@linkcode EditCardAction} to use to change the state.
 * @returns new state.
 */
function editCardReducer(
  state: AppStoreDataType,
  action: EditCardAction
): AppStoreDataType {
  
  // Copy old set of cards if they exist, and create an empty set of cards 
  // if not. (This scenario shouldn't be encountered, but it is the fallback 
  // behavior if the situation does occur.)
  const newSetOfCards: Card[] = state.deck ? structuredClone(state.deck.cards)
    : []
  
  // If there are any cards in the new set:
  if (newSetOfCards.length > 0) {
    // Get the current face of the card which is being edited.
    const faceBeingEdited = 
      newSetOfCards[state.visibleCardIndex][action.payload.face]
    
    switch (state.visibleEditor) {
      case Editor.TEXT:
        {
          faceBeingEdited[action.payload.box] = {
            type: CardContentType.TEXT,
            data: {
              text: (
                action.payload as EditCardPayload<CardContentType.TEXT>
              ).text
            }
          }
        }
        break
    }
  }

  // 
  return {
    ...state,
    deck: {
      name: state.deck ? state.deck.name : "Untitled",
      cards: newSetOfCards
    },
    boxBeingEdited: null,
    visibleEditor: Editor.NONE
  }

}

/**
 * Reducer to delete a card in the deck.
 * @param state existing state.
 * @param action {@linkcode DeleteCardAction} to use to change the state.
 * @returns new state. 
 */
function deleteCardReducer(
  state: AppStoreDataType,
  action: DeleteCardAction
): AppStoreDataType {
  // If the deck only contains one card, create a new deck with only one empty 
  // card in it. Set the app mode to EDITING_DECK.
  if (state.deck !== null && action.payload >= 0 && 
    action.payload === 0 && state.deck.cards.length === 1)
  {
    return {
      ...state,
      deck: {
        name: state.deck.name,
        cards: [makeEmptyCard()]
      },
      visibleCardIndex: 0,
      appMode: AppMode.EDITING_DECK
    }
  }
  // If there is more than one card in the deck, and the card to be deleted is 
  // in the deck (which should always be the case), 
  else if (state.deck !== null && action.payload >= 0 && 
    action.payload < state.deck.cards.length)
  {
    // Copy the references to the cards, splice out the card to be deleted
    const cards = [...state.deck.cards]
    cards.splice(action.payload, 1)

    // Create a new deck which lacks the card to be deleted.
    const newDeck: Deck = {
      name: state.deck.name,
      cards: cards
    }

    let newCardIndex: number
    // If the currently visible card should be deleted...
    if (action.payload === state.visibleCardIndex) {

      // If the currently visible card is the first one in the deck, set the 
      // visible card to the last card in the deck (which is guaranteed to 
      // exist, as the deck will always have at least two cards at this point).
      if (state.visibleCardIndex === 0) {
        newCardIndex = newDeck.cards.length - 1
      } 
      // If the currently visible card is not the first one in the deck, then 
      // set the currently visible card to the previous one in the deck.
      else {
        newCardIndex = state.visibleCardIndex - 1
      }
    }
    // If the card to be deleted is greater than or equal to the length of the 
    // new array of cards (which means that the last card was deleted), then 
    // set the new last card to be visible.
    else if (action.payload >= newDeck.cards.length) {
      newCardIndex = newDeck.cards.length - 1
    }
    // Otherwise, the currently visible card does not need to be changed.
    else {
      newCardIndex = state.visibleCardIndex
    }

    // Update the data with the previously prepared data, and set the app mode 
    // to EDITING_DECK.
    return {
      ...state,
      deck: newDeck,
      visibleCardIndex: newCardIndex,
      appMode: AppMode.EDITING_DECK
    }
  }
  // In any other situation, there are no cards in the deck to be deleted. 
  // This situation should never be encountered, but in the event that it does,
  // the state is returned as is.
  else {
    return state
  }
}

/**
 * Reducer to create a new deck.
 * @param state existing state.
 * @param _ {@linkcode CreateNewDeckAction} object, which is currently not used.
 * @returns new state.
 */
function createNewDeckReducer(
  state: AppStoreDataType,
  _: CreateNewDeckAction
): AppStoreDataType {

  // If a deck is already open, display the NEW_DECK_CONFIRMATION_MESSAGE 
  // to make sure that the user doesn't lose data. Switch the app mode to 
  // EDITING_DATA.
  if (state.deck !== null) {
    return {
      ...state,
      visibleDialog: Dialog.NEW_DECK_CONFIRMATION_MESSAGE,
      appMode: AppMode.EDITING_DECK
    }
  }
  // Otherwise, create a new empty deck and switch to EDITING_DECK mode, and 
  // set the only card in the new deck to be visible.
  else {
    return {
      ...state,
      deck: makeEmptyDeck(),
      visibleCardIndex: 0,
      appMode: AppMode.EDITING_DECK
    }
  }
}

/**
 * Reducer to delete the existing deck without confirming whether or not to 
 * save the data.
 * @param state existing state.
 * @param _ {@linkcode DeleteDeckAction} object, which is currently unused.
 * @returns new state.
 */
function deleteDeckReducer(
  state: AppStoreDataType,
  _: DeleteDeckAction
): AppStoreDataType {
  return {
    ...state,
    deck: null,
    visibleDialog: Dialog.NONE,
    visibleCardIndex: NO_CARD_FOCUSED
  }
}

/**
 * Reducer to delete the existing deck and create a new one without confirming 
 * whether or not to save the data.
 * @param state existing state.
 * @param _ {@linkcode DeleteDeckAndCreateNewDeckAction} object, which is 
 * currently unused.
 * @returns new state.
 */
function deleteDeckAndCreateNewDeckReducer(
  state: AppStoreDataType,
  _: DeleteDeckAndCreateNewDeckAction
): AppStoreDataType {
  return {
    ...state,
    deck: makeEmptyDeck(),
    visibleDialog: Dialog.NONE,
    appMode: AppMode.EDITING_DECK
  }
}

/**
 * Reducer to rename the current deck.
 * @param state existing state.
 * @param action {@linkcode RenameDeckAction} object to use to change the state.
 * @returns new state.
 */
function renameDeckReducer(
  state: AppStoreDataType,
  action: RenameDeckAction
): AppStoreDataType {
  const deck: Deck = {
    name: action.payload,
    // If the deck is null, which should not ever occur, create a set of 
    // one empty card to use.
    cards: (state.deck !== null) ? state.deck.cards : [makeEmptyCard()]
  }

  // Hide all editors, as the deck name editor was probably open before this 
  // reducer runs.
  return {
    ...state,
    deck: deck,
    visibleEditor: Editor.NONE
  }
}

/**
 * Reducer to change the current editor.
 * @param state existing state.
 * @param action {@linkcode ChangeEditorAction} object to use to change the 
 * state.
 * @returns new state.
 */
function changeEditorReducer(
  state: AppStoreDataType,
  action: ChangeEditorAction
): AppStoreDataType {
  return {
    ...state,
    boxBeingEdited: action.payload.box,
    visibleEditor: action.payload.editor
  }
}

/**
 * Reducer to change the card layout of the currently visible side of the 
 * currently visible card.
 * @param state existing state.
 * @param action {@linkcode ChangeCardLayoutAction} object to use to change the 
 * state.
 * @returns new state.
 */
function changeCardLayoutReducer(
  state: AppStoreDataType,
  action: ChangeCardLayoutAction
): AppStoreDataType {
  const cards = (state.deck !== null) && [...state.deck.cards]

    if (cards && cards.length > 0) {
      // If there are any cards in the deck, clone the card to be edited so 
      // that we are not editing an object which is in the Redux store. In that 
      // case, Redux will complain in the browser console.
      cards[state.visibleCardIndex][state.visibleSide].layout = 
        action.payload
    }

    return {
      ...state,
      deck: state.deck && cards ? {
        name: state.deck.name,
        cards: cards
      } : null
    }
}

/**
 * Reducer to view the previous card in the deck.
 * @param state existing state.
 * @param action {@linkcode ViewPreviousCardAction} object to use to change the 
 * state.
 * @returns new state.
 */
function viewPreviousCardReducer(
  state: AppStoreDataType,
  action: ViewPreviousCardAction
): AppStoreDataType {
  // If there are multiple cards in the deck, and the currently visible card 
  // isn't the first card, then subtract one from the current index to get the 
  // new visible card index.
  if (state.deck && state.deck.cards.length > 1 && 
    state.visibleCardIndex > 0) 
  {
    return {
      ...state,
      visibleCardIndex: state.visibleCardIndex - 1
    }
  }
  // If there are multiple cards in the deck, and the currently visible card 
  // is the first card, then set the new visible card index to the index of the 
  // last card in the deck.
  else if (state.deck && state.deck.cards.length > 1 &&
    state.visibleCardIndex === 0)
  {
    return {
      ...state,
      visibleCardIndex: state.deck.cards.length - 1
    }
  }
  // Otherwise, there is only one card in the deck, and the visible card index 
  // does not need to change.
  else {
    return state
  }
}

function viewNextCardReducer(
  state: AppStoreDataType,
  action: ViewNextCardAction
): AppStoreDataType {
  // If there are multiple cards in the deck, and the currently visible card 
  // isn't the last card, then add one to the current index to get the new 
  // visible card index.
  if (state.deck && state.deck.cards.length > 1 &&
    state.visibleCardIndex < state.deck.cards.length - 1)
  {
    return {
      ...state,
      visibleCardIndex: state.visibleCardIndex + 1
    }
  }
  // If there are multiple cards in the deck, and the currently visible card
  // is the last card, then set the new visible card index to the index of the 
  // first card in the deck.
  else if (state.deck && state.deck.cards.length > 1 && 
    state.visibleCardIndex === state.deck.cards.length - 1)
  {
    return {
      ...state,
      visibleCardIndex: 0
    }
  }
  // Otherwise, there is only one card in the deck, and the visible card index 
  // does not need to change.
  else {
    return state
  }
}

// Export previously declared reducers
export {
  createNewCardReducer,
  editCardReducer,
  deleteCardReducer,
  createNewDeckReducer,
  deleteDeckReducer,
  deleteDeckAndCreateNewDeckReducer,
  renameDeckReducer,
  changeEditorReducer,
  changeCardLayoutReducer,
  viewPreviousCardReducer,
  viewNextCardReducer,
}