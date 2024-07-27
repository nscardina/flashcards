import CustomMenuItem from "../CustomMenuItem";
import Dialog from "../../../app/Dialog";
import { useFCState } from "../../../state/FCState";
import { useShallow } from "zustand/react/shallow";

export function CloseDeckButton() {
    
  const deck = useFCState(useShallow(state => state.deck));
  const setVisibleDialog = useFCState(state => state.setVisibleDialog);

    return (
        <CustomMenuItem
        as="div"
        className="d-flex align-items-center"
        disabled={deck === null}
        onClick={() => setVisibleDialog(Dialog.DELETE_DECK_CONFIRMATION_MESSAGE)}
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