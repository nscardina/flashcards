import { CustomElement, HorizontalAlignment } from "./slate_defs";

export type OrderedListElement = {
    type: "ordered_list_element",
    children: OrderedListMember[],
    alignment: HorizontalAlignment,
}

export namespace OrderedListElement {
    export function isOrderedListElement(variable: unknown): variable is OrderedListElement {
        return (
            typeof(variable) === "object"
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
}

export type OrderedListMember = {
    type: "ordered_list_member",
    children: CustomElement[]
  }

export namespace OrderedListMember {
    export function isOrderedListMember(variable: unknown): variable is OrderedListElement {
        return (
            typeof(variable) === "object"
            && variable !== null

            && "type" in variable 
            && variable.type === "ordered_list_member"

            && "children" in variable
            && Array.isArray(variable.children)
            && variable.children.every(child => CustomElement.isCustomElement(child))
        )
    }
}