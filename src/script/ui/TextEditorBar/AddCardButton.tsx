import { Button } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";
import { Card } from "../../card/Card";

export default function AddCardButton() {

    const appState = useContext(AppState);

    return (
        <Button className="flashcard-button" onClick={() => {
            console.log(appState.deck!.cards)
            if (
                appState.deck !== null
                && appState.visibleCardIndex >= 0
            ) {
                const cards = [
                    ...appState.deck.cards.slice(0, appState.visibleCardIndex + 1),
                    Card.makeDefault(),
                    ...appState.deck.cards.slice(appState.visibleCardIndex + 1)
                ];
                console.log(cards)

                appState.setDeck({
                    ...appState.deck,
                    cards: cards
                });
            }
        }}>
            <MaterialSymbol>add</MaterialSymbol>
        </Button>
    )
}
