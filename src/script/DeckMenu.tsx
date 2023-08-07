import { Dropdown } from "react-bootstrap"

function DeckMenu() {

    return (
        <Dropdown className="d-inline-block">
            <Dropdown.Toggle className="flashcard-button border-0">
                Deck
            </Dropdown.Toggle>
        </Dropdown>
    )

}

export default DeckMenu