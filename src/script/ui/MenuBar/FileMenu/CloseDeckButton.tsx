import { useContext } from "react";
import { AppState } from "../../../App";
import CustomMenuItem from "../CustomMenuItem";
import Dialog from "../../../app/Dialog";

export function CloseDeckButton() {
    const appState = useContext(AppState);

    return (
        <CustomMenuItem
        as="div"
        className="d-flex align-items-center"
        disabled={appState.deck === null}
        onClick={() => appState.setVisibleDialog(Dialog.DELETE_DECK_CONFIRMATION_MESSAGE)}
        style={{
          cursor: "pointer",
          pointerEvents: "all"
        }}

        icon="close"
        body={<span>Close Deck...</span>}
        // keyboardShortcut={KeyboardShortcuts.closeDeck()}
      >
      </CustomMenuItem>
    )
}