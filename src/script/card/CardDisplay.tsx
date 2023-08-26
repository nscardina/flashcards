import { Col, Container, Dropdown, Row } from "react-bootstrap"
import CardLayout from "./cardlayout"
import { Side } from "./side"
import AppMode from "../app/AppMode"
import { Editor } from "../app/Editor"
import { Box, Boxes, ImageBox, TextBox, VideoLinkBox } from "./box"
import { useContext } from "react"
import { AppState } from "../App"
import { changeEditor } from "../state/AppState"
import { CardContentData } from "./CardContentData"



/**
 * React component holding a message to display in the place where flashcards 
 * are normally displayed, which tells the user that no deck is opened and that 
 * they can click in that area to open a deck file.
 * @returns React component containing the message.
 */
function NoDeckOpenedMessage() {
  return (
    <div className="flashcard-display p-0 d-flex align-items-center justify-content-center">
      <label className="position-absolute" htmlFor="deck_display">
        No deck opened. Click here to open a deck file...
      </label>
      <input type="file" id="deck_display" className="w-100 h-100 d-flex opacity-0" />
    </div>
  )
}

function getEditorTypeFromBoxType(box: Box<any> | null): Editor {
  if (box) {
    if (box instanceof TextBox) {
      return Editor.TEXT
    } else if (box instanceof ImageBox) {
      return Editor.IMAGE
    } else if (box instanceof VideoLinkBox) {
      return Editor.VIDEO_LINK
    }
  }
  return Editor.NONE
}

function getOnClickFuncFromEditorType(type: Editor, box: Boxes): () => any {
  const appState = useContext(AppState)
  switch (type) {
    case Editor.TEXT:
      return () => changeEditor(appState, Editor.TEXT, box)
    case Editor.IMAGE:
      return () => changeEditor(appState, Editor.IMAGE, box)
    case Editor.VIDEO_LINK:
      return () => changeEditor(appState, Editor.VIDEO_LINK, box)
    default:
      return () => {}
  }
}

/**
 * React component used for rendering the {@linkcode CardDisplay} UI with the 
 * {@linkcode CardLayout.ONE_BOX} layout.
 * @param param0 props of this component.
 * @returns UI, as a JSX Element.
 */
function OneBox({ appMode, box }: {
  /**
   * {@linkcode AppMode} to use to determine whether to draw the outline around 
   * the box in `EDITING_DECK` mode.
   */
  appMode: AppMode,
  /**
   * Single {@linkcode Box} to render.
   */
  box: JSX.Element,
}) {

  const appState = useContext(AppState)

  let type: Editor = Editor.NONE

  if (appState.deck && appState.visibleCardIndex >= 0) {
    const box1 = appState.deck.cards[
      appState.visibleCardIndex][appState.visibleSide].box1
    type = getEditorTypeFromBoxType(box1)
  }

  let func = getOnClickFuncFromEditorType(type, Boxes.BOX_1)
  

  return (
    <div className={
      `w-100 h-100 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
    } onClick={func}>
      {box}
    </div>
  )
}

/**
 * React component used for rendering the {@linkcode CardDisplay} UI with the 
 * {@linkcode TWO_BOXES_V} layout.
 * @param param0 props of this component.
 * @returns UI, as a JSX element.
 */
function TwoBoxesVertical({ appMode, box1, box2 }: {
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
   * Right {@linkcode Box} to render.
   */
  box2: JSX.Element,
}) {

  const appState = useContext(AppState)

  let [type1, type2] = [Editor.NONE, Editor.NONE]

  if (appState.deck && appState.visibleCardIndex >= 0) {
    const side = appState.deck.cards[
      appState.visibleCardIndex][appState.visibleSide]
    type1 = getEditorTypeFromBoxType(side.box1)
    type2 = getEditorTypeFromBoxType(side.box2)
  }

  const func1 = getOnClickFuncFromEditorType(type1, Boxes.BOX_1)
  const func2 = getOnClickFuncFromEditorType(type2, Boxes.BOX_2)


  return (
    <Row className="h-100">
      <Col className={
        `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      } onClick={func1}>
        {box1}
      </Col>
      <Col className={
        `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      } onClick={func2}>
        {box2}
      </Col>
    </Row>
  )
}

/**
 * React component used for rendering the {@linkcode CardDisplay} UI with the 
 * {@linkcode TWO_BOXES_H} layout.
 * @param param0 props of this component.
 * @returns UI, as a JSX element.
 */
function TwoBoxesHorizontal({ appMode, box1, box2 }: {
  /**
   * {@linkcode AppMode} to use to determine whether to draw the outline around 
   * the box in `EDITING_DECK` mode.
   */
  appMode: AppMode,
  /**
   * Top {@linkcode Box} to render.
   */
  box1: JSX.Element,
  /**
   * Bottom {@linkcode Box} to render.
   */
  box2: JSX.Element,
}) {

  const appState = useContext(AppState)

  let [type1, type2] = [Editor.NONE, Editor.NONE]

  if (appState.deck && appState.visibleCardIndex >= 0) {
    const side = appState.deck.cards[
      appState.visibleCardIndex][appState.visibleSide]
    type1 = getEditorTypeFromBoxType(side.box1)
    type2 = getEditorTypeFromBoxType(side.box2)
  }

  const func1 = getOnClickFuncFromEditorType(type1, Boxes.BOX_1)
  const func2 = getOnClickFuncFromEditorType(type2, Boxes.BOX_2)

  return (
    <Container className="h-100 d-flex flex-column">
      <Row className={
        `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      } onClick={func1}>
        {box1}
      </Row>
      <Row className={
        `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      } onClick={func2}>
        {box2}
      </Row>
    </Container>
  )
}

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
    type1 = getEditorTypeFromBoxType(side.box1)
    type2 = getEditorTypeFromBoxType(side.box2)
    type3 = getEditorTypeFromBoxType(side.box3)
  }

  const func1 = getOnClickFuncFromEditorType(type1, Boxes.BOX_1)
  const func2 = getOnClickFuncFromEditorType(type2, Boxes.BOX_2)
  const func3 = getOnClickFuncFromEditorType(type3, Boxes.BOX_3)

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
          } onClick={func2}>
            {box2}
          </Row>
          <Row className={
            `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
          } onClick={func3}>
            {box3}
          </Row>
        </Container>
      </Col>
    </Row>
  )
}

/**
 * React component used for rendering the {@linkcode CardDisplay} UI with the 
 * {@linkcode ONE_BOX_RV_TWO_BOXES_LV} layout.
 * @param param0 props of this component.
 * @returns UI, as a JSX element.
 */
function OneBoxRightTwoBoxesLeft({ appMode, box1, box2, box3 }: {
  /**
   * {@linkcode AppMode} to use to determine whether to draw the outline around 
   * the box in `EDITING_DECK` mode.
   */
  appMode: AppMode,
  /**
   * Left upper {@linkcode Box} to render.
   */
  box1: JSX.Element,
  /**
   * Left lower {@linkcode Box} to render.
   */
  box2: JSX.Element,
  /**
   * Right {@linkcode Box} to render.
   */
  box3: JSX.Element,
}) {

  const appState = useContext(AppState)

  let [type1, type2, type3] = [Editor.NONE, Editor.NONE, Editor.NONE]

  if (appState.deck && appState.visibleCardIndex >= 0) {
    const side = appState.deck.cards[
      appState.visibleCardIndex][appState.visibleSide]
    type1 = getEditorTypeFromBoxType(side.box1)
    type2 = getEditorTypeFromBoxType(side.box2)
    type3 = getEditorTypeFromBoxType(side.box3)
  }

  const func1 = getOnClickFuncFromEditorType(type1, Boxes.BOX_1)
  const func2 = getOnClickFuncFromEditorType(type2, Boxes.BOX_2)
  const func3 = getOnClickFuncFromEditorType(type3, Boxes.BOX_3)

  return (
    <Row className="h-100">
      <Col className="h-100 align-items-center">
        <Container className="h-100 d-flex flex-column">
          <Row className={
            `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
          } onClick={func1}>
            {box1}
          </Row>
          <Row className={
            `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
          } onClick={func2}>
            {box2}
          </Row>
        </Container>
      </Col>
      <Col className={
        `h-100 ms-3 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      } onClick={func3}>
        {box3}
      </Col>
    </Row>
  )
}

/**
 * React component used for rendering the {@linkcode CardDisplay} UI with the 
 * {@linkcode ONE_BOX_TH_TWO_BOXES_BH} layout.
 * @param param0 props of this component.
 * @returns UI, as a JSX element.
 */
function OneBoxTopTwoBoxesBottom({ appMode, box1, box2, box3 }: {
  /**
   * {@linkcode AppMode} to use to determine whether to draw the outline around 
   * the box in `EDITING_DECK` mode.
   */
  appMode: AppMode,
  /**
   * Top {@linkcode Box} to render.
   */
  box1: JSX.Element,
  /**
   * Bottom left {@linkcode Box} to render.
   */
  box2: JSX.Element,
  /**
   * Bottom right {@linkcode Box} to render.
   */
  box3: JSX.Element,
}) {

  const appState = useContext(AppState)

  let [type1, type2, type3] = [Editor.NONE, Editor.NONE, Editor.NONE]

  if (appState.deck && appState.visibleCardIndex >= 0) {
    const side = appState.deck.cards[
      appState.visibleCardIndex][appState.visibleSide]
    type1 = getEditorTypeFromBoxType(side.box1)
    type2 = getEditorTypeFromBoxType(side.box2)
    type3 = getEditorTypeFromBoxType(side.box3)
  }

  const func1 = getOnClickFuncFromEditorType(type1, Boxes.BOX_1)
  const func2 = getOnClickFuncFromEditorType(type2, Boxes.BOX_2)
  const func3 = getOnClickFuncFromEditorType(type3, Boxes.BOX_3)

  return (
    <Container className="h-100 d-flex flex-column">
      <Row className={
        `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      } onClick={func1}>
        {box1}
      </Row>
      <Row className="flex-fill mt-2">
        <Col className={
          `me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        } onClick={func2}>
          {box2}
        </Col>
        <Col className={
          `me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        } onClick={func3}>
          {box3}
        </Col>
      </Row>
    </Container>
  )
}

/**
 * React component used for rendering the {@linkcode CardDisplay} UI with the 
 * {@linkcode ONE_BOX_BH_TWO_BOXES_TH} layout.
 * @param param0 props of this component.
 * @returns UI, as a JSX element.
 */
function OneBoxBottomTwoBoxesTop({ appMode, box1, box2, box3 }: {
  /**
   * {@linkcode AppMode} to use to determine whether to draw the outline around 
   * the box in `EDITING_DECK` mode.
   */
  appMode: AppMode,
  /**
   * Top left {@linkcode Box} to render.
   */
  box1: JSX.Element,
  /**
   * Top right {@linkcode Box} to render.
   */
  box2: JSX.Element,
  /**
   * Bottom {@linkcode Box} to render.
   */
  box3: JSX.Element,
}) {

  const appState = useContext(AppState)

  let [type1, type2, type3] = [Editor.NONE, Editor.NONE, Editor.NONE]

  if (appState.deck && appState.visibleCardIndex >= 0) {
    const side = appState.deck.cards[
      appState.visibleCardIndex][appState.visibleSide]
    type1 = getEditorTypeFromBoxType(side.box1)
    type2 = getEditorTypeFromBoxType(side.box2)
    type3 = getEditorTypeFromBoxType(side.box3)
  }

  const func1 = getOnClickFuncFromEditorType(type1, Boxes.BOX_1)
  const func2 = getOnClickFuncFromEditorType(type2, Boxes.BOX_2)
  const func3 = getOnClickFuncFromEditorType(type3, Boxes.BOX_3)

  return (
    <Container className="h-100 d-flex flex-column">
      <Row className="flex-fill mt-2">
        <Col className={
          `me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        } onClick={func1}>
          {box1}
        </Col>
        <Col className={
          `me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        } onClick={func2}>
          {box2}
        </Col>
      </Row>
      <Row className={
        `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      } onClick={func3}>
        {box3}
      </Row>
    </Container>
  )
}

/**
 * React component used for rendering the {@linkcode CardDisplay} UI with the 
 * {@linkcode FOUR_BOXES} layout.
 * @param param0 props of this component.
 * @returns UI, as a JSX element.
 */
function FourBoxes({appMode, box1, box2, box3, box4}: {
  /**
   * {@linkcode AppMode} to use to determine whether to draw the outline around 
   * the box in `EDITING_DECK` mode.
   */
  appMode: AppMode,
  /**
   * Top left {@linkcode Box} to render.
   */
  box1: JSX.Element,
  /**
   * Top right {@linkcode Box} to render.
   */
  box2: JSX.Element,
  /**
   * Bottom left {@linkcode Box} to render.
   */
  box3: JSX.Element,
  /**
   * Bottom right {@linkcode Box} to render.
   */
  box4: JSX.Element,
}) {

  const appState = useContext(AppState)

  let [type1, type2, type3, type4] = 
  [Editor.NONE, Editor.NONE, Editor.NONE, Editor.NONE]

  if (appState.deck && appState.visibleCardIndex >= 0) {
    const side = appState.deck.cards[
      appState.visibleCardIndex][appState.visibleSide]
    type1 = getEditorTypeFromBoxType(side.box1)
    type2 = getEditorTypeFromBoxType(side.box2)
    type3 = getEditorTypeFromBoxType(side.box3)
    type4 = getEditorTypeFromBoxType(side.box4)
  }

  const func1 = getOnClickFuncFromEditorType(type1, Boxes.BOX_1)
  const func2 = getOnClickFuncFromEditorType(type2, Boxes.BOX_2)
  const func3 = getOnClickFuncFromEditorType(type3, Boxes.BOX_3)
  const func4 = getOnClickFuncFromEditorType(type4, Boxes.BOX_4)

  return (
    <div className="h-100 d-flex flex-column">
      <Row className="flex-fill mb-3">
        <Col className={
          `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        } onClick={func1}>
          {box1}
        </Col>
        <Col className={
          `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        } onClick={func2}>
          {box2}
        </Col>
      </Row>
      <Row className="flex-fill mb-3">
        <Col className={
          `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        } onClick={func3}>
          {box3}
        </Col>
        <Col className={
          `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        } onClick={func4}>
          {box4}
        </Col>
      </Row>
    </div>
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
function EditModeBox({box}: {box: Boxes}) {

  const appState = useContext(AppState)

  return (
    <div className="d-flex w-100 h-100 align-items-center justify-content-center">
      <Dropdown drop="down-centered">
      <style>
          {
            `
            .dropdown-toggle.edit-mode-toggle::after {
              display: none !important;
            }
            `
          }
        </style>

        <Dropdown.Toggle className="edit-mode-toggle flashcard-button d-flex align-items-center">
          <span className="material-symbols-outlined">edit</span>
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
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

/**
 * React component used to render the card display of the app. The card display 
 * renders the currently visible side of the currently visible flashcard.
 * @returns card display, as a JSX element.
 */
function CardDisplay() {

  const appState = useContext(AppState)
  const appMode = appState.appMode

  if (!appState.deck) {
    return <NoDeckOpenedMessage />
  }

  
  const visibleCard = appState.deck.cards[appState.visibleCardIndex]
  const visibleFace = (appState.visibleSide === Side.FRONT) ?
    visibleCard.front : visibleCard.back

  const [box1, box2, box3, box4] = [
    visibleFace.box1,
    visibleFace.box2,
    visibleFace.box3,
    visibleFace.box4,
  ].map((box, index) => {
    if (appState.appMode === AppMode.EDITING_DECK && box === null) {
      return <EditModeBox box={(() => {
        switch (index) {
          case 0: return Boxes.BOX_1
          case 1: return Boxes.BOX_2
          case 2: return Boxes.BOX_3
          case 3: return Boxes.BOX_4
          default: throw new Error("Invalid box index; should be impossible")
        }
      })()} />
    } else if (box === null) {
      return <></>
    } else if (
      box.type === CardContentData.Type.TEXT && box.data && 
      (box as TextBox).data!.text
    ) {
      return <>{(box as TextBox).data!.text}</>
    } else if (
      box.type === CardContentData.Type.IMAGE
    ) {
      return <>Image</>
    } else if (
      box.type === CardContentData.Type.VIDEO_LINK
    ) {
      return <>Video</>
    } else {
      return <></>
    }
  })

  let jsx = <>Test</>
  switch (visibleFace.layout) {

    case CardLayout.ONE_BOX:
      jsx = box1 ? <OneBox appMode={appMode} box={box1} /> : <></>
      break

    case CardLayout.TWO_BOXES_V:
      jsx = box1 && box2 ?
       <TwoBoxesVertical appMode={appMode} box1={box1} box2={box2} /> : 
       <></>
      break
    case CardLayout.TWO_BOXES_H:
      jsx = box1 && box2 ?
       <TwoBoxesHorizontal appMode={appMode} box1={box1} box2={box2} /> :
       <></>
      break
    case CardLayout.ONE_BOX_LV_TWO_BOXES_RV:
      jsx = box1 && box2 && box3 ?
       <OneBoxLeftTwoBoxesRight appMode={appMode} 
       box1={box1} box2={box2} box3={box3} /> :
       <></>
      break
    case CardLayout.ONE_BOX_RV_TWO_BOXES_LV:
      jsx = box1 && box2 && box3 ?
       <OneBoxRightTwoBoxesLeft appMode={appMode}
        box1={box1} box2={box2} box3={box3} /> :
        <></>
      break
    case CardLayout.ONE_BOX_TH_TWO_BOXES_BH:
      jsx = box1 && box2 && box3 ?
       <OneBoxTopTwoBoxesBottom appMode={appMode}
        box1={box1} box2={box2} box3={box3} /> :
        <></>
      break
    case CardLayout.ONE_BOX_BH_TWO_BOXES_TH:
      jsx = box1 && box2 && box3 ?
       <OneBoxBottomTwoBoxesTop appMode={appMode}
        box1={box1} box2={box2} box3={box3} /> : 
        <></>
      break
    case CardLayout.FOUR_BOXES:
      jsx = box1 && box2 && box3 && box4 ?
       <FourBoxes appMode={appMode} 
        box1={box1} box2={box2} box3={box3} box4={box4} /> :
        <></>
      break
  }

  return (
    <div className="flashcard-display">
      {jsx}
    </div>
  )

}

export default CardDisplay