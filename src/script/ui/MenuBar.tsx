import { Col, Container, Row } from "react-bootstrap"
import FileMenu from "./FileMenu"
import EditMenu from "./EditMenu"
import { AddCardButton, DeleteCardButton, EditCardButton, EditingDoneButton, ReviewDeckButton } from "./Buttons"
import AppMode from "../app/AppMode"
import { useDispatch, useSelector } from "react-redux"
import { renameDeck, selectAppMode, selectDeck, setVisibleEditor } from "../state/Store"
import SettingsMenu from "./SettingsMenu"
import { Editor } from "../app/Editor"



function MenuBar() {

  const appMode = useSelector(selectAppMode)
  const deck = useSelector(selectDeck)

  const dispatch = useDispatch()

  return (
    <Container>
      <Row>
        <Col xs={{ span: 8, order: 1 }} md={{ span: 'auto', order: 1 }}
          className="d-flex flex-row"
        >
          <Col style={{ width: "min-content" }}><FileMenu /></Col>
          {appMode === AppMode.EDITING_DECK && (
            <>
              {/* <Col style={{ width: "min-content" }}><EditMenu /></Col> */}
              <Col style={{ width: "min-content" }}><EditMenu /></Col>
            </>
          )}

        </Col>
        <Col
          className="d-flex align-items-center justify-content-center"
          xs={{ span: 12, order: 4 }}
          md={{ span: 'auto', order: 2 }}
        >
          {(
            appMode === AppMode.MANAGING_FILES ||
            appMode === AppMode.EDITING_DECK
          ) && <AddCardButton /> }

          {appMode === AppMode.MANAGING_FILES && <EditCardButton />}

          {(
            appMode === AppMode.MANAGING_FILES ||
            appMode === AppMode.EDITING_DECK
          ) && <DeleteCardButton /> }
        </Col>
        <Col
          xs={{ span: 12, order: 3 }}
          md={{ span: 2, order: 3 }}
          className="ms-auto d-flex justify-content-center align-items-center"
        >
          <span style={{userSelect: 'none'}} 
            onClick={() => dispatch(setVisibleEditor(Editor.DECK_NAME))}
          >
            {deck && deck.name}
          </span>
          
        </Col>
        <Col
          xs={{ span: 4, order: 2 }}
          md={{ span: 5, order: 4 }}
          className="d-flex justify-content-end"
        >
          {appMode === AppMode.MANAGING_FILES && (
            <SettingsMenu />
          )}
          {appMode === AppMode.MANAGING_FILES &&
            <ReviewDeckButton onClick={() => null} />
          }
          {appMode === AppMode.EDITING_DECK &&
            <EditingDoneButton />
          }
        </Col>
      </Row>
    </Container>
  )

}

export default MenuBar