import { useContext } from "react";
import { AppStateType } from "../../../state/AppState"
import { MSIcon } from "../../Icons";
import { AppState } from "../../../App";
import { UnableToOpenFileErrorDialog } from "./UnableToOpenFileErrorDialog";
import { Deck } from "../../../card/deck";
import { KeyboardShortcuts } from "../../KeyboardShortcuts";
import CustomMenuItem from "../CustomMenuItem";
import MaterialSymbol from "../../MaterialSymbol";

export default function UploadDeckFileButton() {

    const appState = useContext(AppState)

    return (
    <>
            <input
                type="file"
                id={"test"}

                accept=".deck"
                className="visually-hidden"

                onChange={async (event) => {
                    if (event.target.files !== null &&
                        event.target.files.length > 0
                    ) {
                        try {
                            const deck = JSON.parse(await event.target.files[0].text())
                            if (Deck.isDeck(deck)) {
                                appState.setDeck(deck)
                                appState.setVisibleCardIndex(0)
                            } else {
                                <UnableToOpenFileErrorDialog errMessage="Selected file is not a valid deck file." />
                            }
                        } catch (e) {
                            appState.setCurrentDialog(
                                <UnableToOpenFileErrorDialog errMessage="Selected file is not a valid deck file." />
                            )
                        }
                    }
                }}

            />
            <label
                htmlFor={"test"}
                className="d-flex align-items-center dropdown-item"
                style={{ pointerEvents: "all" }}
            >
                <MaterialSymbol className="me-2">file_open</MaterialSymbol>
                <span>Upload Deck File...</span>
                <span className="ms-auto ps-4 text-muted">{KeyboardShortcuts.uploadDeckFile()}</span>

            </label>
            </>
    )
}