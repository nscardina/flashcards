import { PayloadAction } from "@reduxjs/toolkit"
import AppMode from "../app/AppMode"
import { Boxes } from "../card/box"
import { Deck } from "../card/deck"
import { DeckHistory } from "../card/DeckHistory"
import { ReviewOrder } from "../ReviewOrder"
import { ShowSideProviderName } from "../ShowSideProvider"
import Dialog from "../app/Dialog"
import { Side } from "../card/side"
import { AppStoreDataType } from "./Store"
import { Editor } from "../app/Editor"

/**
 * Action type to set the {@linkcode AppMode} of this app to a 
 * new value. The new value is the `payload` of this action.
 */
type SetAppModeAction = PayloadAction<AppMode, 'app/setAppMode'>

/**
 * Action type to set the {@linkcode Box box} being edited to a new value. The 
 * new value is the `payload` of this action.
 */
type SetBoxBeingEditedAction =
  PayloadAction<Boxes, 'editor/setBoxBeingEdited'>

/**
 * Action type to set the {@linkcode Deck} to a new value. The new deck is
 * the `payload` of this action.
 */
type SetDeckAction = PayloadAction<Deck, 'editor/setDeck'>

/**
 * Action type to set the {@linkcode DeckHistory} of this app to a 
 * new value. The new value is the `payload` of this action.
 */
type SetDeckHistoryAction =
  PayloadAction<DeckHistory, 'editor/setDeckHistory'>

/**
 * Action type to set the {@linkcode ReviewOrder} of this app to a 
 * new value. The new value is the `payload` of this action.
 */
type SetReviewOrderAction =
  PayloadAction<ReviewOrder, 'app/setReviewOrder'>

/**
 * Action type to set the name of the 
 * {@linkplain ShowSideProviderName `ShowSideProvider`} of this app 
 * to a new value. The new value is the `payload` of this action.
 */
type SetShowSideProviderNameAction =
  PayloadAction<ShowSideProviderName, 'app/setShowSideProviderAction'>

/**
 * Action type to set the currently visible {@linkCode Dialog} to a new 
 * value. The new value is the `payload` of this action.
 */
type SetVisibleDialogAction =
  PayloadAction<Dialog, 'editor/setVisibleDialog'>

/**
 * Action type to set the currently visible {@linkcode Editor} to a new value. 
 * The new value is the `payload` of this action.
 */
type SetVisibleEditorAction =
  PayloadAction<Editor, 'app/setVisibleEditor'>

/**
 * Action type to set the currently visible card index to a new value. The new 
 * value is the `payload` of this action.
 */
type SetVisibleCardIndexAction =
  PayloadAction<number, 'editor/setVisibleCardIndex'>

/**
 * Action type to set the currently visible {@linkcode Side} of the flashcards 
 * to a new value. The new value is the `payload` of this action.
 */
type SetVisibleSideAction = PayloadAction<Side, 'editor/setVisibleSide'>


// Export all the previously declared types
export type {
  SetAppModeAction,
  SetBoxBeingEditedAction,
  SetDeckAction,
  SetDeckHistoryAction,
  SetReviewOrderAction,
  SetShowSideProviderNameAction,
  SetVisibleDialogAction,
  SetVisibleEditorAction,
  SetVisibleCardIndexAction,
  SetVisibleSideAction
}




/**
 * Returns a {@linkcode SetAppModeAction} for a particular {@linkcode AppMode}.
 * @param appMode new `AppMode`.
 * @returns action to be passed to Redux `dispatch`.
 */
function setAppMode(appMode: AppMode): SetAppModeAction {
  return {
    type: "app/setAppMode",
    payload: appMode
  }
}

/**
 * Returns a {@linkcode SetBoxBeingEditedAction} for a particular 
 * {@linkcode Boxes} object.
 * @param box new `Boxes` object.
 * @returns action to be passed to Redux `dispatch`.
 */
function setBoxBeingEdited(box: Boxes): SetBoxBeingEditedAction {
  return {
    type: "editor/setBoxBeingEdited",
    payload: box
  }
}

/**
 * Returns a {@linkcode SetDeckAction} for a particular {@linkcode Deck} object.
 * @param deck new `Deck` object.
 * @returns action to be passed to Redux `dispatch`.
 */
function setDeck(deck: Deck): SetDeckAction {
  return {
    type: "editor/setDeck",
    payload: deck
  }
}

/**
 * Returns a {@linkcode SetDeckHistoryAction} for a particular 
 * {@linkcode DeckHistory} object.
 * @param deckHistory new `DeckHistory` object.
 * @returns action to be passed to Redux `dispatch`.
 */
function setDeckHistory(deckHistory: DeckHistory): SetDeckHistoryAction {
  return {
    type: "editor/setDeckHistory",
    payload: deckHistory
  }
}

/**
 * Returns a {@linkcode SetReviewOrderAction} for a particular 
 * {@linkcode ReviewOrder} object.
 * @param order new `ReviewOrder` object.
 * @returns action to be passed to Redux `dispatch`.
 */
function setReviewOrder(order: ReviewOrder): SetReviewOrderAction {
  return {
    type: "app/setReviewOrder",
    payload: order
  }
}

/**
 * Returns a {@linkcode SetShowSideProviderNameAction} for a particular 
 * {@linkcode ShowSideProviderName}.
 * @param providerName new `ShowSideProviderName`.
 * @returns action to be passed to Redux `dispatch`.
 */
function setShowSideProviderName(providerName: ShowSideProviderName):
  SetShowSideProviderNameAction {
  return {
    type: "app/setShowSideProviderAction",
    payload: providerName
  }
}

/**
 * Returns a {@linkcode SetVisibleDialogAction} for a particular 
 * {@linkcode Dialog}.
 * @param dialog new `Dialog`.
 * @returns action to be passed to Redux `dispatch`.
 */
function setVisibleDialog(dialog: Dialog): SetVisibleDialogAction {
  return {
    type: "editor/setVisibleDialog",
    payload: dialog
  }
}

/**
 * Returns a {@linkcode SetVisibleEditorAction} for a particular 
 * {@linkcode Editor}.
 * @param editor new `Editor`.
 * @returns action to be passed to Redux `dispatch`.
 */
function setVisibleEditor(editor: Editor): SetVisibleEditorAction {
  return {
    type: "app/setVisibleEditor",
    payload: editor
  }
}

/**
 * Returns a {@linkcode SetVisibleCardIndexAction} for a particular card index.
 * @param cardIndex new card index.
 * @returns action to be passed to Redux `dispatch`.
 */
function setVisibleCardIndex(cardIndex: number): SetVisibleCardIndexAction {
  return {
    type: "editor/setVisibleCardIndex",
    payload: cardIndex
  }
}

/**
 * Returns a {@linkcode SetVisibleSideAction} for a particular {@linkcode Side}.
 * @param side new `Side` object.
 * @returns action to be passed to Redux `dispatch`.
 */
function setVisibleSide(side: Side): SetVisibleSideAction {
  return {
    type: "editor/setVisibleSide",
    payload: side
  }
}

// Export all the previously declared functions
export {
  setAppMode,
  setBoxBeingEdited,
  setDeck,
  setDeckHistory,
  setReviewOrder,
  setShowSideProviderName,
  setVisibleDialog,
  setVisibleEditor,
  setVisibleCardIndex,
  setVisibleSide
}




/**
 * Reducer function to set the `appMode` field of the Redux store.
 * @param state existing state.
 * @param action {@linkcode SetAppModeAction} to use to change the state.
 * @returns new state.
 */
function setAppModeReducer(
  state: AppStoreDataType,
  action: SetAppModeAction
): AppStoreDataType {
  return {
    ...state,
    appMode: action.payload
  }
}

/**
 * Reducer function to set the `boxBeingEdited` field of the Redux store.
 * @param state existing state.
 * @param action {@linkcode SetBoxBeingEditedAction} to use to change the state.
 * @returns new state.
 */
function setBoxBeingEditedReducer(
  state: AppStoreDataType, 
  action: SetBoxBeingEditedAction
): AppStoreDataType {
  return {
    ...state,
    boxBeingEdited: action.payload
  }
}

/**
 * Reducer function to set the `deck` field of the Redux store.
 * @param state existing state.
 * @param action {@linkcode SetDeckAction} to use to change the state.
 * @returns new state.
 */
function setDeckReducer(
  state: AppStoreDataType,
  action: SetDeckAction
): AppStoreDataType {
  return {
    ...state,
    deck: action.payload,
    visibleCardIndex: (action.payload.cards.length > 0) ? 0 : -1
  }
}

/**
 * Reducer function to set the `deckHistory` field of the Redux store.
 * @param state existing state.
 * @param action {@linkcode SetDeckHistoryAction} to use to change the state.
 * @returns new state.
 */
function setDeckHistoryReducer(
  state: AppStoreDataType,
  action: SetDeckHistoryAction
): AppStoreDataType {
  return {
    ...state,
    deckHistory: action.payload
  }
}

/**
 * Reducer function to set the `reviewOrder` field of the Redux store.
 * @param state existing state.
 * @param action {@linkcode SetReviewOrderAction} to use to change the state.
 * @returns new state.
 */
function setReviewOrderReducer(
  state: AppStoreDataType,
  action: SetReviewOrderAction
): AppStoreDataType {
  return {
    ...state,
    reviewOrder: action.payload
  }
}

/**
 * Reducer function to set the `showSideProviderName` field of the Redux store.
 * @param state existing state.
 * @param action {@linkcode SetShowSideProviderNameAction} to use to change the 
 * state.
 * @returns new state.
 */
function setShowSideProviderNameReducer(
  state: AppStoreDataType,
  action: SetShowSideProviderNameAction
): AppStoreDataType {
  return {
    ...state,
    showSideProviderName: action.payload
  }
}

/**
 * Reducer function to set the `visibleCardIndex` field of the Redux store.
 * @param state existing state.
 * @param action {@linkcode SetVisibleCardIndexAction} to use to change the 
 * state. 
 * @returns new state.
 */
function setVisibleCardIndexReducer(
  state: AppStoreDataType,
  action: SetVisibleCardIndexAction
): AppStoreDataType {
  return {
    ...state,
    visibleCardIndex: action.payload
  }
}

/**
 * Reducer function to set the `visibleDialog` field of the Redux store.
 * @param state existing state.
 * @param action {@linkcode SetVisibleDialogAction} to use to change the state.
 * @returns new state.
 */
function setVisibleDialogReducer(
  state: AppStoreDataType,
  action: SetVisibleDialogAction
): AppStoreDataType {
  return {
    ...state,
    visibleDialog: action.payload
  }
}

/**
 * Reducer function to set the `visibleEditor` field of the Redux store.
 * @param state existing state.
 * @param action {@linkcode SetVisibleEditorAction} to use to change the state.
 * @returns new state.
 */
function setVisibleEditorReducer(
  state: AppStoreDataType,
  action: SetVisibleEditorAction
): AppStoreDataType {
  return {
    ...state,
    visibleEditor: action.payload
  }
}

/**
 * Reducer function to set the `visibleSide` field of the Redux store.
 * @param state existing state.
 * @param action {@linkcode SetVisibleSideAction} to use to change the state.
 * @returns new state.
 */
function setVisibleSideReducer(
  state: AppStoreDataType,
  action: SetVisibleSideAction
): AppStoreDataType {
  return {
    ...state,
    visibleSide: action.payload
  }
}

// Export the previously declared reducer functions
export {
  setAppModeReducer,
  setBoxBeingEditedReducer,
  setDeckReducer,
  setDeckHistoryReducer,
  setReviewOrderReducer,
  setShowSideProviderNameReducer,
  setVisibleCardIndexReducer,
  setVisibleDialogReducer,
  setVisibleEditorReducer,
  setVisibleSideReducer
}