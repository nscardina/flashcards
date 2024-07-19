import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { useFCState } from "../../state/FCState";


export default function MoveCardBackwardsButton() {

    // DO NOT MAKE SHALLOW!
    const deck = useFCState(state => state.deck);
    const setCards = useFCState(state => state.setCards);

    const visibleCardIndex = useFCState(state => state.visibleCardIndex);

    return (
        <OverlayTrigger overlay={<Tooltip>View Previous Card</Tooltip>}>
            <Button
                style={(deck === null
                    || deck.cards.length > 0) ? {
                    pointerEvents: "none",
                    color: (deck === null) ? "var(--bs-secondary)" : "inherit",
                } : {}}
                className="flashcard-button" disabled={
                    deck === null
                    || deck.cards.length > 0
                } onClick={() => {
                    if (
                        deck !== null
                        && deck.cards.length >= 2
                        && visibleCardIndex >= 0
                        && visibleCardIndex < deck.cards.length
                    ) {
                        const cards = [...deck.cards];
                        if (visibleCardIndex === 0) {
                            const temp = cards[0];
                            cards[0] = cards.at(-1)!;
                            cards[cards.length - 1] = temp;
                        } else {
                            const temp = cards[visibleCardIndex];
                            cards[visibleCardIndex] = cards[visibleCardIndex - 1];
                            cards[visibleCardIndex - 1] = temp;
                        }

                        setCards(cards);
                    }
                }}>
                <MaterialSymbol>arrow_back</MaterialSymbol>
            </Button>
        </OverlayTrigger>
    );
}