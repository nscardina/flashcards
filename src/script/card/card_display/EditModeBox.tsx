import { Dropdown } from "react-bootstrap";
import { Editor } from "../../app/Editor";
import { BoxNumber } from "../Box";
import { useContext } from "react";
import { AppState } from "../../App";
import { changeEditor } from "../../state/AppState";

/**
 * React component which encapsulates the "edit mode box" functionality; that is, the pencil dropdown
 * menu that appears in edit mode when a particular box on a card has no content associated with it.
 * This component takes props which allow it to cause the text editor, image picker, or video URL
 * input box to show up.
 * @param param0 props.
 * @returns React component described above.
 */
export function EditModeBox({ box }: { box: BoxNumber; }) {

  const appState = useContext(AppState);

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
              changeEditor(appState, Editor.PLAIN_TEXT, box);
            }}>
            <span className="material-symbols-outlined">article</span>&nbsp;Text
          </Dropdown.Item>
          <Dropdown.Item as="button" className="flashcard-button d-flex align-items-center"
            onClick={() => {
              changeEditor(appState, Editor.IMAGE, box);
            }}>
            <span className="material-symbols-outlined">image</span>&nbsp;Image
          </Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>
    </div>
  );
}
