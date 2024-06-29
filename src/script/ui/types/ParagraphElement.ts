import { CustomElement, CustomText, HorizontalAlignment } from "./slate_defs";

export type ParagraphElement = {
    type: "paragraph",
    children: CustomText[],
    alignment: HorizontalAlignment,
}

export namespace ParagraphElement {
    export function isParagraphElement(object: unknown): object is ParagraphElement {
        return (
            typeof(object) === "object" 
            && object !== null

            && "type" in object 
            && object.type === "paragraph"

            && "children" in object
            && Array.isArray(object.children)
            && object.children.every(element => CustomElement.isCustomElement(element))

            && "alignment" in object
            && HorizontalAlignment.isHorizontalAlignment(object.alignment)
        )
    }
}