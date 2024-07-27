import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { useFCState } from "../../state/FCState";
import { useShallow } from "zustand/react/shallow";


export default function MoveCardForwardsButton() {

    // DO NOT MAKE THIS SHALLOW!
    const deck = useFCState(state => state.deck);
    const setCards = useFCState(state => state.setCards);
    const visibleCardIndex = useFCState(useShallow(state => state.visibleCardIndex));

    return (
        <OverlayTrigger overlay={<Tooltip placement="bottom-end">View Next Card</Tooltip>}>
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
                        if (visibleCardIndex === cards.length - 1) {
                            const temp = cards[cards.length - 1];
                            cards[cards.length - 1] = cards[0];
                            cards[0] = temp;
                        } else {
                            const temp = cards[visibleCardIndex];
                            cards[visibleCardIndex] = cards[visibleCardIndex + 1];
                            cards[visibleCardIndex + 1] = temp;
                        }

                        setCards(cards);
                    }
                }}>
                <MaterialSymbol>arrow_forward</MaterialSymbol>
            </Button>
        </OverlayTrigger>
    )
}