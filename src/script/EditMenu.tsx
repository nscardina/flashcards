import { Dropdown } from "react-bootstrap"

function EditMenu() {

  return (
    <Dropdown className="d-inline-block">
      <Dropdown.Toggle className="flashcard-button border-0">
        Edit
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as="button" className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">
            cut
          </span> &nbsp;Cut
        </Dropdown.Item>

        <Dropdown.Item as="button" className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">
            content_copy
          </span> &nbsp;Copy
        </Dropdown.Item>

        <Dropdown.Item as="button" className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">
            content_paste
          </span> &nbsp;Paste
        </Dropdown.Item>

        <Dropdown.Item as="button" className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">
            delete
          </span> &nbsp;Delete
        </Dropdown.Item>

        <Dropdown.Item as="button" className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">
            select_all
          </span> &nbsp;Select All
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item as="button" className="d-flex align-items-center">
          <span className="material-symbols-outlined" aria-hidden="true">
            gallery_thumbnail
          </span> &nbsp;Change Layout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )

}

export default EditMenu