import { useContext } from "react";
import { AppState } from "../../../App";
import Dialog from "../../../app/Dialog";
import AppMode from "../../../app/AppMode";
import { Deck } from "../../../card/deck";
import CustomMenuItem from "../CustomMenuItem";
import { KeyboardShortcuts } from "../../KeyboardShortcuts";

export function NewDeckButton() {

  const appState = useContext(AppState);

  const createNewDeck = () => {
    // If a deck is already open, display the NEW_DECK_CONFIRMATION_MESSAGE 
    // to make sure that the user doesn't lose data. Switch the app mode to 
    // EDITING_DECK.
    if (appState.deck !== null) {
      appState.setVisibleDialog(Dialog.NEW_DECK_CONFIRMATION_MESSAGE);
      appState.setAppMode(AppMode.EDITING_DECK);
      appState.setVisibleCardIndex(0);
    }



    // Otherwise, create a new empty deck and switch to EDITING_DECK mode, and 
    // set the only card in the new deck to be visible.
    else {
      appState.setDeck(Deck.makeDefault());
      appState.setVisibleCardIndex(0);
      appState.setAppMode(AppMode.EDITING_DECK);
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
