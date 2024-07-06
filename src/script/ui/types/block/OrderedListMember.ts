import { OrderedListElement } from "./OrderedListElement";
import { ParagraphElement } from "./ParagraphElement";
import { CustomElement } from "../slate_defs";


export namespace OrderedListMember {
    export function isOrderedListMember(variable: unknown): variable is OrderedListElement {
        return (
            typeof (variable) === "object"
            && variable !== null

            && "type" in variable
            && variable.type === "ordered_list_member"

            && "children" in variable
            && Array.isArray(variable.children)
            && variable.children.every(child => CustomElement.isCustomElement(child))
        );
    }

    export function makeDefault(): OrderedListMember {
        return structuredClone(DEFAULT_ORDERED_LIST_MEMBER);
    }
}
export type OrderedListMember = {
    type: "ordered_list_member";
    children: CustomElement[];
};

export const DEFAULT_ORDERED_LIST_MEMBER: OrderedListMember = {
    type: "ordered_list_member",
    children: [ParagraphElement.makeDefault()]
};
;

