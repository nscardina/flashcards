import { Dropdown } from "react-bootstrap"
import { useContext} from "react"
import { downloadDeck } from "../file/CardFile"
import { FileWithHandle, fileOpen } from "browser-fs-access"
import { AppState } from "../App"
import { AppStateType } from "../state/AppState"
import Dialog from "../app/Dialog"
import AppMode from "../app/AppMode"
import { makeEmptyDeck } from "../card/deck"
import { MSIcon } from "./Icons"

function createNewDeck(state: AppStateType): void {
  // If a deck is already open, display the NEW_DECK_CONFIRMATION_MESSAGE 
  // to make sure that the user doesn't lose data. Switch the app mode to 
  // EDITING_DECK.
  if (state.deck !== null) {
    state.setVisibleDialog(Dialog.NEW_DECK_CONFIRMATION_MESSAGE)
    state.setAppMode(AppMode.EDITING_DECK)
  } 
  
  // Otherwise, create a new empty deck and switch to EDITING_DECK mode, and 
  // set the only card in the new deck to be visible.
  else {
    state.setDeck(makeEmptyDeck())
    state.setVisibleCardIndex(0)
    state.setAppMode(AppMode.EDITING_DECK)
  }
}

async function loadDeckFile(state: AppStateType, file: FileWithHandle): 
Promise<void> {
  if (state.recentFiles.length > 9) {
    state.setRecentFiles(state.recentFiles.slice(state.recentFiles.length - 9))
  }
  if (file.handle !== undefined) {
    state.recentFiles.push(file.handle)
  }
  state.setDeck(JSON.parse(await file.text()))
}


function FileMenu() {

  const appState = useContext(AppState)

  return (
    <Dropdown className="d-inline-block">
      <Dropdown.Toggle className="flashcard-button border-0">
        File
      </Dropdown.Toggle>

      <Dropdown.Menu>

        <Dropdown.Item
          as="button"
          className="d-flex align-items-center"
          onClick={() => createNewDeck(appState)}
        >
          <MSIcon name="add" />&nbsp;New Deck
        </Dropdown.Item>

        <Dropdown.Item
          as="div"
          className="d-flex align-items-center"
          onClick={async () => {
            const file = await fileOpen({
              extensions: [".deck"]
            })
            loadDeckFile(appState, file)
          }}
        >
          <MSIcon name="file_open" />&nbsp;Open Deck...
        </Dropdown.Item>

        <Dropdown drop="end" className="dropdown-item ps-1 pe-1 pt-0 pb-0">
          <Dropdown.Toggle style={{ border: "0px black" }} className="d-flex align-items-center flashcard-button w-100 btn-block">
            <span className="w-100 d-block align-items-center d-flex">
              <MSIcon name="menu_open" />
              &nbsp;Open Recent...
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {
              appState.recentFiles.map(file => (
                <Dropdown.Item>
                  {file.name} Test
                </Dropdown.Item>
              ))
            }
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown.Divider />

        <Dropdown.Item className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">close</span> &nbsp;Close Deck
        </Dropdown.Item>
        <Dropdown.Item
          onClick={appState.deck !== null ? 
            () => downloadDeck(appState.deck!) : () => { }
          }
          className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">download</span> &nbsp;Download .deck file...
        </Dropdown.Item>
        <Dropdown.Item className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">title</span> &nbsp;Rename Deck...
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )

}

export default FileMenu