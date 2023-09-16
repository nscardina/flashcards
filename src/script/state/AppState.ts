import { ReviewOrder } from "../ReviewOrder"
import { ShowSideProviderName } from "../ShowSideProvider"
import AppMode from "../app/AppMode"
import Dialog from "../app/Dialog"
import { Editor } from "../app/Editor"
import { CardContentData, CardContentDataType, getCardContentDataType } from "../card/CardContentData"
import { BoxNumber, ImageBox, VideoLinkBox } from "../card/box"
import { TextBox } from "../card/TextBox"
import { Deck } from "../card/deck"
import { Side } from "../card/side"

/**
 * Detects whether local storage is available by testing if a dummy value can 
 * be inserted and removed from the local storage without throwing an 
 * exception.
 * @returns `true` if local storage is available, `false` otherwise.
 */
function isLocalStorageAvailable(): boolean {
    try {
        const storage = window.localStorage
        if (!!storage) {
            const testValue = "_______Storage__Test__String________"
            storage.setItem(testValue, testValue)
            storage.removeItem(testValue)
            return true
        }
    } finally {
        return false
    }
}

type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>

export type AppStateType = {
    readonly appMode: AppMode,
    readonly setAppMode: ReactSetter<AppMode>
    readonly boxBeingEdited: BoxNumber | null,
    readonly setBoxBeingEdited: ReactSetter<BoxNumber | null>
    readonly deck: Deck | null,
    readonly setDeck: ReactSetter<Deck | null>,
    readonly recentFiles: FileSystemFileHandle[],
    readonly setRecentFiles: ReactSetter<FileSystemFileHandle[]>,
    readonly reviewOrder: ReviewOrder,
    readonly setReviewOrder: ReactSetter<ReviewOrder>,
    readonly showSideProviderName: ShowSideProviderName,
    readonly setShowSideProviderName: ReactSetter<ShowSideProviderName>,
    readonly visibleDialog: Dialog,
    readonly setVisibleDialog: ReactSetter<Dialog>
    readonly visibleEditor: Editor,
    readonly setVisibleEditor: ReactSetter<Editor>,
    readonly visibleCardIndex: number,
    readonly setVisibleCardIndex: ReactSetter<number>,
    readonly visibleSide: Side,
    readonly setVisibleSide: ReactSetter<Side>,
}

/**
 * Value to use as an index of a card in a deck of cards when no card is 
 * currently focused.
 */
export const NO_CARD_FOCUSED: number = -1



export function changeEditor(state: AppStateType, editor: Editor, box: BoxNumber) {
    state.setBoxBeingEdited(box)
    state.setVisibleEditor(editor)
}

export function editCard<T extends CardContentData.Type>(
    state: AppStateType, 
    face: Side, 
    box: BoxNumber, 
    data: CardContentDataType<T>
  ) {
    // Copy old set of cards if they exist, and create an empty set of cards 
    // if not. (This scenario shouldn't be encountered, but it is the fallback 
    // behavior if the situation does occur.)
    if (state.deck !== null && state.deck.cards.length > 0) {
      switch (getCardContentDataType(data)) {
        case CardContentData.Type.TEXT:
          {
            state.deck.cards[state.visibleCardIndex][face].box[box] = 
              TextBox.of(
                (data as CardContentDataType<CardContentData.Type.TEXT>).text
              )
          }
          break
        case CardContentData.Type.IMAGE:
          {
            state.deck.cards[state.visibleCardIndex][face].box[box] =
              ImageBox.of(
                (data as CardContentDataType<CardContentData.Type.IMAGE>)
                .imageBase64
              )
          }
          break
        case CardContentData.Type.VIDEO_LINK:
          {
            state.deck.cards[state.visibleCardIndex][face].box[box] = 
            VideoLinkBox.of(
              (data as CardContentDataType<CardContentData.Type.VIDEO_LINK>)
                .link
            )
          }
      }
    }
    state.setVisibleEditor(Editor.NONE)
  }