import { Dropdown } from "react-bootstrap"
import CardLayout from "../../card/cardlayout"
import { AppStateType } from "../../state/AppState"
import { AppState } from "../../App"
import { useContext } from "react"
import { Side } from "../../card/side"
import { MenuDropdownToggle } from "./MenuBar"

function changeCardLayout(state: AppStateType, layout: CardLayout): void {
  if (state.deck !== null && state.deck.cards.length > 0) {
    const updatedCard = (state.visibleSide === Side.FRONT) ? {
      front: {
        ...state.deck.cards[state.visibleCardIndex].front,
        layout: layout
      },
      back: state.deck.cards[state.visibleCardIndex].back,
    } :  {
      front: state.deck.cards[state.visibleCardIndex].front,
      back: {
        ...state.deck.cards[state.visibleCardIndex].back,
        layout: layout
      }
    }

    state.setDeck({
      name: state.deck.name,
      cards: [
        ...state.deck.cards.slice(0, state.visibleCardIndex),
        updatedCard,
        ...state.deck.cards.slice(state.visibleCardIndex + 1)
      ]
    })
    
  }
}

function EditMenu({ disabled }: { disabled: boolean }) {

  const appState = useContext(AppState)

  return (
    <Dropdown>
      <MenuDropdownToggle disabled={disabled} className="flashcard-button border-0">
        Edit
      </MenuDropdownToggle>

      <Dropdown.Menu>
        <Dropdown drop="end">
          <Dropdown.Toggle className="flashcard-button border-0 d-flex align-items-center">
            <span className="material-symbols-outlined" aria-hidden="true">
              gallery_thumbnail
            </span> &nbsp;Change Layout
          </Dropdown.Toggle>

          <Dropdown.Menu>

            <Dropdown.Item onClick={() => {
              changeCardLayout(appState, CardLayout.ONE_BOX)
            }}>
              One box
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              changeCardLayout(appState, CardLayout.TWO_BOXES_V)
            }}>
              Two vertical boxes
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              changeCardLayout(appState, CardLayout.TWO_BOXES_H)
            }}>
              Two horizontal boxes
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              changeCardLayout(appState, CardLayout.FOUR_BOXES)
            }}>
              Four boxes
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              changeCardLayout(appState, CardLayout.ONE_BOX_LV_TWO_BOXES_RV)
            }}>
              One vertical box on left, two horizontal boxes on right
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              changeCardLayout(appState, CardLayout.ONE_BOX_RV_TWO_BOXES_LV)
            }}>
              One vertical box on right, two horizontal boxes on left
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              changeCardLayout(appState, CardLayout.ONE_BOX_TH_TWO_BOXES_BH)
            }}>
              One horizontal box on top, two vertical boxes on bottom
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              changeCardLayout(appState, CardLayout.ONE_BOX_BH_TWO_BOXES_TH)
            }}>
              One horizontal box on bottom, two vertical boxes on top
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown.Item onClick={() => {
          
        }}>
          Undo
        </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  )

}

export default EditMenu