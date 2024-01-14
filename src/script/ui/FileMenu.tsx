import { Dropdown } from "react-bootstrap"
import { useContext } from "react"
import { downloadDeck } from "../file/CardFile"
import { fileOpen } from "browser-fs-access"
import { AppState } from "../App"
import { AppStateType } from "../state/AppState"
import Dialog from "../app/Dialog"
import AppMode from "../app/AppMode"
import { MSIcon } from "./Icons"
import { Deck } from "../card/deck"
import { Editor } from "../app/Editor"

function NewDeckButton() {

  const appState = useContext(AppState)

  const createNewDeck = () => {
    // If a deck is already open, display the NEW_DECK_CONFIRMATION_MESSAGE 
    // to make sure that the user doesn't lose data. Switch the app mode to 
    // EDITING_DECK.
    if (appState.deck !== null) {
      appState.setVisibleDialog(Dialog.NEW_DECK_CONFIRMATION_MESSAGE)
      appState.setAppMode(AppMode.EDITING_DECK)
    }

    // Otherwise, create a new empty deck and switch to EDITING_DECK mode, and 
    // set the only card in the new deck to be visible.
    else {
      appState.setDeck(Deck.makeDefault())
      appState.setVisibleCardIndex(0)
      appState.setAppMode(AppMode.EDITING_DECK)
    }
  }

  return (
    <Dropdown.Item
      as="button"
      className="d-flex align-items-center"
      onClick={createNewDeck}
    >
      <MSIcon name="add" />&nbsp;New Deck
    </Dropdown.Item>
  )
}

async function loadDeckFile(
  state: AppStateType,
  fileText: string,
  fileHandle?: FileSystemFileHandle
): Promise<void> {
  if (state.recentFiles.length > 9) {
    state.setRecentFiles(state.recentFiles.slice(state.recentFiles.length - 9))
  }
  if (fileHandle !== undefined &&
    state.recentFiles.every(value => !value.isSameEntry(fileHandle))) {
    state.recentFiles.push(fileHandle)
  }
  const deck = JSON.parse(await fileText)
  state.setDeck(deck)
  state.setVisibleCardIndex(0)
}

function OpenDeckButton() {

  const appState = useContext(AppState)

  return (
    <Dropdown.Item
          as="div"
          className="d-flex align-items-center"
          onClick={async () => {
            const file = await fileOpen({
              extensions: [".deck"]
            })
            loadDeckFile(appState, await file.text(), file.handle)
          }}
        >
          <MSIcon name="file_open" />&nbsp;Open Deck...
        </Dropdown.Item>
  )
}





function FileMenu() {

  const appState = useContext(AppState)

  return (
    <Dropdown className="d-inline-block">
      <Dropdown.Toggle className="flashcard-button border-0">
        File
      </Dropdown.Toggle>

      <Dropdown.Menu>

        <NewDeckButton />
        <OpenDeckButton />

        <Dropdown drop="end" className={`${appState.recentFiles.length !== 0 ? "dropdown-item" : ""} ps-1 pe-1 pt-0 pb-0`}>

          <style>
            {`
            #open-recent-toggle-id:disabled {
              background-color: inherit;
            }

            .dropdown-item:has(> #open-recent-toggle-id):active {
              background-color: rgba(0, 0, 0, 0);
            }
            `}
          </style>

          <Dropdown.Toggle
            style={{ border: "0px black" }}
            className="d-flex align-items-center flashcard-button w-100 btn-block"
            disabled={appState.recentFiles.length === 0}
            id="open-recent-toggle-id"
          >
            <span className="w-100 d-block align-items-center d-flex">
              <MSIcon name="menu_open" />
              &nbsp;Open Recent...
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {
              appState.recentFiles.map(file => (
                <Dropdown.Item
                  key={`loadFile${file.name}`}
                  onClick={async () => {
                    const text = await file.getFile().then(file =>
                      file.text()
                    )
                    loadDeckFile(appState, text, file)
                  }}
                >
                  {file.name}
                </Dropdown.Item>
              ))
            }
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown.Divider />

        <Dropdown.Item
          as="button"
          className="d-flex align-items-center"
          onClick={
            () => {
              appState.setVisibleDialog(Dialog.DELETE_DECK_CONFIRMATION_MESSAGE)
            }
          }
          disabled={appState.deck === null}
        >
          <span className="material-symbols-outlined" aria-hidden="true">close</span> &nbsp;Close Deck
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={appState.deck !== null ?
            () => downloadDeck(appState.deck!) : () => { }
          }
          disabled={appState.deck === null}
          className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">download</span> &nbsp;Download .deck file...
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          className="d-flex align-items-center"
          disabled={appState.deck === null}
          onClick={
            () => {
              appState.setVisibleEditor(Editor.DECK_NAME)
            }
          }
        >
          <span className="material-symbols-outlined" aria-hidden="true">title</span> &nbsp;Rename Deck...
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )

}

export default FileMenu