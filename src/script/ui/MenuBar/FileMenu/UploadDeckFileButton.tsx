import { useContext } from "react";
import { AppStateType } from "../../../state/AppState";
import { MSIcon } from "../../Icons";
import { AppState } from "../../../App";

export default function UploadDeckFileButton() {

    const appState = useContext(AppState)

    return (
        <>
            <input
                type="file"
                id={"test"}

                accept=".deck"
                className="visually-hidden"

                onChange={async(event) => {
                    if (event.target.files !== null && 
                        event.target.files.length > 0
                    ) {
                        try {
                            const deck = JSON.parse(await event.target.files[0].text())
                            appState.setDeck(deck)
                            appState.setVisibleCardIndex(0)
                        } catch (e) {
                            
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