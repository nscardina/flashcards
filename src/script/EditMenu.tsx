import { Dropdown } from "react-bootstrap"

function EditMenu() {

    return (
        <Dropdown className="d-inline-block">
            <Dropdown.Toggle className="flashcard-button border-0">
                Edit
            </Dropdown.Toggle>
        </Dropdown>
    )

}

export default EditMenu