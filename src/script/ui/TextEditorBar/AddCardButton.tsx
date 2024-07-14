import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";
import { Card } from "../../card/Card";

export default function AddCardButton() {

    const appState = useContext(AppState);

    return (
        <OverlayTrigger overlay={<Tooltip>Add Card</Tooltip>}>
            <Button
                disabled={appState.deck === null}
                style={{color: (appState.deck === null) ? "var(--bs-secondary)" : "inherit"}}
                className="flashcard-button" onClick={() => {
                    if (
                        appState.deck !== null
                        && appState.visibleCardIndex >= 0
                    ) {
                        const cards = [
                            ...appState.deck.cards.slice(0, appState.visibleCardIndex + 1),
                            Card.makeDefault(),
                            ...appState.deck.cards.slice(appState.visibleCardIndex + 1)
                        ];

                        appState.setDeck({
                            ...appState.deck,
                            cards: cards
                        });
                    }
                }}>
                <MaterialSymbol>add</MaterialSymbol>
            </Button>
        </OverlayTrigger>
    )
}
