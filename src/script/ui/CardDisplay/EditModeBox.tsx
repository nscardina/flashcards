import { Dropdown } from "react-bootstrap";
import { Side } from "../../card/side";
import { BoxNumber } from "../../card/Box";
import { CardContentData } from "../../card/CardContentData";
import { ParagraphElement } from "../types/block/ParagraphElement";
import { useFCState } from "../../state/FCState";

/**
 * React component which encapsulates the "edit mode box" functionality; that is, the pencil dropdown
 * menu that appears in edit mode when a particular box on a card has no content associated with it.
 * This component takes props which allow it to cause the text editor, image picker, or video URL
 * input box to show up.
 * @param param0 props.
 * @returns React component described above.
 */
export function EditModeBox({ side, box }: { side: Side, box: BoxNumber; }) {

  const visibleCardIndex = useFCState(state => state.visibleCardIndex);
  const setBoxOnCardFace = useFCState(state => state.setBoxOnCardFace);

  return (
    <div className="d-flex w-100 h-100 align-items-center justify-content-center">

      <Dropdown>
        <style style={{ display: "none" }}>
          {`
            .dropdown-toggle.edit-mode-toggle::after {
              display: none !important;
            }
            `}
        </style>

        <Dropdown.Toggle className="edit-mode-toggle flashcard-button d-flex align-items-center"
          style={{ display: "block" }}>
          <span className="material-symbols-outlined">edit</span>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ flexDirection: "column" }}>
          <Dropdown.Item as="button" className="flashcard-button d-flex align-items-center"
            onClick={() => {

              setBoxOnCardFace(
                visibleCardIndex,
                side,
                box,
                {
                  type: CardContentData.Type.TEXT,
                  textNodes: [ParagraphElement.makeDefault()]
                }
              )

              // appState.deck!.cards[appState.visibleCardIndex][side].box[box] = 
            }}>
            <span className="material-symbols-outlined">article</span>&nbsp;Text
          </Dropdown.Item>
          <Dropdown.Item as="button" className="flashcard-button d-flex align-items-center"
            onClick={() => {
              // changeEditor(appState, Editor.IMAGE, box);
            }}>
            <span className="material-symbols-outlined">image</span>&nbsp;Image
          </Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>
    </div>
  );
}
