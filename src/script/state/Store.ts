import { Action, configureStore } from "@reduxjs/toolkit";
import { Deck } from "../card/deck";
import { Side } from "../card/side";
import { EMPTY_CARD } from "../card/card";
import AppMode from "../app/AppMode";
import { DeckHistory } from "../card/DeckHistory";
import { ShowSideProviderName } from "../ShowSideProvider";
import { ReviewOrder } from "../ReviewOrder";
import { Editor } from "../app/Editor";
import { Boxes } from "../card/box";
import Dialog from "../app/Dialog";
import {
  SetAppModeAction,
  SetBoxBeingEditedAction,
  SetDeckAction,
  SetDeckHistoryAction,
  SetReviewOrderAction,
  SetShowSideProviderNameAction,
  SetVisibleCardIndexAction,
  SetVisibleDialogAction,
  SetVisibleEditorAction,
  SetVisibleSideAction,
  setAppModeReducer,
  setBoxBeingEditedReducer,
  setDeckHistoryReducer,
  setDeckReducer,
  setReviewOrderReducer,
  setShowSideProviderNameReducer,
  setVisibleCardIndexReducer,
  setVisibleDialogReducer,
  setVisibleEditorReducer,
  setVisibleSideReducer
} from "./setters";
import {
  ChangeCardLayoutAction,
  ChangeEditorAction,
  CreateNewCardAction,
  CreateNewDeckAction,
  DeleteCardAction,
  DeleteDeckAction,
  DeleteDeckAndCreateNewDeckAction,
  EditCardAction,
  RenameDeckAction,
  ViewNextCardAction,
  ViewPreviousCardAction,
  changeCardLayoutReducer,
  changeEditorReducer,
  createNewCardReducer,
  createNewDeckReducer,
  deleteCardReducer,
  deleteDeckAndCreateNewDeckReducer,
  deleteDeckReducer,
  editCardReducer,
  renameDeckReducer,
  viewNextCardReducer,
  viewPreviousCardReducer
} from "./deck_actions";


/**
 * Type of data that will be stored in the data store for this app.
 */
export type AppStoreDataType = {
  appMode: AppMode,
  boxBeingEdited: Boxes | null,
  deck: Deck | null,
  deckHistory: DeckHistory,
  reviewOrder: ReviewOrder,
  showSideProviderName: ShowSideProviderName,
  visibleDialog: Dialog,
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
  boxBeingEdited: null,
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
  visibleDialog: Dialog.NONE,
  visibleEditor: Editor.NONE,
  visibleCardIndex: NO_CARD_FOCUSED,
  visibleSide: Side.FRONT,
}

type EditorActions =
  CreateNewCardAction |
  EditCardAction |
  DeleteCardAction |
  CreateNewDeckAction |
  DeleteDeckAction |
  DeleteDeckAndCreateNewDeckAction |
  SetDeckAction |
  SetDeckHistoryAction |
  RenameDeckAction |
  SetBoxBeingEditedAction |
  SetVisibleDialogAction |
  ChangeEditorAction |
  ChangeCardLayoutAction |
  ViewPreviousCardAction |
  ViewNextCardAction |
  SetVisibleCardIndexAction |
  SetVisibleSideAction

type AppActions =
  SetAppModeAction |
  SetReviewOrderAction |
  SetShowSideProviderNameAction |
  SetVisibleEditorAction


function appReducer(state = INITIAL_STATE, action: AppActions):
  AppStoreDataType {
  switch (action.type) {
    case 'app/setAppMode':
      return setAppModeReducer(state, action)

    case 'app/setReviewOrder':
      return setReviewOrderReducer(state, action)

    case 'app/setShowSideProviderAction':
      return setShowSideProviderNameReducer(state, action)

    case 'app/setVisibleEditor':
      return setVisibleEditorReducer(state, action)

    default:
      return state
  }
}

function editorReducer(state = INITIAL_STATE, action: EditorActions):
  AppStoreDataType {
  switch (action.type) {
    case 'editor/createNewCard':
      return createNewCardReducer(state, action)

    case 'editor/editCard':
      return editCardReducer(state, action)

    case 'editor/deleteCard':
      return deleteCardReducer(state, action)

    case 'editor/setDeck':
      return setDeckReducer(state, action)

    case 'editor/setDeckHistory':
      return setDeckHistoryReducer(state, action)

    case 'editor/newDeck':
      return createNewDeckReducer(state, action)

    case 'editor/deleteDeck':
      return deleteDeckReducer(state, action)

    case 'editor/deleteDeckAndCreateNewDeck':
      return deleteDeckAndCreateNewDeckReducer(state, action)

    case 'editor/renameDeck':
      return renameDeckReducer(state, action)

    case 'editor/setBoxBeingEdited':
      return setBoxBeingEditedReducer(state, action)

    case 'editor/setVisibleDialog':
      return setVisibleDialogReducer(state, action)

    case 'editor/changeEditor':
      return changeEditorReducer(state, action)

    case 'editor/changeCardLayout':
      return changeCardLayoutReducer(state, action)

    case 'editor/viewPreviousCard':
      return viewPreviousCardReducer(state, action)

    case 'editor/viewNextCard':
      return viewNextCardReducer(state, action)

    case 'editor/setVisibleCardIndex':
      return setVisibleCardIndexReducer(state, action)


    case 'editor/setVisibleSide':
      return setVisibleSideReducer(state, action)

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
export const selectBoxBeingEdited =
  (state: AppStoreDataType) => state.boxBeingEdited
export const selectDeck = (state: AppStoreDataType) => state.deck
export const selectDeckHistory = (state: AppStoreDataType) => state.deckHistory
export const selectReviewOrder = (state: AppStoreDataType) => state.reviewOrder
export const selectShowSideProviderName =
  (state: AppStoreDataType) => state.showSideProviderName
export const selectVisibleCardIndex =
  (state: AppStoreDataType) => state.visibleCardIndex
export const selectVisibleDialog =
  (state: AppStoreDataType) => state.visibleDialog
export const selectVisibleEditor =
  (state: AppStoreDataType) => state.visibleEditor
export const selectVisibleSide =
  (state: AppStoreDataType) => state.visibleSide
export const selectState = (state: AppStoreDataType) => state

export function deleteDeckAndCreateNewDeck():
  Action<'editor/deleteDeckAndCreateNewDeck'> {
  return {
    type: 'editor/deleteDeckAndCreateNewDeck'
  }
}

export const appStore = configureStore({
  reducer: rootReducer
})