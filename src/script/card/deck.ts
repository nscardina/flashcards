import { Card } from "./Card"
import { CardContentData } from "./CardContentData"
import CardLayout from "./cardlayout"

export type Deck = {
    readonly name: string,
    readonly cards: Card[]
}

const DEFAULT_DECK = {
    name: "Untitled",
    cards: [Card.makeDefault()]
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Deck {
    export function isDeck(object: unknown): object is Deck {
        return (
            typeof(object) === "object" && 
            object !== null && 
            "name" in object && typeof(object.name) === "string" && 
            "cards" in object && Array.isArray(object.cards) && 
            object.cards.every(arrayMember => Card.isCard(arrayMember))
        )
    }

    export function makeDefault(): Deck {
        return structuredClone(DEFAULT_DECK)
    }
}

export const SAMPLE_DECK: Deck = {
    name: "Untitled Deck",
    cards: [
        {
            front: {
                layout: CardLayout.ONE_BOX_LV_TWO_BOXES_RV,
                box: {
                    "1": {
                        type: CardContentData.Type.PLAIN_TEXT,
                        text: "This is a sample deck. Click the boxes to edit.",
                    },
                    "2": {
                        type: CardContentData.Type.IMAGE,
                        base64ImageData: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMTAwMCIKICAgaGVpZ2h0PSIxMDAwIgogICB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjMuMiAoMDkxZTIwZSwgMjAyMy0xMS0yNSkiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImRyYXdpbmcuc3ZnIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiMwMDAwMDAiCiAgICAgYm9yZGVyb3BhY2l0eT0iMC4yNSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9InRydWUiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjZDFkMWQxIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjkyNzM3Nzk1IgogICAgIGlua3NjYXBlOmN4PSIzOTcuMzU2ODciCiAgICAgaW5rc2NhcGU6Y3k9IjU2MC43MjA2OSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE2OTYiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTM4NyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMTc0NyIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjUiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiIC8+CiAgPGRlZnMKICAgICBpZD0iZGVmczEiPgogICAgPHJlY3QKICAgICAgIHg9IjIzMC43NTgxMyIKICAgICAgIHk9IjI1NC40ODA5MyIKICAgICAgIHdpZHRoPSI2MDcuMDg3OTciCiAgICAgICBoZWlnaHQ9IjU3My42NjA0IgogICAgICAgaWQ9InJlY3QyOSIgLz4KICAgIDxmaWx0ZXIKICAgICAgIHN0eWxlPSJjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6c1JHQiIKICAgICAgIGlua3NjYXBlOmxhYmVsPSJEcm9wIFNoYWRvdyIKICAgICAgIGlkPSJmaWx0ZXIzMCIKICAgICAgIHg9Ii0wLjEyOTkzMTU0IgogICAgICAgeT0iLTAuMTQ4NTYxNTQiCiAgICAgICB3aWR0aD0iMS4yODA0NzcyIgogICAgICAgaGVpZ2h0PSIxLjMyMDY5MjkiPgogICAgICA8ZmVGbG9vZAogICAgICAgICByZXN1bHQ9ImZsb29kIgogICAgICAgICBpbj0iU291cmNlR3JhcGhpYyIKICAgICAgICAgZmxvb2Qtb3BhY2l0eT0iMC40OTgwMzkiCiAgICAgICAgIGZsb29kLWNvbG9yPSJyZ2IoMCwwLDApIgogICAgICAgICBpZD0iZmVGbG9vZDI5IiAvPgogICAgICA8ZmVHYXVzc2lhbkJsdXIKICAgICAgICAgcmVzdWx0PSJibHVyIgogICAgICAgICBpbj0iU291cmNlR3JhcGhpYyIKICAgICAgICAgc3RkRGV2aWF0aW9uPSIyNi42NjY2NjYiCiAgICAgICAgIGlkPSJmZUdhdXNzaWFuQmx1cjI5IiAvPgogICAgICA8ZmVPZmZzZXQKICAgICAgICAgcmVzdWx0PSJvZmZzZXQiCiAgICAgICAgIGluPSJibHVyIgogICAgICAgICBkeD0iNi4wMDAwMDAiCiAgICAgICAgIGR5PSI2LjAwMDAwMCIKICAgICAgICAgaWQ9ImZlT2Zmc2V0MjkiIC8+CiAgICAgIDxmZUNvbXBvc2l0ZQogICAgICAgICByZXN1bHQ9ImNvbXAxIgogICAgICAgICBvcGVyYXRvcj0iaW4iCiAgICAgICAgIGluPSJmbG9vZCIKICAgICAgICAgaW4yPSJvZmZzZXQiCiAgICAgICAgIGlkPSJmZUNvbXBvc2l0ZTI5IiAvPgogICAgICA8ZmVDb21wb3NpdGUKICAgICAgICAgcmVzdWx0PSJmYlNvdXJjZUdyYXBoaWMiCiAgICAgICAgIG9wZXJhdG9yPSJvdmVyIgogICAgICAgICBpbj0iU291cmNlR3JhcGhpYyIKICAgICAgICAgaW4yPSJjb21wMSIKICAgICAgICAgaWQ9ImZlQ29tcG9zaXRlMzAiIC8+CiAgICAgIDxmZUNvbG9yTWF0cml4CiAgICAgICAgIHJlc3VsdD0iZmJTb3VyY2VHcmFwaGljQWxwaGEiCiAgICAgICAgIGluPSJmYlNvdXJjZUdyYXBoaWMiCiAgICAgICAgIHZhbHVlcz0iMCAwIDAgLTEgMCAwIDAgMCAtMSAwIDAgMCAwIC0xIDAgMCAwIDAgMSAwIgogICAgICAgICBpZD0iZmVDb2xvck1hdHJpeDMwIiAvPgogICAgICA8ZmVGbG9vZAogICAgICAgICBpZD0iZmVGbG9vZDMwIgogICAgICAgICByZXN1bHQ9ImZsb29kIgogICAgICAgICBpbj0iZmJTb3VyY2VHcmFwaGljIgogICAgICAgICBmbG9vZC1vcGFjaXR5PSIwLjQ5ODAzOSIKICAgICAgICAgZmxvb2QtY29sb3I9InJnYigwLDAsMCkiIC8+CiAgICAgIDxmZUdhdXNzaWFuQmx1cgogICAgICAgICBpZD0iZmVHYXVzc2lhbkJsdXIzMCIKICAgICAgICAgcmVzdWx0PSJibHVyIgogICAgICAgICBpbj0iZmJTb3VyY2VHcmFwaGljIgogICAgICAgICBzdGREZXZpYXRpb249IjQuODQ4NDg1IiAvPgogICAgICA8ZmVPZmZzZXQKICAgICAgICAgaWQ9ImZlT2Zmc2V0MzAiCiAgICAgICAgIHJlc3VsdD0ib2Zmc2V0IgogICAgICAgICBpbj0iYmx1ciIKICAgICAgICAgZHg9IjYuMDAwMDAwIgogICAgICAgICBkeT0iNi4wMDAwMDAiIC8+CiAgICAgIDxmZUNvbXBvc2l0ZQogICAgICAgICBpZD0iZmVDb21wb3NpdGUzMSIKICAgICAgICAgcmVzdWx0PSJjb21wMSIKICAgICAgICAgb3BlcmF0b3I9ImluIgogICAgICAgICBpbj0iZmxvb2QiCiAgICAgICAgIGluMj0ib2Zmc2V0IiAvPgogICAgICA8ZmVDb21wb3NpdGUKICAgICAgICAgaWQ9ImZlQ29tcG9zaXRlMzIiCiAgICAgICAgIHJlc3VsdD0iY29tcDIiCiAgICAgICAgIG9wZXJhdG9yPSJvdmVyIgogICAgICAgICBpbj0iZmJTb3VyY2VHcmFwaGljIgogICAgICAgICBpbjI9ImNvbXAxIiAvPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojODg4ODg4O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjY1NDU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGlkPSJyZWN0MzIiCiAgICAgICB3aWR0aD0iMTAwMCIKICAgICAgIGhlaWdodD0iMTAwMCIKICAgICAgIHg9IjAiCiAgICAgICB5PSIwIgogICAgICAgcng9Ijc1LjU5MDU1MyIKICAgICAgIHJ5PSI3NS41OTA1NTMiIC8+CiAgICA8cGF0aAogICAgICAgc29kaXBvZGk6dHlwZT0ic3RhciIKICAgICAgIHN0eWxlPSJmaWxsOiMzODNhZmY7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICBpZD0icGF0aDI4IgogICAgICAgaW5rc2NhcGU6ZmxhdHNpZGVkPSJmYWxzZSIKICAgICAgIHNvZGlwb2RpOnNpZGVzPSI1IgogICAgICAgc29kaXBvZGk6Y3g9IjIwMi43MjIwOSIKICAgICAgIHNvZGlwb2RpOmN5PSI1ODIuMjg2ODciCiAgICAgICBzb2RpcG9kaTpyMT0iMTIzLjc1NjgxIgogICAgICAgc29kaXBvZGk6cjI9IjYxLjg3ODQwMyIKICAgICAgIHNvZGlwb2RpOmFyZzE9Ii0wLjcyMzc0Nzk5IgogICAgICAgc29kaXBvZGk6YXJnMj0iLTAuMDk1NDI5NDU5IgogICAgICAgaW5rc2NhcGU6cm91bmRlZD0iMCIKICAgICAgIGlua3NjYXBlOnJhbmRvbWl6ZWQ9IjAiCiAgICAgICBkPSJtIDI5NS40NTY2Nyw1MDAuMzM1MzggLTMxLjEzNzcyLDc2LjA1NTQyIDQ1LjAwMDIsNjguNzY3NDkgLTgxLjk1NTA5LC02LjExMTMxIC01MS40OTU5NCw2NC4wNDgwNSAtMTkuNTEzMzIsLTc5LjgzMjQyIC03Ni44MjY0MzYsLTI5LjE4MzYyIDY5Ljg5NTIwNiwtNDMuMjI3ODMgNC4wMTQ1OSwtODIuMDg0NTIgNjIuNzEwOTIsNTMuMTE2MTUgeiIKICAgICAgIGlua3NjYXBlOnRyYW5zZm9ybS1jZW50ZXIteD0iMzQuMDY2NTEzIgogICAgICAgaW5rc2NhcGU6dHJhbnNmb3JtLWNlbnRlci15PSI1MS43OTYwMyIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDIuNzY5MDk4NCwwLDAsMi42MzM2MDM1LC0xNTAuMzk4MjksLTkyMS4wNTUzNikiIC8+CiAgICA8ZWxsaXBzZQogICAgICAgc3R5bGU9ImZpbGw6IzRkYzM0NTtmaWxsLW9wYWNpdHk6MSIKICAgICAgIGlkPSJwYXRoMjEiCiAgICAgICBjeD0iNzY4LjI5NTIzIgogICAgICAgY3k9Ijc3MC45OTA5NyIKICAgICAgIHJ4PSIxNzUuMjI1MjIiCiAgICAgICByeT0iMTcyLjUyOTQ1IiAvPgogICAgPHJlY3QKICAgICAgIHN0eWxlPSJmaWxsOiNjMzQ1NDU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjAuNzgyODQxIgogICAgICAgaWQ9InJlY3QyMSIKICAgICAgIHdpZHRoPSI3ODkuMzIwNTYiCiAgICAgICBoZWlnaHQ9IjE3Ni44NDI2OCIKICAgICAgIHg9Ijg3LjM0MzAwMiIKICAgICAgIHk9Ijc1LjQ4MTYwNiIgLz4KICAgIDxwYXRoCiAgICAgICBzb2RpcG9kaTp0eXBlPSJzdGFyIgogICAgICAgc3R5bGU9ImZpbGw6IzAwYzJjYjtmaWxsLW9wYWNpdHk6MSIKICAgICAgIGlkPSJwYXRoMjIiCiAgICAgICBpbmtzY2FwZTpmbGF0c2lkZWQ9InRydWUiCiAgICAgICBzb2RpcG9kaTpzaWRlcz0iMyIKICAgICAgIHNvZGlwb2RpOmN4PSIxMjYuMTYyMTUiCiAgICAgICBzb2RpcG9kaTpjeT0iNDYzLjY3Mjg4IgogICAgICAgc29kaXBvZGk6cjE9IjE1Ni4zNTQ4MSIKICAgICAgIHNvZGlwb2RpOnIyPSIxMjYuNDkzNyIKICAgICAgIHNvZGlwb2RpOmFyZzE9Ii0xLjU3MDc5NjMiCiAgICAgICBzb2RpcG9kaTphcmcyPSItMC41MjM1OTg3NSIKICAgICAgIGlua3NjYXBlOnJvdW5kZWQ9IjAiCiAgICAgICBpbmtzY2FwZTpyYW5kb21pemVkPSIwIgogICAgICAgZD0ibSAxMjYuMTYyMTUsMzA3LjMxODA3IDEzNS40MDcyNCwyMzQuNTMyMjIgLTI3MC44MTQ0ODQzLC0xMGUtNiB6IgogICAgICAgaW5rc2NhcGU6dHJhbnNmb3JtLWNlbnRlci15PSItMjUuMDkwMjEzIgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS42NTMwMDMsMCwwLDEuNjgwNDU5Nyw0OTguODI0MjgsLTQzNi42NDA3NykiCiAgICAgICBpbmtzY2FwZTp0cmFuc2Zvcm0tY2VudGVyLXg9IjkuODEzMDE4OGUtMDYiIC8+CiAgICA8dGV4dAogICAgICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIKICAgICAgIGlkPSJ0ZXh0MjkiCiAgICAgICBzdHlsZT0iZm9udC1zaXplOjg1LjMzMzNweDt3aGl0ZS1zcGFjZTpwcmU7c2hhcGUtaW5zaWRlOnVybCgjcmVjdDI5KTtmaWxsOiMzODNhZmY7ZmlsbC1vcGFjaXR5OjE7ZmlsdGVyOnVybCgjZmlsdGVyMzApIj48dHNwYW4KICAgICAgICAgeD0iMjMwLjc1NzgxIgogICAgICAgICB5PSIzMzIuMzMyNjIiCiAgICAgICAgIGlkPSJ0c3BhbjIiPjx0c3BhbgogICAgICAgICAgIHN0eWxlPSJmb250LXdlaWdodDpib2xkO2ZpbGw6I2ZmZmZmZiIKICAgICAgICAgICBpZD0idHNwYW4xIj5UaGlzIGlzIGFuIDwvdHNwYW4+PC90c3Bhbj48dHNwYW4KICAgICAgICAgeD0iMjMwLjc1NzgxIgogICAgICAgICB5PSI0MzguOTk5MjUiCiAgICAgICAgIGlkPSJ0c3BhbjQiPjx0c3BhbgogICAgICAgICAgIHN0eWxlPSJmb250LXdlaWdodDpib2xkO2ZpbGw6I2ZmZmZmZiIKICAgICAgICAgICBpZD0idHNwYW4zIj5pbWFnZSEgQ2xpY2sgPC90c3Bhbj48L3RzcGFuPjx0c3BhbgogICAgICAgICB4PSIyMzAuNzU3ODEiCiAgICAgICAgIHk9IjU0NS42NjU4OCIKICAgICAgICAgaWQ9InRzcGFuNiI+PHRzcGFuCiAgICAgICAgICAgc3R5bGU9ImZvbnQtd2VpZ2h0OmJvbGQ7ZmlsbDojZmZmZmZmIgogICAgICAgICAgIGlkPSJ0c3BhbjUiPmhlcmUgdG8gPC90c3Bhbj48L3RzcGFuPjx0c3BhbgogICAgICAgICB4PSIyMzAuNzU3ODEiCiAgICAgICAgIHk9IjY1Mi4zMzI1IgogICAgICAgICBpZD0idHNwYW44Ij48dHNwYW4KICAgICAgICAgICBzdHlsZT0iZm9udC13ZWlnaHQ6Ym9sZDtmaWxsOiNmZmZmZmYiCiAgICAgICAgICAgaWQ9InRzcGFuNyI+cmVwbGFjZSB0aGUgPC90c3Bhbj48L3RzcGFuPjx0c3BhbgogICAgICAgICB4PSIyMzAuNzU3ODEiCiAgICAgICAgIHk9Ijc1OC45OTkxMyIKICAgICAgICAgaWQ9InRzcGFuMTAiPjx0c3BhbgogICAgICAgICAgIHN0eWxlPSJmb250LXdlaWdodDpib2xkO2ZpbGw6I2ZmZmZmZiIKICAgICAgICAgICBpZD0idHNwYW45Ij5pbWFnZS48L3RzcGFuPjwvdHNwYW4+PC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
                    },
                    "3": {
                        type: CardContentData.Type.LATEX,
                        latex_text: "$a^2 + b^2 = c^2$"
                    },
                    "4": null,
                }
            }, 
            back: {
                layout: CardLayout.ONE_BOX,
                box: {
                    "1": null,
                    "2": null,
                    "3": null,
                    "4": null,
                }
            }
        }
    ]
}