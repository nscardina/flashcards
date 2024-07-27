import Dialog from "../../../app/Dialog";
import AppMode from "../../../app/AppMode";
import { Deck } from "../../../card/deck";
import CustomMenuItem from "../CustomMenuItem";
import { KeyboardShortcuts } from "../../KeyboardShortcuts";
import { useFCState } from "../../../state/FCState";
import { useShallow } from "zustand/react/shallow";

export function NewDeckButton() {

  const [ deck, setDeck ] = useFCState(useShallow(state => [ state.deck, state.setDeck ]));
  const setVisibleDialog = useFCState(state => state.setVisibleDialog);
  const setAppMode = useFCState(state => state.setAppMode);
  const setVisibleCardIndex = useFCState(state => state.setVisibleCardIndex);

  const createNewDeck = () => {
    // If a deck is already open, display the NEW_DECK_CONFIRMATION_MESSAGE 
    // to make sure that the user doesn't lose data. Switch the app mode to 
    // EDITING_DECK.
    if (deck !== null) {
      setVisibleDialog(Dialog.NEW_DECK_CONFIRMATION_MESSAGE);
      setAppMode(AppMode.EDITING_DECK);
      setVisibleCardIndex(0);
    }



    // Otherwise, create a new empty deck and switch to EDITING_DECK mode, and 
    // set the only card in the new deck to be visible.
    else {
      setDeck(Deck.makeDefault());
      setVisibleCardIndex(0);
      setAppMode(AppMode.EDITING_DECK);
    }
  };

  return (
    <CustomMenuItem
      as="button"
      className="d-flex align-items-center"
      onClick={createNewDeck}

      icon="add"
      body={<>New Deck</>}
      keyboardShortcut={KeyboardShortcuts.newDeck()}
    />
  );
}
