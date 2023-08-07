import { Col, Container, Dropdown, Row } from "react-bootstrap"
import CardLayout from "./cardlayout"
import { useDispatch, useSelector } from "react-redux"
import { Side } from "./side"
import { selectAppMode, selectDeck, selectVisibleCardIndex, selectVisibleSide, setVisibleEditor } from "../state/Store"
import AppMode from "../app/AppMode"
import { Editor } from "../app/Editor"
import { CardContentType,  TextBox } from "./box"

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
  return (
    <div className={
      `w-100 h-100 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
    }>
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
  return (
    <Row className="h-100">
      <Col className={
        `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      }>
        {box1}
      </Col>
      <Col className={
        `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      }>
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
  return (
    <Container className="h-100 d-flex flex-column">
      <Row className={
        `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      }>
        {box1}
      </Row>
      <Row className={
        `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      }>
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
  return (
    <Row className="h-100">
      <Col className={
        `h-100 ms-3 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      }>
        {box1}
      </Col>
      <Col className="h-100 align-items-center">
        <Container className="h-100 d-flex flex-column">
          <Row className={
            `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
          }>
            {box2}
          </Row>
          <Row className={
            `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
          }>
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
  return (
    <Row className="h-100">
      <Col className="h-100 align-items-center">
        <Container className="h-100 d-flex flex-column">
          <Row className={
            `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
          }>
            {box1}
          </Row>
          <Row className={
            `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
          }>
            {box2}
          </Row>
        </Container>
      </Col>
      <Col className={
        `h-100 ms-3 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      }>
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
  return (
    <Container className="h-100 d-flex flex-column">
      <Row className={
        `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      }>
        {box1}
      </Row>
      <Row className="flex-fill mt-2">
        <Col className={
          `me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        }>
          {box2}
        </Col>
        <Col className={
          `me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        }>
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
  return (
    <Container className="h-100 d-flex flex-column">
      <Row className="flex-fill mt-2">
        <Col className={
          `me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        }>
          {box1}
        </Col>
        <Col className={
          `me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        }>
          {box2}
        </Col>
      </Row>
      <Row className={
        `flex-fill mb-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
      }>
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
  return (
    <div className="h-100 d-flex flex-column">
      <Row className="flex-fill mb-3">
        <Col className={
          `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        }>
          {box1}
        </Col>
        <Col className={
          `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        }>
          {box2}
        </Col>
      </Row>
      <Row className="flex-fill mb-3">
        <Col className={
          `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        }>
          {box3}
        </Col>
        <Col className={
          `ms-2 me-2 ${appMode === AppMode.EDITING_DECK && 'border rounded'}`
        }>
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
function EditModeBox() {

  const dispatch = useDispatch()

  return (
    <div className="d-flex w-100 h-100 align-items-center justify-content-center">
      <Dropdown drop="down-centered">
        <Dropdown.Toggle className="flashcard-button d-flex align-items-center">
          <span className="material-symbols-outlined">edit</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <style>
            {`
                            .dropdown-toggle::after {
                                display: none !important;
                            }
                        `}
          </style>
          <Dropdown.Item as="button" className="flashcard-button d-flex align-items-center"
            onClick={() => dispatch(setVisibleEditor(Editor.TEXT))}>
            <span className="material-symbols-outlined">article</span>&nbsp;Text
          </Dropdown.Item>
          <Dropdown.Item as="button" className="flashcard-button d-flex align-items-center">
            <span className="material-symbols-outlined">image</span>&nbsp;Image
          </Dropdown.Item>
          <Dropdown.Item as="button" className="flashcard-button d-flex align-items-center">
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

  const appMode = useSelector(selectAppMode)
  const deck = useSelector(selectDeck)
  const visibleSide = useSelector(selectVisibleSide)
  const visibleCardIndex = useSelector(selectVisibleCardIndex)

  if (!deck) {
    return <NoDeckOpenedMessage />
  }

  
  const visibleCard = deck.cards[visibleCardIndex]
  const visibleFace = (visibleSide === Side.FRONT) ?
    visibleCard.front : visibleCard.back

  const [box1, box2, box3, box4] = [
    visibleFace.box1,
    visibleFace.box2,
    visibleFace.box3,
    visibleFace.box4,
  ].map(box => {
    if (!box) {
      return <></>
    } else if (appMode === AppMode.EDITING_DECK) {
      return <EditModeBox />
    } else if (
      box.type === CardContentType.TEXT &&
      (box as TextBox).data.text
    ) {
      return <>{(box as TextBox).data.text}</>
    } else if (
      box.type === CardContentType.IMAGE
    ) {
      return <>Image</>
    } else if (
      box.type === CardContentType.VIDEO_LINK
    ) {
      return <>Video</>
    } else {
      return <></>
    }
  })

  let jsx = <>Test</>
  switch (visibleFace.layout) {

    case CardLayout.ONE_BOX:
      jsx = <OneBox appMode={appMode} box={box1} />
      break

    case CardLayout.TWO_BOXES_V:
      jsx = <TwoBoxesVertical appMode={appMode} box1={box1} box2={box2} />
      break
    case CardLayout.TWO_BOXES_H:
      jsx = <TwoBoxesHorizontal appMode={appMode} box1={box1} box2={box2} />
      break
    case CardLayout.ONE_BOX_LV_TWO_BOXES_RV:
      jsx = <OneBoxLeftTwoBoxesRight appMode={appMode}
        box1={box1} box2={box2} box3={box3} />
      break
    case CardLayout.ONE_BOX_RV_TWO_BOXES_LV:
      jsx = <OneBoxRightTwoBoxesLeft appMode={appMode}
        box1={box1} box2={box2} box3={box3} />
      break
    case CardLayout.ONE_BOX_TH_TWO_BOXES_BH:
      jsx = <OneBoxTopTwoBoxesBottom appMode={appMode}
        box1={box1} box2={box2} box3={box3} />
      break
    case CardLayout.ONE_BOX_BH_TWO_BOXES_TH:
      jsx = <OneBoxBottomTwoBoxesTop appMode={appMode}
        box1={box1} box2={box2} box3={box3} />
      break
    case CardLayout.FOUR_BOXES:
      jsx = <FourBoxes appMode={appMode} 
        box1={box1} box2={box2} box3={box3} box4={box4} />
      break
  }

  return (
    <div className="flashcard-display">
      {jsx}
    </div>
  )

}

export default CardDisplay