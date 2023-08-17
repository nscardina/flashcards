import { Action, PayloadAction, configureStore } from "@reduxjs/toolkit";
import { Deck } from "../card/deck";
import { Side } from "../card/side";
import { Card, EMPTY_CARD } from "../card/card";
import AppMode from "../app/AppMode";
import { DeckHistory } from "../card/DeckHistory";
import { ShowSideProviderName } from "../ShowSideProvider";
import { ReviewOrder } from "../ReviewOrder";
import { Editor } from "../app/Editor";
import { Boxes, CardContentDataType, CardContentType } from "../card/box";
import CardLayout from "../card/cardlayout";
import Dialog from "../app/Dialog";


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
  Action<'editor/newCard'> |
  PayloadAction<EditCardPayload<any>, 'editor/editCard'> |
  PayloadAction<number, 'editor/deleteCard'> |
  Action<'editor/newDeck'> |
  Action<'editor/deleteDeck'> |
  PayloadAction<Deck, 'editor/setDeck'> |
  Action<'editor/deleteDeckAndCreateNewDeck'> |
  PayloadAction<string, 'editor/renameDeck'> |
  PayloadAction<Boxes, 'editor/boxBeingEdited'> |
  PayloadAction<Dialog, 'editor/changeDialog'> |
  PayloadAction<{ editor: Editor, box: Boxes }, 'editor/changeEditor'> |
  PayloadAction<CardLayout, 'editor/cardLayout'> |
  Action<'editor/viewPreviousCard'> |
  Action<'editor/viewNextCard'>

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
      {
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
      }

    case 'editor/editCard':
      {
        const cards: Card[] = state.deck ? structuredClone(state.deck.cards)
          : []
        if (cards.length > 0) {
          const cardBeingEdited = cards[state.visibleCardIndex]
          const faceBeingEdited = cardBeingEdited[action.payload.face]

          if (state.visibleEditor === Editor.TEXT) {
            faceBeingEdited[action.payload.box] = {
              type: CardContentType.TEXT,
              data: {
                text: (
                  action.payload as
                  EditCardPayload<CardContentType.TEXT>).text
              }
            }
          }
        }

        return {
          ...state,
          deck: {
            name: state.deck ? state.deck.name : "Untitled",
            cards: cards
          },
          boxBeingEdited: null,
          visibleEditor: Editor.NONE,
        }
      }

    case 'editor/deleteCard':
      {
        if (state.deck && action.payload >= 0 &&
          action.payload === 0 && state.deck.cards.length === 1) {
          return {
            ...state,
            deck: {
              name: state.deck.name,
              cards: [structuredClone(EMPTY_CARD)]
            },
            visibleCardIndex: 0,
            appMode: AppMode.EDITING_DECK
          }
        }
        else if (state.deck && action.payload >= 0 &&
          action.payload < state.deck.cards.length) {

          let newDeck = structuredClone(state.deck)
          newDeck.cards.splice(action.payload, 1)

          let newCardIndex: number

          if (action.payload === state.visibleCardIndex) {
            if (state.visibleCardIndex === 0) {
              newCardIndex = newDeck.cards.length - 1
            } else {
              newCardIndex = state.visibleCardIndex - 1
            }
          } else if (action.payload >= newDeck.cards.length) {
            newCardIndex = newDeck.cards.length - 1
          } else {
            newCardIndex = state.visibleCardIndex
          }

          return {
            ...state,
            deck: newDeck,
            visibleCardIndex: newCardIndex,
            appMode: AppMode.EDITING_DECK,
          }
        } else {
          return state
        }
      }

    case 'editor/setDeck':
      {
        return {
          ...state,
          deck: action.payload,
          visibleCardIndex: (action.payload.cards.length > 0) ? 0 : -1
        }
      }

    case 'editor/newDeck':
      {
        if (state.deck !== null) {
          return {
            ...state,
            visibleDialog: Dialog.NEW_DECK_CONFIRMATION_MESSAGE,
            appMode: AppMode.EDITING_DECK,
          }
        } else {
          return {
            ...state,
            deck: {
              name: "Untitled",
              cards: [structuredClone(EMPTY_CARD)]
            },
            visibleCardIndex: 0,
            appMode: AppMode.EDITING_DECK,
          }
        }
      }

    case 'editor/deleteDeck':
      {
        return {
          ...state,
          deck: null,
          visibleDialog: Dialog.NONE,
          visibleCardIndex: -1,
        }
      }

    case 'editor/deleteDeckAndCreateNewDeck':
      {
        return {
          ...state,
          deck: {
            name: "Untitled",
            cards: [structuredClone(EMPTY_CARD)]
          },
          visibleDialog: Dialog.NONE,
          appMode: AppMode.EDITING_DECK
        }
      }

    case 'editor/renameDeck':
      {
        const deck: Deck = {
          name: action.payload,
          cards: (state.deck) ? state.deck.cards : [structuredClone(EMPTY_CARD)]
        }

        return {
          ...state,
          deck: deck,
          visibleEditor: Editor.NONE,
        }
      }

    case 'editor/boxBeingEdited':
      {
        return {
          ...state,
          boxBeingEdited: action.payload
        }
      }

    case 'editor/changeDialog':
      {
        return {
          ...state,
          visibleDialog: action.payload
        }
      }

    case 'editor/changeEditor':
      {
        return {
          ...state,
          boxBeingEdited: action.payload.box,
          visibleEditor: action.payload.editor,
        }
      }


    case 'editor/cardLayout':
      {
        const cards = state.deck ? [
          ...structuredClone(state.deck.cards)
        ] : []

        if (cards.length > 0) {
          cards[state.visibleCardIndex][state.visibleSide].layout =
            action.payload
        }


        return {
          ...state,
          deck: {
            name: state.deck ? state.deck.name : "Untitled",
            cards: cards
          }
        }
      }

    case 'editor/viewPreviousCard':
      {
        if (state.deck && state.deck.cards.length > 1 &&
          state.visibleCardIndex > 0) {
          return {
            ...state,
            visibleCardIndex: state.visibleCardIndex - 1
          }
        }
        else if (state.deck && state.deck.cards.length > 1 &&
          state.visibleCardIndex === 0) {
          return {
            ...state,
            visibleCardIndex: state.deck.cards.length - 1
          }
        }
        else {
          return state
        }

      }

    case 'editor/viewNextCard':
      {
        if (state.deck && state.deck.cards.length > 1 &&
          state.visibleCardIndex < state.deck.cards.length - 1) {
          return {
            ...state,
            visibleCardIndex: state.visibleCardIndex + 1
          }
        }
        else if (state.deck && state.deck.cards.length > 1 &&
          state.visibleCardIndex === state.deck.cards.length - 1) {
          return {
            ...state,
            visibleCardIndex: 0
          }
        }
        else {
          return state
        }
      }



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

export function addCard(): Action<'editor/newCard'> {
  return {
    type: 'editor/newCard'
  }
}

type EditCardPayload<T extends CardContentType> = {
  face: Side,
  box: Boxes
} & CardContentDataType<T>

export function editCard<T extends CardContentType>(
  face: Side, box: Boxes, data: CardContentDataType<T>
): PayloadAction<EditCardPayload<T>, 'editor/editCard'> {
  return {
    type: 'editor/editCard',
    payload: {
      face: face,
      box: box,
      ...data
    }
  }
}

export function deleteCard(index: number):
  PayloadAction<number, 'editor/deleteCard'> {
  return {
    type: 'editor/deleteCard',
    payload: index
  }
}

export function deleteDeckAndCreateNewDeck():
  Action<'editor/deleteDeckAndCreateNewDeck'> {
  return {
    type: 'editor/deleteDeckAndCreateNewDeck'
  }
}

export function newDeck(): Action<'editor/newDeck'> {
  return {
    type: 'editor/newDeck'
  }
}

export function deleteDeck(): Action<'editor/deleteDeck'> {
  return {
    type: 'editor/deleteDeck'
  }
}

export function renameDeck(name: string):
  PayloadAction<string, 'editor/renameDeck'> {
  return {
    type: 'editor/renameDeck',
    payload: name
  }
}

export function setAppMode(appMode: AppMode):
  PayloadAction<AppMode, 'app/appMode'> {
  return {
    type: 'app/appMode',
    payload: appMode
  }
}

export function setBoxBeingEdited(box: Boxes):
  PayloadAction<Boxes, 'editor/boxBeingEdited'> {
  return {
    type: 'editor/boxBeingEdited',
    payload: box
  }
}

export function setDeck(deck: Deck):
  PayloadAction<Deck, 'editor/setDeck'> {
  return {
    type: 'editor/setDeck',
    payload: deck
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

export function changeDialog(dialog: Dialog):
  PayloadAction<Dialog, 'editor/changeDialog'> {
  return {
    type: 'editor/changeDialog',
    payload: dialog
  }
}

export function changeEditor(editor: Editor, box: Boxes):
  PayloadAction<{ editor: Editor, box: Boxes }, 'editor/changeEditor'> {
  return {
    type: 'editor/changeEditor',
    payload: {
      editor: editor,
      box: box,
    }
  }
}

export function changeLayout(newLayout: CardLayout):
  PayloadAction<CardLayout, 'editor/cardLayout'> {
  return {
    type: "editor/cardLayout",
    payload: newLayout
  }
}

export function viewPreviousCard(): Action<'editor/viewPreviousCard'> {
  return {
    type: 'editor/viewPreviousCard'
  }
}

export function viewNextCard(): Action<'editor/viewNextCard'> {
  return {
    type: 'editor/viewNextCard'
  }
}

export const appStore = configureStore({
  reducer: rootReducer
})