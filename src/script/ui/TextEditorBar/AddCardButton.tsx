import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { Card } from "../../card/Card";
import { useFCState } from "../../state/FCState";

export default function AddCardButton() {

    const deck = useFCState(state => state.deck);
    const visibleCardIndex = useFCState(state => state.visibleCardIndex);
    const setCards = useFCState(state => state.setCards);

    return (
        <OverlayTrigger overlay={<Tooltip>Add Card</Tooltip>}>
            <Button
                disabled={deck === null}
                style={{color: (deck === null) ? "var(--bs-secondary)" : "inherit"}}
                className="flashcard-button" onClick={() => {
                    if (
                        deck !== null
                        && visibleCardIndex >= 0
                    ) {
                        const cards = [
                            ...deck.cards.slice(0, visibleCardIndex + 1),
                            Card.makeDefault(),
                            ...deck.cards.slice(visibleCardIndex + 1)
                        ];

                        setCards(cards);
                    }
                }}>
                <MaterialSymbol>add</MaterialSymbol>
            </Button>
        </OverlayTrigger>
    )
}
