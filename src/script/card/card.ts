import type { CardFace } from "./cardface"
import CardLayout from "./cardlayout"
import CardContentType from "./cardcontent"

export type Card = {
    frontFace: CardFace,
    backFace: CardFace
}

export const EMPTY_CARD: Card = {
    frontFace: {
        layout: CardLayout.ONE_BOX_BH_TWO_BOXES_TH,
        box1: {
            type: CardContentType.TEXT,
            content: {
                text: ""
            }
        },
        box2: {
            type: CardContentType.TEXT,
            content: {
                text: ""
            }
        },
        box3: {
            type: CardContentType.TEXT,
            content: {
                text: ""
            }
        },
        box4: {
            type: CardContentType.TEXT,
            content: {
                text: ""
            }
        }
    },
    backFace: {
        layout: CardLayout.ONE_BOX,
        box1: {
            type: CardContentType.TEXT,
            content: {
                text: ""
            }
        },
        box2: {
            type: CardContentType.TEXT,
            content: {
                text: ""
            }
        },
        box3: {
            type: CardContentType.TEXT,
            content: {
                text: ""
            }
        },
        box4: {
            type: CardContentType.TEXT,
            content: {
                text: ""
            }
        }
    }
}