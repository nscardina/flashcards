import { Dropdown } from "react-bootstrap"
import CardLayout from "../cardlayout"
import { Side } from "../side"
import AppMode from "../../app/AppMode"
import { Editor } from "../../app/Editor"
import { BoxNumber, getEditorTypeFromBoxType } from "../Box"
import { useCallback, useContext } from "react"
import { AppState } from "../../App"
import { changeEditor } from "../../state/AppState"
import { CardContentData } from "../CardContentData"
import { NoDeckOpenedMessage } from "./NoDeckOpenedMessage"
import ReactDOMServer from "react-dom/server"
import "./CardDisplay.scss"
import 'katex/dist/katex.min.css';
import Latex from "react-latex-next"


/**
 * Returns the `onClick` function to be bound to a box to edit its contents. 
 * This function will display an editor which can update the contents of a 
 * specific box.
 * @param editor {@linkcode Editor} to use.
 * @param box box to edit.
 * @returns `onClick` function which can be bound to a React `button`.
 * 
 */
//@ts-expect-error
function getOnClickFuncFromEditorType(editor: Editor, box: BoxNumber) {
  const appState = useContext(AppState)
  if (appState.appMode === AppMode.EDITING_DECK ||
    appState.appMode === AppMode.MANAGING_FILES) {
    switch (editor) {
      case Editor.PLAIN_TEXT:
        return () => changeEditor(appState, Editor.PLAIN_TEXT, box)
      case Editor.IMAGE:
        return () => changeEditor(appState, Editor.IMAGE, box)
      case Editor.LATEX_TEST:
        return () => changeEditor(appState, Editor.LATEX_TEST, box)
      default:
        return () => { }
    }
  } else {
    return () => { }
  }
}

const CardDisplayXButton = ({ side, boxNumber }: { boxNumber: BoxNumber, side: Side }) => {

  const appState = useContext(AppState)

  const xButtonOnclick = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      // Don't trigger the editor popover
      event.stopPropagation()

      if (appState.deck) {
        const modifiedCard = structuredClone(appState.deck.cards[appState.visibleCardIndex]);
        modifiedCard[side].box[boxNumber] = null;

        appState.setDeck({
          ...appState.deck,
          cards: [
            ...appState.deck.cards.slice(0, appState.visibleCardIndex),
            modifiedCard,
            ...appState.deck.cards.slice(appState.visibleCardIndex + 1)
          ]
        });
      }
    }, [
      appState.deck,
      appState.deck?.cards,
      appState.visibleCardIndex,
    ]);

  return (
    <svg className={`flashcard-x-button-${boxNumber}`}
      style={{ width: "1rem", height: "1rem" }}
      onClick={ xButtonOnclick }>
      <circle cx="50%" cy="50%" r="45%" fill="var(--bs-body-bg)" stroke="var(--bs-body-color)" strokeWidth="5%" />
      <line x1="25%" y1="25%" x2="75%" y2="75%" stroke="var(--bs-body-color)" strokeWidth="5%" />
      <line x1="25%" y1="75%" x2="75%" y2="25%" stroke="var(--bs-body-color)" strokeWidth="5%" />
    </svg>
  )
}



/**
 * React component which encapsulates the "edit mode box" functionality; that is, the pencil dropdown 
 * menu that appears in edit mode when a particular box on a card has no content associated with it.
 * This component takes props which allow it to cause the text editor, image picker, or video URL 
 * input box to show up.
 * @param param0 props.
 * @returns React component described above.
 */
function EditModeBox({ box }: { box: BoxNumber }) {

  const appState = useContext(AppState)

  return (
    <div className="d-flex w-100 h-100 align-items-center justify-content-center">

      <Dropdown>
        <style style={{ display: "none" }}>
          {
            `
            .dropdown-toggle.edit-mode-toggle::after {
              display: none !important;
            }
            `
          }
        </style>

        <Dropdown.Toggle className="edit-mode-toggle flashcard-button d-flex align-items-center"
          style={{ display: "block" }}>
          <span className="material-symbols-outlined">edit</span>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ flexDirection: "column" }}>
          <Dropdown.Item as="button" className="flashcard-button d-flex align-items-center"
            onClick={() => {
              changeEditor(appState, Editor.PLAIN_TEXT, box)
            }}>
            <span className="material-symbols-outlined">article</span>&nbsp;Text
          </Dropdown.Item>
          <Dropdown.Item as="button" className="flashcard-button d-flex align-items-center"
            onClick={() => {
              changeEditor(appState, Editor.IMAGE, box)
            }}>
            <span className="material-symbols-outlined">image</span>&nbsp;Image
          </Dropdown.Item>
          <Dropdown.Item as="button" className="flashcard-button d-flex align-items-center"
            onClick={() => {
              changeEditor(appState, Editor.LATEX_TEST, box)
            }}>
            <span className="material-symbols-outlined">play_arrow</span>&nbsp;<Latex>$\LaTeX$</Latex>
          </Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>
    </div>
  )
}

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
function CardDisplay() {

  const appState = useContext(AppState)

  if (!appState.deck) {
    return <NoDeckOpenedMessage />
  }

  const visibleCard = appState.deck.cards[appState.visibleCardIndex]
  if (visibleCard === undefined) {
    return <NoDeckOpenedMessage />
  }


  return (
    <div className="flashcard-display">
      {
        Object.values(Side).map(side => {
          const visibleSide = visibleCard[side]
          return (
            <div key={side} className={`flashcard-face ${appState.visibleSide !== side ? `flashcard-${side}-face-rotated` : ""
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
                        <>
                          <div key={boxNumber}
                            className={`${appState.appMode === AppMode.EDITING_DECK
                              ? "flashcard-edit-mode-box" : ""
                              } flashcard-box flashcard-display-box-container`}
                            style={{ position: "relative" }}
                            onClick={appState.appMode === AppMode.EDITING_DECK ? () => {
                              changeEditor(appState,
                                getEditorTypeFromBoxType(
                                  visibleSide.box[boxNumber]),
                                boxNumber)
                            } : () => { }} dangerouslySetInnerHTML={{ __html: box.text }}></div>
                          {
                            appState.appMode === AppMode.EDITING_DECK ?
                              <CardDisplayXButton boxNumber={boxNumber} side={Side.FRONT} /> : ""
                          }
                        </>

                      )
                    case CardContentData.Type.LATEX:
                      return (
                        <>
                          <div key={boxNumber}
                            className={`${appState.appMode === AppMode.EDITING_DECK
                              ? "flashcard-edit-mode-box" : ""
                              } flashcard-box flashcard-display-box-container`}
                            style={{ position: "relative" }}
                            onClick={appState.appMode === AppMode.EDITING_DECK ? () => {
                              changeEditor(appState,
                                getEditorTypeFromBoxType(
                                  visibleSide.box[boxNumber]),
                                boxNumber)
                            } : () => { }}>
                            <Latex>
                              {
                                ReactDOMServer.renderToString(<span dangerouslySetInnerHTML={{ __html: box.latex_text }}>

                                </span>)
                              }
                            </Latex>
                          </div>
                          {
                            appState.appMode === AppMode.EDITING_DECK ?
                              <CardDisplayXButton boxNumber={boxNumber} side={Side.FRONT} /> : ""
                          }
                        </>

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
                            } : () => { }}
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