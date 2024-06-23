import { Element, Node, Text } from "slate";
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

    /**
     * @deprecated
     * @param text 
     * @returns 
     */
    export function of(text: string): TextBox {
        throw "Don't call this!"
    }

    const DEFAULT_TEXT_BOX: TextBox = {
        type: CardContentData.Type.TEXT,
        textNodes: []
    }

    export function makeDefault(): TextBox {
        return structuredClone(DEFAULT_TEXT_BOX)
    }
}
