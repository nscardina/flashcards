import { CustomText } from "../slate_defs";

export type ParagraphElement = {
    type: "paragraph",
    children: CustomText[],
    // children: (FormattedTextSpan | LaTeXTextSpan)[],
    // alignment: HorizontalAlignment,
};

const DEFAULT_PARAGRAPH_ELEMENT: ParagraphElement = {
    type: "paragraph",
    children: [{text: ""}],
};

export namespace ParagraphElement {
    export function isParagraphElement(object: unknown): object is ParagraphElement {
        return (
            typeof(object) === "object" 
            && object !== null

            && "type" in object 
            && object.type === "paragraph"

            && "children" in object
            && Array.isArray(object.children)
            && object.children.every(element => (
                CustomText.isCustomText(element)
            ))
        )
    }

    export function makeDefault(): ParagraphElement {
        return structuredClone(DEFAULT_PARAGRAPH_ELEMENT);
    }
}