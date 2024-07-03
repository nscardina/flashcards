import { ReviewOrder } from "../ReviewOrder"
import { ShowSideProviderName } from "../ShowSideProvider"
import AppMode from "../app/AppMode"
import Dialog from "../app/Dialog"
import { CardContentData, CardContentDataType } from "../card/CardContentData"
import { BoxNumber } from "../card/Box"
import { Deck } from "../card/deck"
import { Side } from "../card/side"
import { BaseEditor } from "slate"
import { ReactEditor } from "slate-react"
import { HistoryEditor } from "slate-history"
import { FormattedText } from "../ui/types/slate_defs"

type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>

export type AppStateType = {
    readonly appMode: AppMode,
    readonly setAppMode: ReactSetter<AppMode>

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

    readonly visibleCardIndex: number,
    readonly setVisibleCardIndex: ReactSetter<number>,

    readonly visibleSide: Side,
    readonly setVisibleSide: ReactSetter<Side>,

    readonly textEditors: (BaseEditor & ReactEditor & HistoryEditor)[],
    readonly lastEditedTextEditorIndex: number,
    readonly setLastEditedTextEditorIndex: ReactSetter<number>,
    readonly currentMarks: (Omit<FormattedText, "text"> | null),
    readonly setCurrentMarks: ReactSetter<(Omit<FormattedText, "text"> | null)>,

    readonly currentDialog: JSX.Element,
    readonly setCurrentDialog: ReactSetter<JSX.Element>
}

export function getCorrespondingTextEditorNumber(side: Side, boxNumber: BoxNumber): number {
  return (side === Side.FRONT ? 0 : 4) + Number(boxNumber) - 1
}

/**
 * Value to use as an index of a card in a deck of cards when no card is 
 * currently focused.
 */
export const NO_CARD_FOCUSED: number = -1

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
      // switch (getCardContentDataType(data)) {
      //   case CardContentData.Type.PLAIN_TEXT:
      //     {
      //       state.deck.cards[state.visibleCardIndex][face].box[box] = 
      //         TextBox.of(
      //           (data as CardContentDataType<CardContentData.Type.PLAIN_TEXT>).text
      //         )
      //     }
      //     break
      //   case CardContentData.Type.IMAGE:
      //     {
      //       state.deck.cards[state.visibleCardIndex][face].box[box] =
      //         ImageBox.of(
      //           (data as CardContentDataType<CardContentData.Type.IMAGE>)
      //           .imageBase64
      //         )
      //     }
      //     break
      //   case CardContentData.Type.LATEX:
      //     {
      //       state.deck.cards[state.visibleCardIndex][face].box[box] = 
      //       LaTeXTextBox.of(
      //         (data as CardContentDataType<CardContentData.Type.LATEX>)
      //           .latex_text
      //       )
      //     }
      // }
    }
  }