// import { ReviewOrder } from "../ReviewOrder"
// import { ShowSideProviderName } from "../ShowSideProvider"
// import AppMode from "../app/AppMode"
// import Dialog from "../app/Dialog"
// import { BoxNumber } from "../card/Box"
// import { Deck } from "../card/deck"
// import { Side } from "../card/side"
// import { BaseEditor, Path } from "slate"
// import { ReactEditor } from "slate-react"
// import { HistoryEditor } from "slate-history"
// import { CustomText } from "../ui/types/slate_defs"



// type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>

// export function getCorrespondingTextEditorNumber(side: Side, boxNumber: BoxNumber): number {
//   return (side === Side.FRONT ? 0 : 4) + Number(boxNumber) - 1
// }

// /**
//  * Value to use as an index of a card in a deck of cards when no card is 
//  * currently focused.
//  */
// export const NO_CARD_FOCUSED: number = -1

// export function editCard(
//     state: AppStateType, 
//   ) {
//     // Copy old set of cards if they exist, and create an empty set of cards 
//     // if not. (This scenario shouldn't be encountered, but it is the fallback 
//     // behavior if the situation does occur.)
//     if (state.deck !== null && state.deck.cards.length > 0) {
//       // switch (getCardContentDataType(data)) {
//       //   case CardContentData.Type.PLAIN_TEXT:
//       //     {
//       //       state.deck.cards[state.visibleCardIndex][face].box[box] = 
//       //         TextBox.of(
//       //           (data as CardContentDataType<CardContentData.Type.PLAIN_TEXT>).text
//       //         )
//       //     }
//       //     break
//       //   case CardContentData.Type.IMAGE:
//       //     {
//       //       state.deck.cards[state.visibleCardIndex][face].box[box] =
//       //         ImageBox.of(
//       //           (data as CardContentDataType<CardContentData.Type.IMAGE>)
//       //           .imageBase64
//       //         )
//       //     }
//       //     break
//       //   case CardContentData.Type.LATEX:
//       //     {
//       //       state.deck.cards[state.visibleCardIndex][face].box[box] = 
//       //       LaTeXTextBox.of(
//       //         (data as CardContentDataType<CardContentData.Type.LATEX>)
//       //           .latex_text
//       //       )
//       //     }
//       // }
//     }
//   }