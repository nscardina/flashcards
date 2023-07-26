import { Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { newDeck, selectDeck } from "./deck"

function FileMenu() {

    const dispatch = useDispatch()

    return (
        <Dropdown>
              <Dropdown.Toggle className="flashcard-button border-0">
                File
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as="button" className="d-flex align-items-center" onClick={() => dispatch(newDeck())}>
                  <span className="material-symbols-outlined" aria-hidden="true">add</span> &nbsp;New Deck
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <span className="material-symbols-outlined" aria-hidden="true">file_open</span> &nbsp;Open Deck...
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