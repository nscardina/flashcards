import { Col, Container, Row } from "react-bootstrap"
import FileMenu from "./FileMenu"
import EditMenu from "./EditMenu"
import { AddCardButton, DeleteCardButton, EditCardButton, EditingDoneButton, ReviewDeckButton } from "./Buttons"
import AppMode from "../app/AppMode"
import SettingsMenu from "./SettingsMenu"
import { Editor } from "../app/Editor"
import { useContext } from "react"
import { AppState } from "../App"



function MenuBar() {

  const appState = useContext(AppState)

  const appMode = appState.appMode

  return (
    <Container>
      <Row>
        <Col xs={{ span: 8, order: 1 }} md={{ span: 'auto', order: 1 }}
          className="d-flex flex-row"
        >
          <Col style={{ width: "min-content" }}><FileMenu /></Col>
          {appMode === AppMode.EDITING_DECK && (
            <>
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
            onClick={() => appState.setVisibleEditor(Editor.DECK_NAME)}
          >
            {appState.deck && appState.deck.name}
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