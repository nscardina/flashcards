import { Dropdown } from "react-bootstrap"
import { useDispatch } from "react-redux"
import CardLayout from "../card/cardlayout"
import { changeCardLayout } from "../state/deck_actions"

function EditMenu() {

  const dispatch = useDispatch()

  return (
    <Dropdown className="d-inline-block">
      <Dropdown.Toggle className="flashcard-button border-0">
        Edit
      </Dropdown.Toggle>

      <Dropdown.Menu>
          <Dropdown drop="end">
            <Dropdown.Toggle className="flashcard-button border-0 d-flex align-items-center">
            <span className="material-symbols-outlined" aria-hidden="true">
            gallery_thumbnail
          </span> &nbsp;Change Layout
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => {
                dispatch(changeCardLayout(CardLayout.ONE_BOX))
              }}>
                One box
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                dispatch(changeCardLayout(CardLayout.TWO_BOXES_V))
              }}>
                Two vertical boxes
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                dispatch(changeCardLayout(CardLayout.TWO_BOXES_H))
              }}>
                Two horizontal boxes
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                dispatch(changeCardLayout(CardLayout.FOUR_BOXES))
              }}>
                Four boxes
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                dispatch(changeCardLayout(CardLayout.ONE_BOX_LV_TWO_BOXES_RV))
              }}>
                One vertical box on left, two horizontal boxes on right
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                dispatch(changeCardLayout(CardLayout.ONE_BOX_RV_TWO_BOXES_LV))
              }}>
                One vertical box on right, two horizontal boxes on left
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                dispatch(changeCardLayout(CardLayout.ONE_BOX_TH_TWO_BOXES_BH))
              }}>
                One horizontal box on top, two vertical boxes on bottom
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                dispatch(changeCardLayout(CardLayout.ONE_BOX_BH_TWO_BOXES_TH))
              }}>
                One horizontal box on bottom, two vertical boxes on top
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
      </Dropdown.Menu>
    </Dropdown>
  )

}

export default EditMenu