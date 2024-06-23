import CardLayout from "../cardlayout"
import { Side } from "../side"
import AppMode from "../../app/AppMode"
import { Editor } from "../../app/Editor"
import { BoxNumber } from "../Box"
import { useContext } from "react"
import { AppState } from "../../App"
import { changeEditor } from "../../state/AppState"
import { CardContentData } from "../CardContentData"
import { NoDeckOpenedMessage } from "./NoDeckOpenedMessage"
import "./CardDisplay.scss"
import 'katex/dist/katex.min.css';
import { CardDisplayXButton } from "./CardDisplayXButton"
import { EditModeBox } from "./EditModeBox"
import { Slate } from "slate-react"

function getCSSClassFromCardLayout(layout: CardLayout): string {
  switch (layout) {
    case CardLayout.ONE_BOX: return "card-layout-one-box"
    case CardLayout.TWO_BOXES_V: return "card-layout-two-boxes-v"
    case CardLayout.TWO_BOXES_H: return "card-layout-two-boxes-h"
    case CardLayout.ONE_BOX_BH_TWO_BOXES_TH:
      return "card-layout-one-box-bh-two-boxes-th"
    case CardLayout.ONE_BOX_LV_TWO_BOXES_RV:
      return "card-layout-one-box-lv-two-boxes-rv"
    case CardLayout.ONE_BOX_RV_TWO_BOXES_LV:
      return "card-layout-one-box-rv-two-boxes-lv"
    case CardLayout.ONE_BOX_TH_TWO_BOXES_BH:
      return "card-layout-one-box-th-two-boxes-bh"
    case CardLayout.FOUR_BOXES:
      return "card-layout-four-boxes"
  }
}

/**
 * React component used to render the card display of the app. The card display 
 * renders the currently visible side of the currently visible flashcard.
 * @returns card display, as a JSX element.
 */
function CardDisplay({ position, forceAspectRatio, fillAvailableSpace }: {
  position?: "static" | "relative" | "absolute" | "sticky" | "fixed",
  forceAspectRatio?: boolean,
  fillAvailableSpace?: boolean,
}) {

  const appState = useContext(AppState)

  if (!appState.deck) {
    return <NoDeckOpenedMessage />
  }

  const visibleCard = appState.deck.cards[appState.visibleCardIndex]
  if (visibleCard === undefined) {
    return <NoDeckOpenedMessage />
  }


  return (
    <div className="flashcard-display" style={{
      position: position ?? "relative",
      aspectRatio: forceAspectRatio ? "5 / 3" : "auto",
      display: "block",
      ...(fillAvailableSpace ? {} : { minWidth: "0%" })
    }}>
      {
        Object.values(Side).map(side => {
          const visibleSide = visibleCard[side]
          return (
            <div key={side} className={`flashcard-face ${
              appState.visibleSide !== side ? `flashcard-${side}-face-rotated` : ""
              } ${getCSSClassFromCardLayout(visibleCard[side].layout)}`
            }>

              {
                (Object.keys(visibleSide.box) as BoxNumber[]).map(boxNumber => {
                  const box = visibleSide.box[boxNumber]

                  if (box === null && appState.appMode === AppMode.EDITING_DECK) {
                    return (
                      <div key={boxNumber} className="flashcard-box flashcard-edit-mode-box">
                        <EditModeBox box={boxNumber} />
                      </div>
                    )
                  } else if (box === null) {
                    return <></>
                  }

                  switch (box.type) {
                    case CardContentData.Type.PLAIN_TEXT:
                      return (
                        <Slate editor={}
                        // <>
                        //   <div key={boxNumber}
                        //     className={`${appState.appMode === AppMode.EDITING_DECK
                        //       ? "flashcard-edit-mode-box" : ""
                        //       } flashcard-box flashcard-display-box-container`}
                        //     style={{ position: "relative" }}
                        //     onClick={appState.appMode === AppMode.EDITING_DECK ? () => {
                        //       changeEditor(appState,
                        //         getEditorTypeFromBoxType(
                        //           visibleSide.box[boxNumber]),
                        //         boxNumber)
                        //     } : () => {}} dangerouslySetInnerHTML={{ __html: box.text }}></div>
                        //   {
                        //     appState.appMode === AppMode.EDITING_DECK ? 
                        //     <CardDisplayXButton boxNumber={boxNumber} side={Side.FRONT} /> : ""
                        //   }
                        // </>

                      )
                    case CardContentData.Type.IMAGE:
                      return (
                        <div className={`${appState.appMode === AppMode.EDITING_DECK
                          ? "flashcard-edit-mode-box" : ""} flashcard-box`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                          <img
                            style={{ objectFit: "contain" }}
                            src={box.base64ImageData}
                            className={`flashcard-display-box-container`}
                            onClick={appState.appMode === AppMode.EDITING_DECK ? () => {
                              changeEditor(appState, Editor.LATEX_TEST, boxNumber)
                            } : () => {}}
                          />
                          {
                            appState.appMode === AppMode.EDITING_DECK ? 
                            <CardDisplayXButton boxNumber={boxNumber} side={Side.FRONT} /> : ""
                          }
                        </div>
                      )

                    default: return <></>
                  }
                })
              }
            </div>
          )
        })
      }
    </div>
  )

}

export default CardDisplay