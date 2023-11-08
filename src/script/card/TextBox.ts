import { CardContentData } from "./CardContentData";

export type TextBox = {
    readonly type: CardContentData.Type.PLAIN_TEXT
    readonly text: string
}

export namespace TextBox {
    export function isTextBox(variable: unknown): variable is TextBox {
        return (
            typeof (variable) === "object" &&
            variable !== null &&
            "type" in variable &&
            variable.type === CardContentData.Type.PLAIN_TEXT &&
            "text" in variable &&
            typeof (variable.text) === "string"
        )
    }

    export function of(text: string): TextBox {
        return Object.freeze({
            type: CardContentData.Type.PLAIN_TEXT,
            text: text
        })
    }
}
