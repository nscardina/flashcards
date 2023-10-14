import { Col, Container, Dropdown, Row } from "react-bootstrap"
import CardLayout from "../cardlayout"
import { Side } from "../side"
import AppMode from "../../app/AppMode"
import { Editor } from "../../app/Editor"
import { Box, BoxNumber, getEditorTypeFromBoxType } from "../Box"
import { useContext } from "react"
import { AppState } from "../../App"
import { changeEditor } from "../../state/AppState"
import { CardContentData } from "../CardContentData"
import { NoDeckOpenedMessage } from "./NoDeckOpenedMessage"
import "./CardDisplay.css"
// import { Dropdown, DropdownMenu, DropdownToggle } from "../../ui/Dropdown/DropdownMenu"

/**
 * Returns the `onClick` function to be bound to a box to edit its contents. 
 * This function will display an editor which can update the contents of a 
 * specific box.
 * @param editor {@linkcode Editor} to use.
 * @param box box to edit.
 * @returns `onClick` function which can be bound to a React `button`.
 */
function getOnClickFuncFromEditorType(editor: Editor, box: BoxNumber) {
  const appState = useContext(AppState)
  if (appState.appMode === AppMode.EDITING_DECK ||
      appState.appMode === AppMode.MANAGING_FILES) {
    switch (editor) {
      case Editor.TEXT:
        return () => changeEditor(appState, Editor.TEXT, box)
      case Editor.IMAGE:
        return () => changeEditor(appState, Editor.IMAGE, box)
      case Editor.VIDEO_LINK:
        return () => changeEditor(appState, Editor.VIDEO_LINK, box)
      default:
        return () => { }
    }
  } else {
    return () => {}
  }
}


/**


/**
 * React component used for rendering the {@linkcode CardDisplay} UI with the 
 * {@linkcode ONE_BOX_LV_TWO_BOXES_RV} layout.
 * @param param0 props of this component.
 * @returns UI, as a JSX element.
 */
function OneBoxLeftTwoBoxesRight({ appMode, box1, box2, box3 }: {
  /**
   * {@linkcode AppMode} to use to determine whether to draw the outline around 
   * the box in `EDITING_DECK` mode.
   */
  appMode: AppMode,
  /**
   * Left {@linkcode Box} to render.
   */
  box1: JSX.Element,
  /**
   * Right upper {@linkcode Box} to render.
   */
  box2: JSX.Element,
  /**
   * Right lower {@linkcode Box} to render.
   */
  box3: JSX.Element,
}) {

  const appState = useContext(AppState)

  let [type1, type2, type3] = [Editor.NONE, Editor.NONE, Editor.NONE]

  if (appState.deck && appState.visibleCardIndex >= 0) {
    const side = appState.deck.cards[
      appState.visibleCardIndex][appState.visibleSide]
    type1 = getEditorTypeFromBoxType(side.box[1])
    type2 = getEditorTypeFromBoxType(side.box[2])
    type3 = getEditorTypeFromBoxType(side.box[3])
  }

  const func1 = getOnClickFuncFromEditorType(type1, 1)
  const func2 = getOnClickFuncFromEditorType(type2, 2)
  const func3 = getOnClickFuncFromEditorType(type3, 3)

  return (
    <Row className="h-100">
      <Col className={
        `h-100 ms-3 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      } onClick={func1}>
        {box1}
      </Col>
      <Col className="h-100 align-items-center">
        <Container className="h-100 d-flex flex-column">
          <Row className={
            `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
          } onClick={func2} style={{ maxHeight: "50%" }}>
            {box2}
          </Row>
          <Row className={
            `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
          } onClick={func3} style={{ maxHeight: "50%" }}>
            {box3}
          </Row>
        </Container>
      </Col>
    </Row>
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
        <style style={{display: "none"}}>
          {
            `
            .dropdown-toggle.edit-mode-toggle::after {
              display: none !important;
            }
            `
          }
        </style>

        <Dropdown.Toggle className="edit-mode-toggle flashcard-button d-flex align-items-center"
        style={{display: "block"}}>
          <span className="material-symbols-outlined">edit</span>test
        </Dropdown.Toggle>

        <Dropdown.Menu style={{flexDirection: "column"}}>
          <Dropdown.Item as="button" className="flashcard-button d-flex align-items-center"
            onClick={() => {
              changeEditor(appState, Editor.TEXT, box)
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
              changeEditor(appState, Editor.VIDEO_LINK, box)
            }}>
            <span className="material-symbols-outlined">play_arrow</span>&nbsp;Video
          </Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>
    </div>
  )
}

function getCSSClassFromCardLayout(layout: CardLayout): string {
  switch(layout) {
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
    <div className="flashcard-display" style={{position: "relative"}}>
      <div className={
        `flashcard-face ${
          appState.visibleSide === Side.BACK ? "flashcard-front-face-rotated" : ""
      } ${getCSSClassFromCardLayout(visibleCard.front.layout)}`}>
        {
          Object.keys(visibleCard.front.box).map(key => {
            const value = visibleCard.front.box[key as BoxNumber]
            if (value === null) {
              return (
                <div>
                  <EditModeBox box={key as BoxNumber} />
                </div>
              )
            }
            switch(value.type) {
              case CardContentData.Type.TEXT:
                return <div onClick={() => {
                  changeEditor(appState, 
                    getEditorTypeFromBoxType(
                      visibleCard.front.box[key as BoxNumber]), 
                    key as BoxNumber)
                }}>{value.text}</div>
              case CardContentData.Type.IMAGE:
                return <img 
                style={{ objectFit: "contain" }} 
                src={value.base64ImageData} 
                onClick={() => {
                  changeEditor(appState, Editor.VIDEO_LINK, key as BoxNumber)
                }}
                />
              default: return <></>
            }
          })
        }
      </div>
      <div className={
        `flashcard-face ${
          appState.visibleSide === Side.FRONT ? "flashcard-back-face-rotated" : ""
      }`}>
        Test Text Back
      </div>
    </div>
  )

  // const visibleCard = appState.deck.cards[appState.visibleCardIndex]
  // if (visibleCard === undefined) {
  //   return <NoDeckOpenedMessage />
  // }
  // const visibleFace = (appState.visibleSide === Side.FRONT) ?
  //   visibleCard.front : visibleCard.back

  // const [box1, box2, box3, box4] = [
  //   visibleFace.box[1],
  //   visibleFace.box[2],
  //   visibleFace.box[3],
  //   visibleFace.box[4],
  // ].map((box, index) => {
  //   if (appState.appMode === AppMode.EDITING_DECK && box === null) {
  //     return <EditModeBox box={(() => {
  //       switch (index) {
  //         case 0: return 1
  //         case 1: return 2
  //         case 2: return 3
  //         case 3: return 4
  //         default: throw new Error("Invalid box index; should be impossible")
  //       }
  //     })()} />
  //   } else if (box === null) {
  //     return <></>
  //   } else if (
  //     box.type === CardContentData.Type.TEXT
  //   ) {
  //     return <>{box.text}</>
  //   } else if (
  //     box.type === CardContentData.Type.IMAGE
  //   ) {
  //     return <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={box.base64ImageData} />
  //   } else if (
  //     box.type === CardContentData.Type.VIDEO_LINK
  //   ) {
  //     return <>Video</>
  //   } else {
  //     return <></>
  //   }
  // })

  // let jsx = <>Test</>
  // switch (visibleFace.layout) {

  //   case CardLayout.ONE_BOX:
  //     jsx = box1 ? <OneBox appMode={appMode} box={box1} /> : <></>
  //     break

  //   case CardLayout.TWO_BOXES_V:
  //     jsx = box1 && box2 ?
  //       <TwoBoxesVertical appMode={appMode} box1={box1} box2={box2} /> :
  //       <></>
  //     break
  //   case CardLayout.TWO_BOXES_H:
  //     jsx = box1 && box2 ?
  //       <TwoBoxesHorizontal appMode={appMode} box1={box1} box2={box2} /> :
  //       <></>
  //     break
  //   case CardLayout.ONE_BOX_LV_TWO_BOXES_RV:
  //     jsx = box1 && box2 && box3 ?
  //       <OneBoxLeftTwoBoxesRight appMode={appMode}
  //         box1={box1} box2={box2} box3={box3} /> :
  //       <></>
  //     break
  //   case CardLayout.ONE_BOX_RV_TWO_BOXES_LV:
  //     jsx = box1 && box2 && box3 ?
  //       <OneBoxRightTwoBoxesLeft appMode={appMode}
  //         box1={box1} box2={box2} box3={box3} /> :
  //       <></>
  //     break
  //   case CardLayout.ONE_BOX_TH_TWO_BOXES_BH:
  //     jsx = box1 && box2 && box3 ?
  //       <OneBoxTopTwoBoxesBottom appMode={appMode}
  //         box1={box1} box2={box2} box3={box3} /> :
  //       <></>
  //     break
  //   case CardLayout.ONE_BOX_BH_TWO_BOXES_TH:
  //     jsx = box1 && box2 && box3 ?
  //       <OneBoxBottomTwoBoxesTop appMode={appMode}
  //         box1={box1} box2={box2} box3={box3} /> :
  //       <></>
  //     break
  //   case CardLayout.FOUR_BOXES:
  //     jsx = box1 && box2 && box3 && box4 ?
  //       <FourBoxes appMode={appMode}
  //         box1={box1} box2={box2} box3={box3} box4={box4} /> :
  //       <></>
  //     break
  // }

  // return (
  //   <div className="flashcard-display">
  //     {jsx}
  //   </div>
  // )

}

export default CardDisplay