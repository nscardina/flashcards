import { Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useRef } from "react"
import { selectDeck } from "../state/Store"
import { downloadDeck } from "../file/CardFile"
import { fileOpen } from "browser-fs-access"
import { setDeck } from "../state/setters"
import { createNewDeck } from "../state/deck_actions"

function FileMenu() {

  const dispatch = useDispatch()

  const openDeckFileElement = useRef<HTMLInputElement>(null)
  const deck = useSelector(selectDeck)

  return (
    <Dropdown className="d-inline-block">
      <Dropdown.Toggle className="flashcard-button border-0">
        File
      </Dropdown.Toggle>

      <Dropdown.Menu>

        <Dropdown.Item
          as="button"
          className="d-flex align-items-center"
          onClick={() => dispatch(createNewDeck())}
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            add
          </span>
          &nbsp;New Deck
        </Dropdown.Item>

        <Dropdown.Item
          as="div"
          className="d-flex align-items-center"
          onClick={async () => {
            const file = await fileOpen({
              extensions: [".deck"]
            })
            dispatch(setDeck(JSON.parse(await file.text())))
          }}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            file_open
          </span>
          &nbsp;Open Deck...
        </Dropdown.Item>

        <Dropdown.Item className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">
            menu_open
          </span>
          &nbsp;Open Recent...
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">close</span> &nbsp;Close Deck
        </Dropdown.Item>
        <Dropdown.Item
          onClick={deck ? () => downloadDeck(deck) : () => { }}
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