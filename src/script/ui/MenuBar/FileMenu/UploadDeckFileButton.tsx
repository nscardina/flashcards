import { UnableToOpenFileErrorDialog } from "./UnableToOpenFileErrorDialog";
import { Deck } from "../../../card/deck";
import { KeyboardShortcuts } from "../../KeyboardShortcuts";
import MaterialSymbol from "../../MaterialSymbol";
import { useFCState } from "../../../state/FCState";

export default function UploadDeckFileButton() {

    const setDeck = useFCState(state => state.setDeck);
    const setVisibleCardIndex = useFCState(state => state.setVisibleCardIndex);
    const setCurrentDialog = useFCState(state => state.setCurrentDialog);

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
                                setDeck(deck)
                                setVisibleCardIndex(0)
                            } else {
                                <UnableToOpenFileErrorDialog errMessage="Selected file is not a valid deck file." />
                            }
                        } catch (e) {
                            setCurrentDialog(
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