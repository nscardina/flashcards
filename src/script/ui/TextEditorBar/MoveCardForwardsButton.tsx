import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { useContext } from "react";
import { AppState } from "../../App";


export default function MoveCardForwardsButton() {

    const appState = useContext(AppState);

    return (
        <OverlayTrigger overlay={<Tooltip placement="bottom-end">View Next Card</Tooltip>}>
            <span>
                <Button
                    style={(appState.deck === null
                        || appState.deck.cards.length > 0) ? {
                        pointerEvents: "none"
                    } : {}}
                    className="flashcard-button" disabled={
                        appState.deck === null
                        || appState.deck.cards.length > 0
                    } onClick={() => {
                        if (
                            appState.deck !== null
                            && appState.deck.cards.length >= 2
                            && appState.visibleCardIndex >= 0
                            && appState.visibleCardIndex < appState.deck.cards.length
                        ) {
                            const cards = [...appState.deck.cards];
                            if (appState.visibleCardIndex === cards.length - 1) {
                                const temp = cards[cards.length - 1];
                                cards[cards.length - 1] = cards[0];
                                cards[0] = temp;
                            } else {
                                const temp = cards[appState.visibleCardIndex];
                                cards[appState.visibleCardIndex] = cards[appState.visibleCardIndex + 1];
                                cards[appState.visibleCardIndex + 1] = temp;
                            }

                            appState.setDeck({
                                ...appState.deck,
                                cards: cards
                            });
                        }
                    }}>
                    <MaterialSymbol>arrow_forward</MaterialSymbol>
                </Button>
            </span>
        </OverlayTrigger>
    )
}