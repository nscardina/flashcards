// import { OrderedListElement } from "./OrderedListElement";
// import { CustomElement } from "../slate_defs";
// import { ParagraphElement } from "./ParagraphElement";

// export type OrderedListMember = {
//     type: "ordered_list_member";
//     children: CustomElement[];
// };



// const DEFAULT_ORDERED_LIST_MEMBER: OrderedListMember = {
//     type: "ordered_list_member",
//     children: [ParagraphElement.makeDefault()]
// };

// export namespace OrderedListMember {
//     export function isOrderedListMember(variable: unknown): variable is OrderedListElement {
//         return (
//             typeof (variable) === "object"
//             && variable !== null

//             && "type" in variable
//             && variable.type === "ordered_list_member"

//             && "children" in variable
//             && Array.isArray(variable.children)
//             && variable.children.every(child => CustomElement.isCustomElement(child))
//         );
//     }

//     export function makeDefaultOrderedListMember(): OrderedListMember {
//         return structuredClone(DEFAULT_ORDERED_LIST_MEMBER);
//     }
// }


