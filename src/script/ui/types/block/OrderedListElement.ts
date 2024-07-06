import { OrderedListMember } from "./OrderedListMember";
import { HorizontalAlignment } from "../slate_defs";

export type OrderedListElement = {
    type: "ordered_list_element",
    children: OrderedListMember[],
    alignment: HorizontalAlignment,
}

const DEFAULT_ORDERED_LIST_ELEMENT: OrderedListElement = {
    type: "ordered_list_element",
    children: [
        OrderedListMember.makeDefault()
    ],
    alignment: "left"
}

export namespace OrderedListElement {
    export function isOrderedListElement(variable: unknown): variable is OrderedListElement {
        return (
            typeof (variable) === "object"
            && variable !== null

            && "type" in variable
            && variable.type === "ordered_list_element"

            && "children" in variable
            && Array.isArray(variable.children)
            && variable.children.every(child => OrderedListMember.isOrderedListMember(child))

            && "alignment" in variable
            && HorizontalAlignment.isHorizontalAlignment(variable.alignment)
        )
    }

    export function makeDefault(): OrderedListElement {
        return structuredClone(DEFAULT_ORDERED_LIST_ELEMENT)
    }
}

