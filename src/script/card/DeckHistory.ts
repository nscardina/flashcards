import { Deck } from "./deck"

enum DeckEditEventType {
    ADD_CARD = "addition of card",
}

type AddCardEventData = {
    addCardAtIndex: number
}

function DeckAddCardEvent(addCardAtIndex: number): 
DeckEditEvent<DeckEditEventType.ADD_CARD> {
    return {
        type: DeckEditEventType.ADD_CARD,
        data: {
            addCardAtIndex: addCardAtIndex
        }
    }
}


type DeckEditEvent<T extends DeckEditEventType> = {
    type: T,
    data: T extends DeckEditEventType.ADD_CARD ? AddCardEventData
        : never
}

type DeckHistory = {
    data: Deck,
    events: DeckEditEvent<any>[]
}

export {
    DeckAddCardEvent,
}

export type {
    DeckHistory
}