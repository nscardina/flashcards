import { HorizontalAlignment } from "../slate_defs";
import { FormattedTextSpan } from "./FormattedTextSpan";
import { LaTeXTextSpan } from "./LaTeXTextSpan";

export type ParagraphElement = {
    type: "paragraph",
    children: (FormattedTextSpan | LaTeXTextSpan)[],
    alignment: HorizontalAlignment,
};

const DEFAULT_PARAGRAPH_ELEMENT: ParagraphElement = {
    type: "paragraph",
    children: [FormattedTextSpan.makeDefault()],
    alignment: "left",
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
                FormattedTextSpan.isFormattedTextSpan(element)
                || LaTeXTextSpan.isLaTeXTextSpan(element)
            ))

            && "alignment" in object
            && HorizontalAlignment.isHorizontalAlignment(object.alignment)
        )
    }

    export function makeDefault(): ParagraphElement {
        return structuredClone(DEFAULT_PARAGRAPH_ELEMENT);
    }
}