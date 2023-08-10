import { Dropdown } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useRef } from "react"
import { addCard, newDeck } from "../state/Store"

function FileMenu() {

    const dispatch = useDispatch()

    const openDeckFileElement = useRef<HTMLInputElement>(null)

    return (
        <Dropdown className="d-inline-block">
              <Dropdown.Toggle className="flashcard-button border-0">
                File
              </Dropdown.Toggle>

              <Dropdown.Menu>

                <Dropdown.Item as="button" className="d-flex align-items-center" 
                  onClick={() => dispatch(newDeck())}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">add</span> &nbsp;New Deck
                </Dropdown.Item>

                <Dropdown.Item as="div" className="d-flex align-items-center ps-0 pe-0">
                  <label style={{position: 'absolute'}} htmlFor="deck_display" className="ps-3 pe-3 d-flex align-items-center">
                    <span className="material-symbols-outlined" aria-hidden="true">file_open</span> &nbsp;Open Deck...
                  </label>
                  <input ref={openDeckFileElement} type="file" id="deck_display" className="w-100 h-100 d-flex" style={{opacity: 0}} 
                  
                  />
                </Dropdown.Item>

                <Dropdown.Item className="d-flex align-items-center">
                  <span className="material-symbols-outlined" aria-hidden="true">menu_open</span> &nbsp;Open Recent...
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item className="d-flex align-items-center">
                  <span className="material-symbols-outlined" aria-hidden="true">close</span> &nbsp;Close Deck
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <span className="material-symbols-outlined" aria-hidden="true">download</span> &nbsp;Save Deck As...
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <span className="material-symbols-outlined" aria-hidden="true">title</span> &nbsp;Rename Deck...
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
    )

}

export default FileMenu