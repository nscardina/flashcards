import { useContext } from "react";
import { AppStateType } from "../../../state/AppState";
import { MSIcon } from "../../Icons";
import { AppState } from "../../../App";
import { UnableToOpenFileErrorDialog } from "./UnableToOpenFileErrorDialog";
import { Deck } from "../../../card/deck";

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
                <MSIcon name="file_open" />&nbsp;Upload Deck File...
            </label>
        </>
    )
}