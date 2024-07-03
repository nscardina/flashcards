import { CustomText, HorizontalAlignment } from "./slate_defs";

export type ParagraphElement = {
    type: "paragraph",
    children: CustomText[],
    alignment: HorizontalAlignment,
}

export namespace ParagraphElement {
    export function isParagraphElement(object: unknown): object is ParagraphElement {
        // console.log(typeof(object) === "object" )
        // console.log(object !== null)
        // console.log("type" in object)
        // console.log(object.type)
        // console.log("children" in object)
        // console.log(Array.isArray(object.children))
        // console.log(object.children.every(element => CustomText.isCustomText(element)))
        // console.log("alignment" in object)
        // console.log(HorizontalAlignment.isHorizontalAlignment(object.alignment))
        return (
            typeof(object) === "object" 
            && object !== null

            && "type" in object 
            && object.type === "paragraph"

            && "children" in object
            && Array.isArray(object.children)
            && object.children.every(element => CustomText.isCustomText(element))

            && "alignment" in object
            && HorizontalAlignment.isHorizontalAlignment(object.alignment)
        )
    }
}