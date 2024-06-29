import { Element, Text } from "slate";
import { CardContentData } from "./CardContentData";
import { CustomElement, CustomText } from "../ui/types/slate_defs";

export type TextBox = {
    readonly type: CardContentData.Type.TEXT
    readonly textNodes: (Element | Text)[]
}

export namespace TextBox {
    export function isTextBox(variable: unknown): variable is TextBox {
        return (
            typeof (variable) === "object" &&
            variable !== null &&
            "type" in variable &&
            variable.type === CardContentData.Type.TEXT &&
            "textNodes" in variable &&
            (
                CustomElement.isCustomElement(variable)
                || CustomText.isCustomText(variable)
            )
        )
    }

    const DEFAULT_TEXT_BOX: TextBox = {
        type: CardContentData.Type.TEXT,
        textNodes: []
    }

    /**
     * Returns a default `TextBox` object with no text nodes.
     * @returns default `TextBox` object.
     */
    export function makeDefault(): TextBox {
        return structuredClone(DEFAULT_TEXT_BOX)
    }

    /**
     * Replaces the text nodes in an existing `TextBox` object, returning 
     * a new `TextBox` object.
     * @param textBox existing `TextBox` object.
     * @param newTextNodes new text nodes to set.
     */
    export function setTextNodes(
        textBox: TextBox,
        newTextNodes: (Element | Text)[]
    ): TextBox {
        return {
            ...textBox,
            textNodes: newTextNodes
        }
    }

    /**
     * Creates a new `TextBox` object from an array of text nodes.
     * @param textNodes text nodes to set.
     * @returns new `TextBox` object.
     */
    export function fromTextNodes(
        textNodes: (Element | Text)[]
    ) {
        return {
            type: CardContentData.Type.TEXT,
            textNodes: textNodes
        }
    }
}
