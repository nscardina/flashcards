import { Container, Navbar } from "react-bootstrap"
import FileMenu from "./FileMenu"
import EditMenu from "./EditMenu"
import { AddCardButton, DeleteCardButton, EditCardButton, DoneButton, FlipCardButton, ReviewDeckButton } from "./Buttons"
import AppMode from "../app/AppMode"
import SettingsMenu from "./SettingsMenu"
import { Editor } from "../app/Editor"
import { useContext } from "react"
import { AppState } from "../App"
import Latex from "react-latex-next"
import { makeReviewOrderProvider } from "../ReviewOrder"



function MenuBar() {

  const appState = useContext(AppState)

  const appMode = appState.appMode

  return (
    <Navbar expand="sm" style={{
      paddingTop: "0px", paddingBottom: "0px", width: "100vw",
    }} collapseOnSelect>
      <style>{`
      
.container {
    max-width: 100% !important;
}
      `}</style>
      <Container style={{ justifyContent: "normal" }}>
        <object
          style={{
            height: "32px",
            width: "min-content",
          }}
          className="ms-1 mt-1"

          data="/flashcards/favicon/favicon.svg" type="image/svg+xml">
          <img src="/flashcards/favicon/favicon.png" />
        </object>

        <span style={{ userSelect: 'none', width: "min-content" }}
          onClick={appState.deck ? () => appState.setVisibleEditor(Editor.DECK_NAME) : () => { }}
        ><Latex>{appState.deck ? appState.deck.name : ""}</Latex>

        </span>
        <FileMenu />
        <EditMenu />
        <Navbar.Toggle aria-controls="menu-collapse" className="ms-auto" />






        {appMode === AppMode.MANAGING_FILES &&
          <ReviewDeckButton onClick={() => {
            appState.setAppMode(AppMode.REVIEWING_DECK);

            const reviewOrderProvider = makeReviewOrderProvider(appState.reviewOrder)(appState.deck?.cards.length ?? 0)

            appState.setReviewOrderProvider(reviewOrderProvider);
            const peekValue = reviewOrderProvider.peek().value
            if (typeof(peekValue) === "number") {
              appState.setVisibleCardIndex(peekValue);
            }
            appState.setReviewOrderProviderNextValue(reviewOrderProvider.next());
          }} />
        }
        {(appMode === AppMode.EDITING_DECK || appMode === AppMode.REVIEWING_DECK) &&
          <DoneButton />
        }

        <Navbar.Collapse id="menu-collapse" style={{ flexDirection: "row" }}>
          <AddCardButton />
          <EditCardButton />
          <DeleteCardButton />
          <FlipCardButton />
          <SettingsMenu />
        </Navbar.Collapse>
      </Container>


    </Navbar>
  )

}

export default MenuBar