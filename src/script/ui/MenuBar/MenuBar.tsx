import { Container, Dropdown, Image, Nav, Navbar } from "react-bootstrap"
import FileMenu from "./FileMenu/FileMenu"
import EditMenu from "./EditMenu"
import AppMode from "../../app/AppMode"
import { useContext } from "react"
import { AppState } from "../../App"
import styled from "styled-components"
import ViewMenu from "./ViewMenu"
import favicon from "../../../favicon/favicon.svg"

// https://github.com/react-bootstrap/react-bootstrap/issues/341
export const MenuDropdownToggle = styled(Dropdown.Toggle)`
  &::after {
    display: none;
  }
`

function MenuBar() {

  const appState = useContext(AppState)
  const appMode = appState.appMode

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Image src={favicon} alt="Flashcards Logo" height="32px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <FileMenu />
            <EditMenu disabled={false} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

  // return (
  //   <div className="d-flex flex-row">
  //       <FileMenu />
  //       <EditMenu disabled={appMode !== AppMode.EDITING_DECK} />
  //       <ViewMenu />

  //   </div>
  // )

  // return (
  //   <Container>
  //     <Row>
  //       <Col xs={{ span: 8, order: 1 }} md={{ span: 'auto', order: 1 }}
  //         className="d-flex flex-row"
  //       >
  //         <Col style={{ width: "min-content" }}><FileMenu /></Col>
  //         {appMode === AppMode.EDITING_DECK && (
  //           <>
  //             <Col style={{ width: "min-content" }}><EditMenu /></Col>
  //           </>
  //         )}

  //       </Col>
  //       <Col
  //         className="d-flex align-items-center justify-content-center"
  //         xs={{ span: 12, order: 4 }}
  //         md={{ span: 'auto', order: 2 }}
  //       >
  //         {(
  //           appMode === AppMode.MANAGING_FILES ||
  //           appMode === AppMode.EDITING_DECK
  //         ) && <AddCardButton />}

  //         {appMode === AppMode.MANAGING_FILES && <EditCardButton />}

  //         {(
  //           appMode === AppMode.MANAGING_FILES ||
  //           appMode === AppMode.EDITING_DECK
  //         ) && <DeleteCardButton />}

  //         <FlipCardButton />
  //       </Col>
  //       <Col
  //         xs={{ span: 12, order: 3 }}
  //         md={{ span: 2, order: 3 }}
  //         className="ms-auto d-flex justify-content-center align-items-center"
  //       >
  //         <span style={{ userSelect: 'none' }}
  //           onClick={appState.deck ? () => appState.setVisibleEditor(Editor.DECK_NAME) : () => { }}
  //         ><Latex>{appState.deck ? appState.deck.name : ""}</Latex>

  //         </span>

  //       </Col>
  //       <Col
  //         xs={{ span: 4, order: 2 }}
  //         md={{ span: 5, order: 4 }}
  //         className="d-flex justify-content-end"
  //       >
  //         {appMode === AppMode.MANAGING_FILES && (
  //           <SettingsMenu />
  //         )}
  //         {appMode === AppMode.MANAGING_FILES &&
  //           <ReviewDeckButton onClick={() => appState.setAppMode(AppMode.REVIEWING_DECK)} />
  //         }
  //         {(appMode === AppMode.EDITING_DECK || appMode === AppMode.REVIEWING_DECK) &&
  //           <DoneButton />
  //         }
  //       </Col>
  //     </Row>
  //   </Container>
  // )

}

export default MenuBar